# Cinema Booking Application - Project Documentation

**Course:** Arhitectura Aplicațiilor Front-End folosind Angular (2025-2026)  
**Team:** Năstase Teodor, Negoiță Andrei, Oană Sebastian  
**Theme:** Cinema App - Seat Booking System  
**Demo Video:** [\[Add YouTube link here\]](https://youtu.be/Ni_0qzJqCxs)

---

## 🎯 Requirements Compliance

### ✅ Core Requirements Met

- **Angular Framework:** Angular 18 with standalone components
- **Focus:** Advanced frontend with supporting backend
- **Standards:** Follows Angular style guide and best practices
- **Version Control:** GitHub repository with commit history
- **Design + Logic:** Modern UI with complex booking logic

---

## 🚀 Implemented Features

### **1. Authentication & Authorization**

- ✅ User registration with email validation
- ✅ Login with JWT token management
- ✅ Password hashing (BCrypt)
- ✅ Role-based access control (User/Admin)
- ✅ Auth guards for route protection
- ✅ HTTP interceptor for token injection

### **2. Movie Management**

- ✅ Browse movies (Now Showing / Coming Soon)
- ✅ Movie details with poster, backdrop, rating
- ✅ Trailer modal with YouTube embed
- ✅ Movie info modal with full details

### **3. Cinema & Showtime System**

- ✅ Multiple cinemas with halls
- ✅ Showtime scheduling by movie
- ✅ Real-time seat availability
- ✅ Dynamic pricing (Regular: $10, VIP: $15)

### **4. Interactive Seat Booking**

- ✅ Visual seat map (top-view layout)
- ✅ Color-coded seats:
  - 🟩 Available (green)
  - 🟥 Booked (red)
  - 🟦 Selected (blue)
  - 🟨 VIP (yellow)
- ✅ Multiple seat selection
- ✅ Real-time total calculation
- ✅ Row labels (A-E) and seat numbers
- ✅ Booking confirmation flow

### **5. User Profile**

- ✅ Profile management (edit name, email)
- ✅ Booking history with details
- ✅ QR code generation for tickets
- ✅ Booking status (Confirmed/Cancelled/Completed)
- ✅ Password change functionality
- ✅ Notification preferences

### **6. Admin Dashboard**

- ✅ Statistics overview (users, movies, bookings, revenue)
- ✅ User management (view, delete)
- ✅ Movie management (CRUD operations)
- ✅ Showtime management
- ✅ Cinema/Hall management
- ✅ Booking overview
- ✅ Chart visualizations (revenue, bookings)

### **7. UI/UX Features**

- ✅ Responsive design (mobile-friendly)
- ✅ Glass-morphism effects
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Gradient backgrounds
- ✅ Icon integration (Font Awesome)

---

## 🛠️ Technical Stack

### **Frontend (Angular 18)**

- **Architecture:** Standalone components, Signals API
- **Routing:** Angular Router with guards
- **HTTP:** HttpClient with interceptors
- **Forms:** Reactive Forms with validation
- **State:** Signal-based reactive state
- **Styling:** Tailwind CSS + custom animations
- **Icons:** Font Awesome

### **Backend (.NET 8)**

- **Architecture:** Clean Architecture (Domain/Application/Infrastructure/API)
- **Database:** SQLite with Entity Framework Core
- **Authentication:** JWT Bearer tokens
- **API:** RESTful endpoints with Swagger
- **Security:** Password hashing, role-based authorization
- **Patterns:** Repository pattern, dependency injection

---

## 📦 Angular Concepts Demonstrated

### **Core Concepts**

- ✅ Standalone components (no NgModules)
- ✅ Signals for reactive state management
- ✅ Dependency injection with `inject()` function
- ✅ Lazy loading with route-based code splitting
- ✅ HTTP interceptors for request/response handling
- ✅ Route guards (AuthGuard, AdminGuard)

### **Advanced Features**

- ✅ Signal-based state management
- ✅ Computed signals for derived state
- ✅ Template-driven and reactive forms
- ✅ Custom directives
- ✅ Service architecture
- ✅ Error handling and logging
- ✅ Environment configuration

### **UI Components**

- ✅ Reusable components (MovieCard, SeatMap)
- ✅ Control flow with `@if`, `@for`, `@switch`
- ✅ Event handling and data binding
- ✅ Parent-child communication
- ✅ Modal components
- ✅ Form validation feedback

---

## 🎨 User Experience Highlights

1. **Intuitive Navigation:** Clear menu structure with visual feedback
2. **Visual Seat Selection:** Interactive seat map mimicking real cinema layout
3. **Real-time Feedback:** Instant updates on seat availability and pricing
4. **Smooth Animations:** Fade-ins, slide-ups, and transitions enhance UX
5. **Responsive Design:** Adapts to all screen sizes
6. **Error Handling:** User-friendly error messages and fallbacks
7. **Loading States:** Spinners and skeleton screens during data fetching

---

## 🔐 Security Features

- JWT token authentication with expiration
- Password hashing with BCrypt
- Role-based access control
- Protected routes (Auth & Admin guards)
- HTTP-only token storage consideration
- Input validation on frontend and backend
- CORS configuration for API security

---

## 📊 Database Schema

**Entities:**

- User (with roles)
- Movie (with genres, ratings, trailers)
- Cinema (locations)
- Hall (cinema seating capacity)
- Seat (row, number, type, price)
- Showtime (movie + hall + time)
- Booking (user + showtime + seats)
- Ticket (booking details)

---

## 🚀 Running the Application

### **Backend:**

```bash
cd CinemaApp.API
dotnet run
# API runs on http://localhost:5023
```

### **Frontend:**

```bash
cd CinemaApp.Client
npm install
ng serve
# App runs on http://localhost:4200
```

### **Default Credentials:**

- **Admin:** admin@cinema.com / Admin@123
- **User:** user@cinema.com / User@123

---

## 📈 Project Statistics

- **Total Components:** 15+ Angular components
- **Services:** 10+ Angular services
- **API Endpoints:** 25+ REST endpoints
- **Database Tables:** 8 entities
- **Lines of Code:** ~5000+ (Frontend), ~3000+ (Backend)
- **Git Commits:** 24

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Modern Angular development with latest features
- ✅ Clean architecture and separation of concerns
- ✅ RESTful API design and integration
- ✅ Authentication and authorization patterns
- ✅ Complex UI interactions (seat selection)
- ✅ State management with Signals
- ✅ Responsive design principles
- ✅ Team collaboration via Git

---

## 📝 Notes

- Application exceeds base requirements by including full backend
- Backend enables realistic booking flow with persistence
- Follows Angular style guide and best practices
- Implements all major concepts from course curriculum
- Production-ready architecture with testing support

---

**Project Status:** ✅ Complete and functional  
**Documentation Date:** January 7, 2026
