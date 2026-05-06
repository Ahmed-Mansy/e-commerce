import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartAnimationService {
  private readonly platformId = inject(PLATFORM_ID);

  animateToCart(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1. Get click coordinates
    const startX = event.clientX;
    const startY = event.clientY;

    // 2. Get target coordinates (nav cart icon)
    const cartIcon = document.getElementById('nav-cart-icon');
    if (!cartIcon) return;
    
    const targetRect = cartIcon.getBoundingClientRect();
    const targetX = targetRect.left + (targetRect.width / 2);
    const targetY = targetRect.top + (targetRect.height / 2);

    // 3. Create flying element
    const floatingCart = document.createElement('div');
    floatingCart.innerHTML = '<i class="fas fa-cart-shopping"></i>';
    floatingCart.style.position = 'fixed';
    floatingCart.style.left = startX + 'px';
    floatingCart.style.top = startY + 'px';
    floatingCart.style.width = '32px';
    floatingCart.style.height = '32px';
    floatingCart.style.background = 'var(--main-color, #8b5e35)';
    floatingCart.style.color = 'white';
    floatingCart.style.borderRadius = '50%';
    floatingCart.style.display = 'flex';
    floatingCart.style.alignItems = 'center';
    floatingCart.style.justifyContent = 'center';
    floatingCart.style.fontSize = '14px';
    floatingCart.style.zIndex = '9999';
    floatingCart.style.pointerEvents = 'none';
    floatingCart.style.boxShadow = '0 4px 12px rgba(139, 94, 53, 0.3)';
    
    // Custom cubic-bezier for a nice arc effect
    floatingCart.style.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
    floatingCart.style.transform = 'translate(-50%, -50%) scale(1)';

    document.body.appendChild(floatingCart);

    // 4. Trigger animation
    // Use a small timeout to ensure the browser has painted the initial state
    setTimeout(() => {
      floatingCart.style.left = targetX + 'px';
      floatingCart.style.top = targetY + 'px';
      floatingCart.style.transform = 'translate(-50%, -50%) scale(0.2) rotate(15deg)';
      floatingCart.style.opacity = '0.3';
    }, 20);

    // 5. Cleanup & target bump animation
    setTimeout(() => {
      if (document.body.contains(floatingCart)) {
        document.body.removeChild(floatingCart);
      }
      
      // Bump the nav icon
      cartIcon.style.transform = 'scale(1.25)';
      cartIcon.style.transition = 'transform 0.2s ease-out';
      
      const badge = cartIcon.querySelector('span');
      if (badge) {
        badge.style.transform = 'scale(1.3)';
      }

      setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        if (badge) {
          badge.style.transform = 'scale(1)';
        }
      }, 200);
      
    }, 720); // Slightly longer than the transition to ensure it completes
  }
}
