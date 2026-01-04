import { Injectable, signal } from '@angular/core';
import { Movie, MovieFilter } from '../models/movie.models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesSignal = signal<Movie[]>(this.getMockMovies());
  
  movies = this.moviesSignal.asReadonly();
  
  getNowShowingMovies(): Movie[] {
    return this.moviesSignal().filter(m => m.isNowShowing);
  }
  
  getComingSoonMovies(): Movie[] {
    return this.moviesSignal().filter(m => m.isComingSoon);
  }
  
  getFeaturedMovie(): Movie | null {
    const nowShowing = this.getNowShowingMovies();
    return nowShowing[0] || null;
  }
  
  private getMockMovies(): Movie[] {
    return [
      {
        id: 1,
        title: 'Dune: Part Three',
        description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.',
        duration: 166,
        releaseDate: '2024-03-01',
        genre: ['Sci-Fi', 'Adventure', 'Drama'],
        rating: 8.9,
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
        trailerUrl: 'https://www.youtube.com/watch?v=example',
        director: 'Denis Villeneuve',
        cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
        language: 'English',
        isNowShowing: true,
        isComingSoon: false
      },
      {
        id: 2,
        title: 'Oppenheimer',
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
        duration: 180,
        releaseDate: '2023-07-21',
        genre: ['Biography', 'Drama', 'History'],
        rating: 8.7,
        posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
        director: 'Christopher Nolan',
        cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
        language: 'English',
        isNowShowing: true,
        isComingSoon: false
      },
      {
        id: 3,
        title: 'The Matrix Resurrections',
        description: 'Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to choose to follow the white rabbit once more.',
        duration: 148,
        releaseDate: '2021-12-22',
        genre: ['Action', 'Sci-Fi'],
        rating: 7.5,
        posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
        director: 'Lana Wachowski',
        cast: ['Keanu Reeves', 'Carrie-Anne Moss', 'Yahya Abdul-Mateen II', 'Jessica Henwick'],
        language: 'English',
        isNowShowing: true,
        isComingSoon: false
      },
      {
        id: 4,
        title: 'Interstellar Odyssey',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival in the far reaches of the galaxy.',
        duration: 169,
        releaseDate: '2024-11-15',
        genre: ['Adventure', 'Drama', 'Sci-Fi'],
        rating: 8.6,
        posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop',
        director: 'Christopher Nolan',
        cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        language: 'English',
        isNowShowing: true,
        isComingSoon: false
      },
      {
        id: 5,
        title: 'Blade Runner 2099',
        description: 'A new blade runner discovers a long-buried secret that has the potential to plunge what\'s left of society into chaos in the dystopian future of 2099.',
        duration: 163,
        releaseDate: '2024-06-20',
        genre: ['Action', 'Drama', 'Mystery', 'Sci-Fi'],
        rating: 8.0,
        posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
        director: 'Denis Villeneuve',
        cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Dave Bautista'],
        language: 'English',
        isNowShowing: true,
        isComingSoon: false
      },
      {
        id: 6,
        title: 'Inception: Dream Within',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        duration: 148,
        releaseDate: '2024-08-10',
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        rating: 8.8,
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop',
        director: 'Christopher Nolan',
        cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
        language: 'English',
        isNowShowing: true,
        isComingSoon: false
      },
      {
        id: 7,
        title: 'Avatar: The Way of Water II',
        description: 'Jake Sully and Neytiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.',
        duration: 192,
        releaseDate: '2025-12-20',
        genre: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
        rating: 0,
        posterUrl: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1920&h=1080&fit=crop',
        director: 'James Cameron',
        cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Kate Winslet'],
        language: 'English',
        isNowShowing: false,
        isComingSoon: true
      },
      {
        id: 8,
        title: 'The Dark Knight Returns',
        description: 'Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice as the enigmatic villain returns to Gotham.',
        duration: 175,
        releaseDate: '2025-07-18',
        genre: ['Action', 'Crime', 'Drama'],
        rating: 0,
        posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop',
        director: 'Christopher Nolan',
        cast: ['Christian Bale', 'Tom Hardy', 'Anne Hathaway', 'Gary Oldman'],
        language: 'English',
        isNowShowing: false,
        isComingSoon: true
      },
      {
        id: 9,
        title: 'Guardians of the Galaxy Vol. 4',
        description: 'The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord\'s encounter with his father.',
        duration: 136,
        releaseDate: '2025-05-05',
        genre: ['Action', 'Adventure', 'Comedy'],
        rating: 0,
        posterUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=500&h=750&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&h=1080&fit=crop',
        director: 'James Gunn',
        cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista', 'Bradley Cooper'],
        language: 'English',
        isNowShowing: false,
        isComingSoon: true
      }
    ];
  }
}
