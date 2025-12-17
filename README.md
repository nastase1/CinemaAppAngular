# Cinema Booking Application

A full-stack cinema booking application built with Clean Architecture, ASP.NET Core 8.0, and Angular 17+.

## 🏗️ Project Structure

This solution follows **Clean Architecture** principles with clear separation of concerns:

```
CinemaApp/
├── CinemaApp.Domain/          # Core business entities and interfaces
├── CinemaApp.Infrastructure/  # Data access and external services
├── CinemaApp.Application/     # Business logic and use cases
├── CinemaApp.API/            # REST API controllers and endpoints
├── CinemaApp.Shared/         # DTOs shared between backend and frontend
├── CinemaApp.Tests/          # Unit and integration tests
└── CinemaApp.Client/         # Angular frontend (to be created)
```

---

## 📦 Project Responsibilities

### 1. **CinemaApp.Domain** 
**Purpose:** Core domain layer - the heart of the application

**What goes here:**
- ✅ **Entities:** All business entities (User, Movie, Cinema, Booking, etc.)
- ✅ **Enums:** Domain enums (SeatType, BookingStatus, PaymentStatus)
- ✅ **Repository Interfaces:** `IUserRepository`, `IMovieRepository`, etc.
- ✅ **Domain Logic:** Business rules and validation
- ✅ **Base Classes:** `BaseEntity` with soft delete support (CreatedAt, UpdatedAt, DeletedAt)

**Key Points:**
- NO dependencies on other projects
- Pure business logic only
- All entities inherit from `BaseEntity` for soft delete pattern
- Repository interfaces define contracts (implemented in Infrastructure)

**Dependencies:** NONE

---

### 2. **CinemaApp.Infrastructure**
**Purpose:** Data access and external integrations

**What goes here:**
- ✅ **DbContext:** `CinemaAppDbContext` with Entity Framework Core
- ✅ **Repository Implementations:** Concrete implementations of domain repository interfaces
- ✅ **Migrations:** Database migrations
- ✅ **Fluent API Configuration:** Entity configurations and relationships
- ✅ **Seed Data:** Initial data for genres, cinemas, movies, etc.
- ✅ **Database Migration Service:** Auto-migration on startup

**Key Points:**
- Implements repository interfaces from Domain
- All queries must filter `DeletedAt == null` (soft delete)
- Configure entity relationships using Fluent API
- Add composite unique constraints (e.g., seat uniqueness per hall)
- SQLite database with EF Core 8.0

**Dependencies:** 
- CinemaApp.Domain
- Microsoft.EntityFrameworkCore.Sqlite (8.0.11)
- Microsoft.EntityFrameworkCore.Design (8.0.11)

---

### 3. **CinemaApp.Application**
**Purpose:** Business logic and application services

**What goes here:**
- ✅ **Service Interfaces:** `IAuthenticationService`, `IMovieService`, `IBookingService`, etc.
- ✅ **Service Implementations:** Business logic for all operations
- ✅ **Authentication Service:** JWT generation, BCrypt password hashing, Google OAuth
- ✅ **Email Service:** Booking confirmations, notifications
- ✅ **File Service:** Image upload and management
- ✅ **Validation Logic:** Business rules (booking conflicts, seat availability)

**Key Services to Implement:**
1. `IAuthenticationService` - Login, Register, Google OAuth
2. `IUserService` - Profile management, deactivation
3. `IMovieService` - CRUD operations, filters, search
4. `IShowtimeService` - Showtime management
5. `IBookingService` - Create, cancel, confirm bookings
6. `ISeatService` - Seat availability validation
7. `ICinemaService` - Cinema and hall management
8. `IReviewService` - Movie reviews
9. `IEmailService` - Email notifications

**Key Points:**
- Uses repositories from Infrastructure
- Returns DTOs (from Shared project) to API layer
- Business rule validation before database operations
- Check for soft-deleted entities (DeletedAt != null)

**Dependencies:**
- CinemaApp.Domain
- CinemaApp.Shared
- BCrypt.Net-Next (4.0.3)

---

### 4. **CinemaApp.API**
**Purpose:** REST API and HTTP layer

**What goes here:**
- ✅ **Controllers:** REST endpoints for all features
- ✅ **Program.cs:** Dependency injection, middleware, authentication setup
- ✅ **Authentication Configuration:** JWT Bearer + Google OAuth 2.0
- ✅ **Middleware:** CORS, error handling, logging
- ✅ **wwwroot/uploads/:** File storage for images

**Controllers to Create:**
1. `AuthenticationController` - Login, Register
2. `ExternalAuthController` - Google OAuth (google-login, callback)
3. `UserController` - Profile, booking history
4. `MovieController` - Browse, search, details
5. `ShowtimeController` - Get showtimes by movie/cinema
6. `BookingController` - Create, cancel, confirm booking
7. `CinemaController` - Get cinemas by city
8. `ReviewController` - CRUD operations
9. `AdminController` - Admin operations (requires `[Authorize(Roles = "Admin")]`)
10. `HealthController` - Health checks
11. `VersionController` - API version info

**Authentication Setup:**
- JWT Bearer tokens for API authentication
- Cookie + Google OAuth for third-party login
- `[Authorize]` attributes for protected endpoints
- `[Authorize(Roles = "Admin")]` for admin-only endpoints

**Key Points:**
- Controllers call Application services
- Return HTTP status codes and DTOs
- Handle authentication and authorization
- Configure CORS for Angular frontend

**Dependencies:**
- CinemaApp.Application
- CinemaApp.Infrastructure
- CinemaApp.Shared
- Microsoft.AspNetCore.Authentication.JwtBearer (8.0.11)
- Microsoft.AspNetCore.Authentication.Google (8.0.11)

---

### 5. **CinemaApp.Shared**
**Purpose:** Data Transfer Objects (DTOs) shared between API and Client

**What goes here:**
- ✅ **DTOs:** Request and response models
- ✅ **ViewModels:** Data models for UI
- ✅ **API Contracts:** Shared types between backend and frontend

**Example DTOs:**
- `LoginRequestDto`, `LoginResponseDto`
- `MovieDto`, `MovieDetailDto`
- `BookingRequestDto`, `BookingResponseDto`
- `ShowtimeDto`, `SeatDto`
- `UserProfileDto`, `UpdateProfileDto`

**Key Points:**
- NO business logic
- Simple POCOs (Plain Old CLR Objects)
- Used by both API and Angular Client
- Validation attributes (DataAnnotations) can be added

**Dependencies:** NONE

---

### 6. **CinemaApp.Tests**
**Purpose:** Unit and integration tests

**What goes here:**
- ✅ **Unit Tests:** Test services in isolation
- ✅ **Repository Tests:** Test data access logic
- ✅ **Mock Objects:** Use Moq to mock dependencies
- ✅ **Integration Tests:** Test API endpoints

**What to Test:**
- Authentication logic (login, register, token generation)
- Booking service (seat availability, conflicts, expiry)
- Repository soft delete filtering
- Business rule validation
- Seat selection conflicts

**Key Points:**
- Use xUnit framework
- Mock repositories with Moq
- Test edge cases and business rules
- Ensure soft delete filtering works

**Dependencies:**
- CinemaApp.Domain
- CinemaApp.Application
- CinemaApp.Infrastructure
- xUnit
- Moq (4.20.72)

---

### 7. **CinemaApp.Client** (Angular Frontend)
**Purpose:** User interface and client-side logic

**What goes here:**
- ✅ **Core Module:** AuthService, Guards, HTTP Interceptors
- ✅ **Shared Module:** Reusable components (MovieCard, SeatMap, etc.)
- ✅ **Feature Modules:** Auth, Home, Movie, Booking, Profile, Cinema, Admin
- ✅ **Services:** API communication services
- ✅ **State Management:** RxJS BehaviorSubjects for shared state

**Modules to Create:**
1. **Core Module** - AuthService, AuthGuard, JWT Interceptor
2. **Shared Module** - MovieCard, ShowtimeCard, SeatMap, BookingSummary
3. **Auth Module** - Login, Register, Google OAuth callback
4. **Home Module** - Browse movies (Now Showing, Coming Soon)
5. **Movie Module** - Movie details with showtimes
6. **Booking Module** - Showtime selection, seat selection, payment
7. **Profile Module** - User profile, booking history
8. **Cinema Module** - Browse cinemas by city
9. **Admin Module** - Admin dashboard

**Key Features:**
- Interactive seat selection with color coding
- Real-time seat availability
- Booking flow: Movie → Showtime → Seats → Confirm
- JWT token management and auto-refresh
- Route guards for authentication
- HTTP interceptor for adding tokens

**Dependencies:** 
- Angular 17+
- RxJS for state management
- Angular Router
- HttpClient

---

## 🔐 Authentication Strategy

### Dual Authentication System:
1. **JWT Bearer Tokens** - For API authentication
   - Login with email/password
   - Returns JWT token
   - Token stored in localStorage/sessionStorage
   - Added to requests via HTTP Interceptor

2. **Google OAuth 2.0** - For third-party login
   - Cookie-based authentication
   - Redirect flow with callback
   - Creates user with Google profile
   - Returns JWT token for subsequent requests

### User Secrets Configuration:
Store sensitive data in User Secrets (Development) or Environment Variables (Production):
```json
{
  "Jwt": {
    "Key": "your-secret-key-min-32-characters",
    "Issuer": "CinemaApp",
    "Audience": "CinemaAppUsers",
    "ExpiryInMinutes": 60
  },
  "Google": {
    "ClientId": "your-google-client-id",
    "ClientSecret": "your-google-client-secret"
  },
  "Smtp": {
    "Host": "smtp.gmail.com",
    "Port": 587,
    "Username": "your-email@gmail.com",
    "Password": "your-app-password"
  }
}
```

---

## 🗄️ Database Schema

### Entities (All with Soft Delete):
1. **User** - Users with optional Google OAuth
2. **Movie** - Movie information
3. **Genre** - Movie genres
4. **Actor** - Actor information
5. **Director** - Director information
6. **Cinema** - Cinema locations
7. **Hall** - Cinema halls
8. **Seat** - Seats in halls
9. **Showtime** - Movie showtimes
10. **Booking** - User bookings
11. **BookedSeat** - Junction table for bookings and seats
12. **Review** - User movie reviews
13. **MovieGenre** - Junction table (many-to-many)
14. **MovieActor** - Junction table (many-to-many)
15. **MovieDirector** - Junction table (many-to-many)

### Soft Delete Pattern:
- All entities inherit `BaseEntity` with `DeletedAt` property
- Queries filter `DeletedAt == null`
- "Delete" operations set `DeletedAt = DateTime.UtcNow`
- Allows data recovery and audit trails

---

## 📋 Business Rules

### Booking Rules:
- ✅ Cannot book same seat twice for same showtime
- ✅ Booking expires after 15 minutes if not confirmed
- ✅ Cannot cancel booking less than 2 hours before showtime
- ✅ Real-time seat availability validation

### Showtime Rules:
- ✅ Admin can create showtimes only if hall is available
- ✅ Validate showtime doesn't overlap in same hall
- ✅ End time calculated from movie duration

### Movie Rules:
- ✅ Movie rating calculated from user reviews
- ✅ Only active movies shown in "Now Showing"

---

## 🚀 Getting Started

### Prerequisites:
- .NET 8.0 SDK
- Node.js 18+ (for Angular)
- Visual Studio 2022 or VS Code
- Git

### Setup Backend:
```bash
# Navigate to API project
cd CinemaApp.API

# Initialize User Secrets
dotnet user-secrets init

# Set JWT secret
dotnet user-secrets set "Jwt:Key" "your-secret-key-at-least-32-characters-long"

# Apply migrations
dotnet ef database update --project ../CinemaApp.Infrastructure

# Run API
dotnet run
```

### Setup Frontend:
```bash
# Install Angular CLI
npm install -g @angular/cli

# Create Angular project
ng new CinemaApp.Client

# Navigate to project
cd CinemaApp.Client

# Run development server
ng serve
```

---

## 📁 Folder Structure Guidelines

### Domain Layer:
```
CinemaApp.Domain/
├── Common/
│   └── BaseEntity.cs
├── Entities/
│   ├── User.cs
│   ├── Movie.cs
│   ├── Cinema.cs
│   └── ...
├── Enums/
│   ├── SeatType.cs
│   ├── BookingStatus.cs
│   └── PaymentStatus.cs
└── IRepositories/
    ├── IUserRepository.cs
    ├── IMovieRepository.cs
    └── ...
```

### Infrastructure Layer:
```
CinemaApp.Infrastructure/
├── Context/
│   └── CinemaAppDbContext.cs
├── Repositories/
│   ├── UserRepository.cs
│   ├── MovieRepository.cs
│   └── ...
├── Configurations/
│   ├── UserConfiguration.cs
│   ├── MovieConfiguration.cs
│   └── ...
├── Migrations/
│   └── (auto-generated)
└── Seeders/
    └── DataSeeder.cs
```

### Application Layer:
```
CinemaApp.Application/
├── Interfaces/
│   ├── IAuthenticationService.cs
│   ├── IMovieService.cs
│   └── ...
└── Services/
    ├── AuthenticationService.cs
    ├── MovieService.cs
    └── ...
```

---

## 🔄 Development Workflow

### For Each Feature:
1. **Domain Layer** - Create entities and repository interfaces
2. **Infrastructure Layer** - Implement repositories and DbContext configuration
3. **Application Layer** - Create service interfaces and implementations
4. **Shared Layer** - Create DTOs
5. **API Layer** - Create controllers
6. **Client Layer** - Create Angular components and services
7. **Tests Layer** - Write unit tests

### Git Workflow:
```bash
# Create feature branch
git checkout -b feature/booking-system

# Make changes and commit
git add .
git commit -m "Add booking service implementation"

# Push to remote
git push origin feature/booking-system

# Create Pull Request for review
```

---

## 🧪 Testing Strategy

### Unit Tests:
- Test services in isolation
- Mock all dependencies
- Focus on business logic

### Integration Tests:
- Test API endpoints
- Use in-memory database
- Test complete workflows

### Example Test:
```csharp
[Fact]
public async Task CreateBooking_WithValidSeats_ShouldSucceed()
{
    // Arrange
    var mockRepo = new Mock<IBookingRepository>();
    var service = new BookingService(mockRepo.Object);
    
    // Act
    var result = await service.CreateBookingAsync(bookingDto);
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal(BookingStatus.Confirmed, result.Status);
}
```

---

## 🐳 Docker Support (Future)

### Dockerfile for API:
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY bin/Release/net8.0/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "CinemaApp.API.dll"]
```

### docker-compose.yml:
```yaml
version: '3.8'
services:
  api:
    build: ./CinemaApp.API
    ports:
      - "5000:80"
  client:
    build: ./CinemaApp.Client
    ports:
      - "4200:80"
```

---

## 👥 Team Collaboration

### Colleague 1 - Backend Focus:
- Domain entities and repositories
- Infrastructure (DbContext, migrations)
- Application services (business logic)

### Colleague 2 - Frontend Focus:
- Angular modules and components
- Services for API communication
- State management and routing

### Your Role - Integration:
- API controllers
- Authentication setup
- Database seeding
- Deployment and DevOps

---

## 📚 Useful Resources

- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [EF Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Angular Documentation](https://angular.io/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 📝 TODO Checklist

- [ ] Create Domain entities with soft delete
- [ ] Create repository interfaces
- [ ] Implement DbContext with Fluent API
- [ ] Create and run initial migration
- [ ] Implement repository pattern
- [ ] Create seed data
- [ ] Implement application services
- [ ] Setup JWT authentication
- [ ] Setup Google OAuth
- [ ] Create API controllers
- [ ] Create Angular project
- [ ] Implement Angular modules
- [ ] Create seat selection component
- [ ] Implement booking flow
- [ ] Add email service
- [ ] Write unit tests
- [ ] Add Docker support
- [ ] Deploy to production

---

## 🆘 Need Help?

- Check this README first
- Review the project structure
- Ask team members
- Consult official documentation
- Create GitHub issues for bugs

---

**Happy Coding! 🚀**
