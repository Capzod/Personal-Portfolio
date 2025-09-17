// script.js

// Animation initialization
document.addEventListener('DOMContentLoaded', function() {
  // Show loading animation for 3 seconds
  setTimeout(function() {
    const overlay = document.getElementById('animation-overlay');
    const pageContent = document.querySelector('.page-content');
    const homeContent = document.querySelector('.home-content');
    
    // Hide overlay and show content
    overlay.classList.add('hidden');
    pageContent.classList.add('visible');
    homeContent.classList.add('visible');

    window.addEventListener("load", () => {
  const overlay = document.getElementById("animation-overlay");
  
  setTimeout(() => {
    overlay.classList.add("blast"); // 🔥 blast animation
    
    // Remove it from DOM after animation
    overlay.addEventListener("animationend", () => {
      overlay.style.display = "none";
    });
  }, 1000); // change duration if needed
});

    
    // Start typing animation after page is visible
    setTimeout(initTypingAnimation, 500);
  }, 2000);
});

// Enhanced typing animation
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const texts = ['UI/UX Designer', 'Product Designer', 'Web Developer', 'Data Analyst'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Delete text
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      // Type text
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    // Check if text is fully typed or deleted
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of typing then start deleting
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text after deleting
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing animation
  type();
}

// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

// Show/hide sticky navigation and scroll button based on scroll position
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        nav.classList.add("sticky");
        if (scrollBtn) scrollBtn.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        if (scrollBtn) scrollBtn.style.display = "none";
    }
});

// Smooth scroll to about section when clicking scroll indicator
document.addEventListener('DOMContentLoaded', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const aboutSection = document.getElementById('about');
  
  if (scrollIndicator && aboutSection) {
    scrollIndicator.addEventListener('click', function() {
      // Calculate position to scroll to (top of about section)
      const aboutPosition = aboutSection.offsetTop;
      
      // Smooth scroll to about section
      window.scrollTo({
        top: aboutPosition,
        behavior: 'smooth'
      });
    });
    
    // Make scroll indicator clickable
    scrollIndicator.style.cursor = 'pointer';
  }
});

// Optional: Add scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.getElementById('about');
  
  window.addEventListener('scroll', function() {
    if (aboutSection) {
      const scrollPosition = window.scrollY;
      const aboutPosition = aboutSection.offsetTop;
      const windowHeight = window.innerHeight;
      
      // Add animation when about section comes into view
      if (scrollPosition > aboutPosition - windowHeight * 0.7) {
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
      }
    }
  });
});

// Smooth scroll to about section
function scrollToAbout() {
  const aboutSection = document.getElementById('about');
  console.log('Scrolling to:', aboutSection); // Check in browser console
  
  aboutSection.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Side Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    let body = document.querySelector("body");
    let navBar = document.querySelector(".navbar");
    let menuBtn = document.querySelector(".menu-btn");
    let cancelBtn = document.querySelector(".cancel-btn");
    
    if (!menuBtn || !cancelBtn || !navBar) return;

    // Open side navigation
    menuBtn.onclick = function() {
        navBar.classList.add("active");
        menuBtn.style.opacity = "0";
        menuBtn.style.pointerEvents = "none";
        body.style.overflow = "hidden";
        if (scrollBtn) scrollBtn.style.pointerEvents = "none";
    };

    const hideNavMenu = () => {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
        body.style.overflow = "auto";
        if (scrollBtn) scrollBtn.style.pointerEvents = "auto";
    };

    // Close side navigation
    cancelBtn.onclick = hideNavMenu;

    // Close side navigation when a menu link is clicked
    let navLinks = document.querySelectorAll(".menu li a");
    navLinks.forEach((link) => {
        link.addEventListener("click", hideNavMenu);
    });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabLinks.forEach(link => {
    link.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabLinks.forEach(tab => tab.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to current tab
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});

// View More Projects Functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (!viewMoreBtn) return;

    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let projectsVisible = false;
    
    // Initialize hidden projects
    hiddenProjects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        project.style.display = 'none';
    });
    
    viewMoreBtn.addEventListener('click', function() {
        if (!projectsVisible) {
            // Show hidden projects
            hiddenProjects.forEach(project => {
                project.style.display = 'block'; // FIXED (not flex)
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            });
            viewMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            viewMoreBtn.classList.add('active');
            projectsVisible = true;
        } else {
            // Hide projects
            hiddenProjects.forEach(project => {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            });
            viewMoreBtn.innerHTML = 'View More Projects <i class="fas fa-chevron-down"></i>';
            viewMoreBtn.classList.remove('active');
            projectsVisible = false;
        }
    });
});

// Project card expansion functionality
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't trigger if clicking on links inside the card
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      return;
    }

    // Ensure modal buttons work as real links
document.querySelectorAll('.modal-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation(); // stop card toggle
    // let the <a> default behavior happen (redirect)
  });
});

    
    // Close other expanded cards
    document.querySelectorAll('.project-card').forEach(otherCard => {
      if (otherCard !== this) {
        otherCard.classList.remove('expanded');
      }
    });
    
    // Toggle this card
    this.classList.toggle('expanded');
  });
});

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.querySelector('.scroll-button a');
    if (scrollButton) {
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Ensure View More button is visible
document.addEventListener('DOMContentLoaded', function() {
  const viewMoreBtn = document.getElementById('view-more-btn');
  
  if (viewMoreBtn) {
    viewMoreBtn.style.display = 'inline-flex';
    viewMoreBtn.style.visibility = 'visible';
  }
});

// Additional scroll animations for new home section
document.addEventListener('DOMContentLoaded', function() {
  const homeSection = document.getElementById('home');
  const aboutSection = document.getElementById('about');
  
  if (homeSection && aboutSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const aboutPosition = aboutSection.offsetTop;
      const windowHeight = window.innerHeight;
      
      // Parallax effect for home background
      if (scrollPosition < aboutPosition) {
        const parallaxRate = scrollPosition * -0.5;
        homeSection.style.transform = `translateY(${parallaxRate}px)`;
      }
      
      // Fade in about section when it comes into view
      if (scrollPosition > aboutPosition - windowHeight * 0.8) {
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
        aboutSection.style.transition = 'all 0.6s ease';
      }
    });
  }
});

// Initialize particles animation
document.addEventListener('DOMContentLoaded', function() {
  const particles = document.querySelector('.particles');
  if (particles) {
    // Particles are already animated via CSS, but we can add additional JS effects here if needed
    particles.style.animation = 'floatParticles 20s infinite linear';
  }
});

// Enhanced scroll indicator with progress
document.addEventListener('DOMContentLoaded', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;
      
      // You can add a progress bar to the scroll indicator here
      // Example: scrollIndicator.querySelector('.progress').style.width = scrollPercentage + '%';
    });
  }
});

// Animation initialization
document.addEventListener('DOMContentLoaded', function() {
  // Show loading animation for 3 seconds
  setTimeout(function() {
    const overlay = document.getElementById('animation-overlay');
    const homeContent = document.querySelector('.home-content');
    
    // Hide overlay and show home content
    if (overlay) overlay.classList.add('hidden');
    if (homeContent) homeContent.classList.add('visible');
    
    // Start typing animation after page is visible
    setTimeout(initTypingAnimation, 500);
  }, 3000);
});

// Enhanced typing animation
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const texts = ['UI/UX Designer', 'Product Designer', 'Web Developer', 'Data Analyst'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Delete text
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      // Type text
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    // Check if text is fully typed or deleted
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of typing then start deleting
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text after deleting
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing animation
  type();
}

// Smooth scroll to about section
function scrollToAbout() {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Scroll to about section when clicking scroll indicator
document.addEventListener('DOMContentLoaded', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const aboutSection = document.getElementById('about');
  
  if (scrollIndicator && aboutSection) {
    scrollIndicator.addEventListener('click', function() {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
    
    // Make scroll indicator clickable
    scrollIndicator.style.cursor = 'pointer';
  }
});

// Parallax effect for home background on scroll
window.addEventListener('scroll', function() {
  const homeSection = document.getElementById('home');
  const scrollPosition = window.scrollY;
  
  if (homeSection && scrollPosition < window.innerHeight) {
    // Subtle parallax effect on home background
    const parallaxRate = scrollPosition * -0.3;
    homeSection.querySelector('.home-background').style.transform = `translateY(${parallaxRate}px)`;
  }
});

window.addEventListener("load", () => {
  const overlay = document.getElementById("animation-overlay");

  setTimeout(() => {
    overlay.classList.add("blast"); // Trigger blast animation
    
    // After animation ends, remove completely
    overlay.addEventListener("animationend", () => {
      overlay.remove();
    });
  }, 1000); // keep loader visible for 1s before blast
});


