import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, tap, catchError, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User,
  ApiError 
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private readonly TOKEN_KEY = 'cinema_token';
  private readonly USER_KEY = 'cinema_user';
  
  // Signals for reactive state management
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  private isLoadingSignal = signal<boolean>(false);
  
  // Public computed signals
  currentUser = this.currentUserSignal.asReadonly();
  isLoading = this.isLoadingSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isAdmin = computed(() => this.currentUserSignal()?.role === '2' || this.currentUserSignal()?.role === 'Admin');

  constructor() {
    // Check token validity on service initialization
    console.log('AuthService initialized');
    const storedUser = this.getUserFromStorage();
    console.log('User loaded from storage:', storedUser);
    const storedToken = this.getToken();
    console.log('Token loaded from storage:', storedToken ? 'Token exists' : 'No token');
    
    // Debug: Decode and display JWT token content
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        console.log('JWT Token Payload:', payload);
        console.log('Role in token:', payload.role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      } catch (e) {
        console.error('Failed to decode token:', e);
      }
    }
    
    this.checkTokenExpiration();
  }

  /**
   * Login user with email and password
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);
    
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/Authentication/login`,
      credentials
    ).pipe(
      tap(response => {
        console.log('Login response:', response);
        this.handleAuthSuccess(response);
      }),
      catchError(error => this.handleError(error)),
      tap(() => this.isLoadingSignal.set(false))
    );
  }

  /**
   * Register new user
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);
    
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/Authentication/register`,
      data
    ).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleError(error)),
      tap(() => this.isLoadingSignal.set(false))
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    console.log('Full response received:', response);
    console.log('Response data:', response.data);
    
    if (!response || !response.data) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid authentication response');
    }
    
    if (!response.data.token) {
      console.error('Token missing from response:', response.data);
      throw new Error('Token not found in response');
    }
    
    if (!response.data.user) {
      console.error('User missing from response:', response.data);
      throw new Error('User data not found in response');
    }
    
    console.log('Storing token:', response.data.token);
    console.log('Storing user:', response.data.user);
    
    localStorage.setItem(this.TOKEN_KEY, response.data.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
    this.currentUserSignal.set(response.data.user);
    
    console.log('Token stored in localStorage:', localStorage.getItem(this.TOKEN_KEY));
    console.log('User stored in localStorage:', localStorage.getItem(this.USER_KEY));
  }

  /**
   * Get user from localStorage
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    console.log('getUserFromStorage - raw userJson:', userJson);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        console.log('getUserFromStorage - parsed user:', user);
        return user;
      } catch (error) {
        console.error('getUserFromStorage - parse error:', error);
        return null;
      }
    }
    console.log('getUserFromStorage - no user in storage');
    return null;
  }

  /**
   * Check if token is expired
   */
  private checkTokenExpiration(): void {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // Convert to milliseconds
        
        if (Date.now() >= exp) {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.isLoadingSignal.set(false);
    
    let errorMessage = 'An unexpected error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      // Network error
      errorMessage = 'Unable to connect to server. Please check your connection.';
    } else if (error.error?.message) {
      // Server error with message
      errorMessage = error.error.message;
    } else if (error.status === 401) {
      errorMessage = 'Invalid email or password';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    }
    
    return throwError(() => ({ message: errorMessage, errors: error.error?.errors }));
  }
}
