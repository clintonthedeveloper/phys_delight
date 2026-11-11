/**
 * ==========================================================================
 * PHY'S KITCHEN DELIGHTS - VANILLA JAVASCRIPT ENGINE
 * Tech: Pure Vanilla ES6+ (No Frameworks, No Libraries)
 * Features: WhatsApp Integration, Filterable Gallery, Lightbox with Keyboard
 *           Nav, Dynamic Reviews Grid, IntersectionObserver Scroll Animations
 * ==========================================================================
 */

// Strict Mode
'use strict';

/* ==========================================================================
   1. WHATSAPP CONFIGURATION & HELPER
   Change the phone number or default greetings here in one central place.
   ========================================================================== */
const WHATSAPP_NUMBER = "25416194387";
const DEFAULT_WHATSAPP_MESSAGE = "Hello Phy's Kitchen Delights! I would like to place an order. Could you please share more details?";

/**
 * Generates an official WhatsApp click-to-chat URL with encoded pre-filled text.
 * @param {string} [customMessage] - Optional custom message. Defaults to DEFAULT_WHATSAPP_MESSAGE.
 * @returns {string} - Complete wa.me URL.
 */
function getWhatsAppUrl(customMessage) {
  const message = customMessage || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ==========================================================================
   2. GALLERY DATA ARRAY
   INSTRUCTIONS FOR THE OWNER / DEVELOPER:
   - Replace any 'image' URL below with the file path (e.g., 'images/my-cake.jpg')
     or direct URL of your real pastry product photo.
   - You can add, remove, or modify items as your catalog grows.
   - Do NOT include prices here or anywhere else on the website.
   ========================================================================== */
const galleryItems = [
  {
    id: 1,
    category: "Wedding Cakes",
    image: "/src/assets/images/gallery_wedding_cake_1794395613184.jpg",
    alt: "Bespoke multi-tiered luxury wedding cake with edible gold foil and handcrafted sugar florals"
  },
  {
    id: 2,
    category: "Macarons",
    image: "/src/assets/images/gallery_macarons_pastries_1794395612567.jpg",
    alt: "Artisanal French macarons in blush pink, pistache, and vanilla on a gold rim platter"
  },
  {
    id: 3,
    category: "Graduation Cakes",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
    alt: "Celebratory graduation cake with handcrafted edible diploma roll and gold accents"
  },
  {
    id: 4,
    category: "Birthday Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    alt: "Festive birthday drip cake layered with buttercream swirls and fresh berries"
  },
  {
    id: 5,
    category: "Customized Cakes",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    alt: "Artistic customized floral cake with intricate textured buttercream palette knife art"
  },
  {
    id: 6,
    category: "Anniversary Cakes",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    alt: "Romantic anniversary cake with soft pink roses and champagne gold luster"
  },
  {
    id: 7,
    category: "Simple Cakes",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80",
    alt: "Minimalist semi-naked vanilla cake with powdered sugar and fresh strawberries"
  },
  {
    id: 8,
    category: "Cupcakes",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80",
    alt: "Bouquet of gourmet blush pink and ivory piped buttercream cupcakes with pearls"
  },
  {
    id: 9,
    category: "Doughnuts",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    alt: "Artisan glazed brioche doughnuts with rosewater glaze and pistachios"
  },
  {
    id: 10,
    category: "Cinnamon Rolls",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80",
    alt: "Freshly baked golden cinnamon rolls generously drizzled with cream cheese icing"
  },
  {
    id: 11,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    alt: "Gourmet sea salt chocolate chunk cookies and decorated royal icing sugar cookies"
  },
  {
    id: 12,
    category: "Brownies",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    alt: "Fudgy Belgian chocolate brownies with flaky crinkled crust and gold dusting"
  },
  {
    id: 13,
    category: "Cake Pops",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
    alt: "Delicate cake pops dipped in pink white chocolate with golden sprinkles"
  },
  {
    id: 14,
    category: "Pies & Tarts",
    image: "https://images.unsplash.com/photo-1519915028121-7d346b45b1d4?auto=format&fit=crop&w=800&q=80",
    alt: "Individual glazed berry tartlets with vanilla bean pastry cream in golden pastry shells"
  },
  {
    id: 15,
    category: "Pastry Boxes/Treats",
    image: "https://images.unsplash.com/photo-1557082673-e99242b8daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Luxury assortment pastry gift box filled with mini tarts, macarons, and brownies"
  },
  {
    id: 16,
    category: "Graduation Cakes",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80",
    alt: "Tiered celebration cake for graduates with custom gold leaf accents"
  },
  {
    id: 17,
    category: "Wedding Cakes",
    image: "/src/assets/images/hero_pastry_delights_1794395611842.jpg",
    alt: "Grand wedding dessert showcase with tiered centerpiece cake and floral arrangements"
  },
  {
    id: 18,
    category: "Cupcakes",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    alt: "Velvet strawberry cupcakes with swirled pink cream and gold confetti"
  }
];

/* ==========================================================================
   3. SAMPLE TESTIMONIALS (REVIEWS) ARRAY
   SAMPLE TESTIMONIALS. Replace with the owner's real client reviews before launch.
   Only plain review strings are used; no names, dates, or star ratings.
   ========================================================================== */
const testimonials = [
  "The wedding cake for our special day was beyond breathtaking! Not only was the floral and gold design stunning, but the passion fruit and vanilla sponge melted in everyone's mouth.",
  "Phy made the most incredible graduation cake for my daughter. Every single guest commented on how moist and flavorful it was. Best baker in town!",
  "The cinnamon rolls and gourmet doughnuts are pure heaven on a Sunday morning. You can taste the genuine butter, warmth, and love in every single bite.",
  "Ordered customized cupcakes and cake pops for my son's birthday party. The presentation was gorgeous and the kids loved every crumb. Thank you, Phy's Kitchen Delights!",
  "Her pastry treat box made the sweetest anniversary gift for my wife. The chocolate brownies and pastel macarons were bakery perfection.",
  "Hands down the most reliable and talented pastry chef. Ordering via WhatsApp was seamless and the delivery arrived fresh, elegant, and immaculate."
];

/* ==========================================================================
   4. DOM CONTENT LOADED - APPLICATION INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initStickyHeader();
  initMobileNavigation();
  initWhatsAppLinks();
  initCreationsGallery();
  initReviewsGrid();
  initScrollAnimations();
  initBackToTop();
});

/* ==========================================================================
   5. PAGE LOADER
   ========================================================================== */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const dismissLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 600);
  };

  // Dismiss on full load or after brief timeout as fallback
  if (document.readyState === 'complete') {
    dismissLoader();
  } else {
    window.addEventListener('load', dismissLoader);
    setTimeout(dismissLoader, 1500);
  }
}

/* ==========================================================================
   6. STICKY HEADER & ACTIVE NAVIGATION OBSERVER
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Blur & shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active section nav link highlighting
  const sections = document.querySelectorAll('section[id], header[id="home"]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));
}

/* ==========================================================================
   7. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  if (!menuToggle || !mobileNav || !mobileBackdrop) return;

  const openMenu = () => {
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileBackdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   8. WHATSAPP LINK WIRING
   Sets standard wa.me hrefs for any elements marked with data-whatsapp-action.
   ========================================================================== */
function initWhatsAppLinks() {
  const whatsappElements = document.querySelectorAll('[data-whatsapp-link]');
  whatsappElements.forEach(el => {
    const customText = el.getAttribute('data-whatsapp-message') || DEFAULT_WHATSAPP_MESSAGE;
    el.setAttribute('href', getWhatsAppUrl(customText));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
    if (!el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', "Chat with Phy's Kitchen Delights on WhatsApp");
    }
  });
}

/* ==========================================================================
   9. "OUR CREATIONS" GALLERY & LIGHTBOX
   ========================================================================== */
let currentFilteredItems = [...galleryItems];
let activeLightboxIndex = 0;

function initCreationsGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const filtersContainer = document.getElementById('gallery-filters');
  const lightbox = document.getElementById('lightbox-modal');

  if (!galleryGrid) return;

  // Render Category Filter Buttons
  if (filtersContainer) {
    // Unique categories extracted from galleryItems in the required order
    const categories = [
      "All",
      "Graduation Cakes",
      "Wedding Cakes",
      "Simple Cakes",
      "Customized Cakes",
      "Anniversary Cakes",
      "Doughnuts",
      "Cinnamon Rolls",
      "Cookies",
      "Brownies",
      "Birthday Cakes",
      "Cupcakes",
      "Cake Pops",
      "Pies & Tarts",
      "Macarons",
      "Pastry Boxes/Treats"
    ];

    filtersContainer.innerHTML = '';
    categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `filter-btn ${index === 0 ? 'active' : ''}`;
      btn.textContent = cat;
      btn.setAttribute('data-category', cat);
      btn.addEventListener('click', () => {
        // Update active class
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterGallery(cat);
      });
      filtersContainer.appendChild(btn);
    });
  }

  // Initial render of all items
  renderGallery(galleryItems);

  // Filter function
  function filterGallery(category) {
    if (category === 'All') {
      currentFilteredItems = [...galleryItems];
    } else {
      currentFilteredItems = galleryItems.filter(item => item.category === category);
    }

    // Smooth transition
    galleryGrid.style.opacity = '0';
    setTimeout(() => {
      renderGallery(currentFilteredItems);
      galleryGrid.style.opacity = '1';
    }, 200);
  }

  // Render items into the grid
  function renderGallery(items) {
    galleryGrid.innerHTML = '';

    if (items.length === 0) {
      galleryGrid.innerHTML = `
        <div class="gallery-empty">
          <p>No creations currently listed under this category. Contact us to request custom baking!</p>
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card reveal-on-scroll';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View ${item.category} details`);

      card.innerHTML = `
        <img 
          src="${item.image}" 
          alt="${item.alt}" 
          class="gallery-card-img" 
          loading="lazy" 
          referrerpolicy="no-referrer"
          onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'gallery-fallback\\'><svg viewBox=\\'0 0 24 24\\'><path d=\\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z\\'/></svg><span>${item.category}</span></div>';"
        />
        <div class="gallery-card-overlay">
          <div class="gallery-card-category">${item.category}</div>
          <div class="gallery-view-hint">
            <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            Click to view & order
          </div>
        </div>
      `;

      // Open Lightbox on click or Enter key
      card.addEventListener('click', () => openLightbox(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      galleryGrid.appendChild(card);
    });

    // Trigger scroll reveal for newly added cards
    initScrollAnimations();
  }

  // Setup Lightbox Modal Controls
  setupLightboxModal(lightbox);
}

function setupLightboxModal(lightbox) {
  if (!lightbox) return;

  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');
  const stageImg = document.getElementById('lightbox-img');
  const categoryTitle = document.getElementById('lightbox-category-title');
  const counter = document.getElementById('lightbox-counter');
  const orderBtn = document.getElementById('lightbox-order-btn');

  function updateLightboxContent() {
    if (!currentFilteredItems || currentFilteredItems.length === 0) return;
    const item = currentFilteredItems[activeLightboxIndex];

    stageImg.style.opacity = '0';
    setTimeout(() => {
      stageImg.src = item.image;
      stageImg.alt = item.alt;
      stageImg.style.opacity = '1';
    }, 150);

    categoryTitle.textContent = item.category;
    counter.textContent = `${activeLightboxIndex + 1} of ${currentFilteredItems.length}`;

    // WhatsApp dynamic message:
    // "Hello Phy's Kitchen Delights! I'm interested in your [CATEGORY NAME]. Could you please share more details?"
    const customMessage = `Hello Phy's Kitchen Delights! I'm interested in your ${item.category}. Could you please share more details?`;
    orderBtn.href = getWhatsAppUrl(customMessage);
    orderBtn.setAttribute('target', '_blank');
    orderBtn.setAttribute('rel', 'noopener noreferrer');
    orderBtn.setAttribute('aria-label', `Order ${item.category} on WhatsApp`);
  }

  window.openLightbox = function(index) {
    activeLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    activeLightboxIndex = (activeLightboxIndex + 1) % currentFilteredItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    activeLightboxIndex = (activeLightboxIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
    updateLightboxContent();
  }

  // Event Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Click outside container to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard Navigation: Esc, ArrowLeft, ArrowRight
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

/* ==========================================================================
   10. REVIEWS (TESTIMONIALS) STATIC GRID
   Renders plain review strings into a responsive 3-column grid.
   No avatars, no stars, no names, no dates.
   ========================================================================== */
function initReviewsGrid() {
  const reviewsContainer = document.getElementById('reviews-grid');
  if (!reviewsContainer) return;

  reviewsContainer.innerHTML = '';

  testimonials.forEach((reviewText, index) => {
    const card = document.createElement('div');
    card.className = `review-card reveal-on-scroll stagger-${(index % 6) + 1}`;

    card.innerHTML = `
      <div class="review-quote-mark" aria-hidden="true">&ldquo;</div>
      <p class="review-text">${reviewText}</p>
    `;

    reviewsContainer.appendChild(card);
  });
}

/* ==========================================================================
   11. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   Respects prefers-reduced-motion media query.
   ========================================================================== */
function initScrollAnimations() {
  // If user prefers reduced motion, reveal everything immediately
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   12. FLOATING BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
