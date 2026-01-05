import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CreateMovieDto {
  title: string;
  description: string;
  durationMinutes: number;
  releaseDate: string;
  posterUrl?: string;
  trailerUrl?: string;
  genreIds: number[];
  actorIds: number[];
  directorIds: number[];
}

export interface CreateShowtimeDto {
  movieId: number;
  hallId: number;
  startTime: string;
  price: number;
}

export interface CreateCinemaDto {
  name: string;
  location: string;
}

export interface UpdateUserRoleDto {
  userId: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  // Movie CRUD
  createMovie(movie: CreateMovieDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Movie`, movie);
  }

  updateMovie(id: number, movie: CreateMovieDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Movie/${id}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Movie/${id}`);
  }

  // Showtime CRUD
  createShowtime(showtime: CreateShowtimeDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Showtime`, showtime);
  }

  deleteShowtime(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Showtime/${id}`);
  }

  // Cinema CRUD (theaters)
  createCinema(cinema: CreateCinemaDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Cinema`, cinema);
  }

  updateCinema(id: number, cinema: CreateCinemaDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Cinema/${id}`, cinema);
  }

  deleteCinema(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Cinema/${id}`);
  }

  getAllCinemas(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Cinema`);
  }

  // User Management
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Admin/users/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Admin/users`);
  }
}
