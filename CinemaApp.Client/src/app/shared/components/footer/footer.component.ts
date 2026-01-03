import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-midnight-950 border-t border-white/10 mt-20">
      <div class="container mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-cinema-red to-pink-600 rounded-xl flex items-center justify-center">
                <i class="fas fa-film text-white text-xl"></i>
              </div>
              <span class="text-xl font-display font-bold gradient-text">CinemaApp</span>
            </div>
            <p class="text-slate-400 text-sm">
              Experience cinema like never before. Book your tickets seamlessly and enjoy the show.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 glass-card flex items-center justify-center hover:bg-cinema-red/20 transition-colors">
                <i class="fab fa-facebook-f text-slate-400 hover:text-cinema-red"></i>
              </a>
              <a href="#" class="w-10 h-10 glass-card flex items-center justify-center hover:bg-cinema-red/20 transition-colors">
                <i class="fab fa-twitter text-slate-400 hover:text-cinema-red"></i>
              </a>
              <a href="#" class="w-10 h-10 glass-card flex items-center justify-center hover:bg-cinema-red/20 transition-colors">
                <i class="fab fa-instagram text-slate-400 hover:text-cinema-red"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white font-display font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a routerLink="/home" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Home</a></li>
              <li><a routerLink="/movies" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Movies</a></li>
              <li><a routerLink="/showtimes" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Showtimes</a></li>
              <li><a routerLink="/about" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">About Us</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="text-white font-display font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Help Center</a></li>
              <li><a href="#" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" class="text-slate-400 hover:text-cinema-red transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h3 class="text-white font-display font-semibold mb-4">Stay Updated</h3>
            <p class="text-slate-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
            <div class="flex">
              <input type="email" placeholder="Your email" 
                     class="glass-input rounded-r-none text-sm flex-1">
              <button class="bg-cinema-red hover:bg-cinema-red-dark px-4 py-2 rounded-r-xl transition-colors">
                <i class="fas fa-paper-plane text-white"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-12 pt-8 border-t border-white/10 text-center">
          <p class="text-slate-500 text-sm">
            © {{ currentYear }} CinemaApp. Crafted with <i class="fas fa-heart text-cinema-red"></i> for Cinema Lovers.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
