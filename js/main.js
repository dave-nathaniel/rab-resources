// DOM Elements
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const energyCounter = document.getElementById('energyCounter');
const energyProgress = document.getElementById('energyProgress');
const treesPlanted = document.getElementById('treesPlanted');
const statNumbers = document.querySelectorAll('.stat-number');

// Cookie Banner
function initCookieBanner() {
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'block';
  }

  acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
  });
}

// Energy Counter Animation
function initEnergyCounter() {
  if (!energyCounter) return;

  const targetEnergy = 15000; // kWh
  const targetTrees = 250;
  let currentEnergy = 0;
  let currentTrees = 0;
  const duration = 3000; // ms
  const interval = 30; // ms
  const steps = duration / interval;
  const energyIncrement = targetEnergy / steps;
  const treesIncrement = targetTrees / steps;

  const updateCounter = () => {
    if (currentEnergy < targetEnergy) {
      currentEnergy += energyIncrement;
      currentTrees += treesIncrement;
      
      energyCounter.textContent = Math.round(currentEnergy).toLocaleString();
      treesPlanted.textContent = Math.round(currentTrees).toLocaleString();
      
      const progressPercentage = (currentEnergy / targetEnergy) * 100;
      energyProgress.style.width = `${progressPercentage}%`;
      energyProgress.setAttribute('aria-valuenow', progressPercentage);
      
      setTimeout(updateCounter, interval);
    } else {
      energyCounter.textContent = targetEnergy.toLocaleString();
      treesPlanted.textContent = targetTrees.toLocaleString();
      energyProgress.style.width = '100%';
      energyProgress.setAttribute('aria-valuenow', 100);
    }
  };

  // Start counter when element is in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(energyCounter);
}

// Stats Counter Animation
function initStatsCounter() {
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-count'));
        let currentValue = 0;
        const duration = 2000; // ms
        const interval = 30; // ms
        const steps = duration / interval;
        const increment = targetValue / steps;

        const updateStat = () => {
          if (currentValue < targetValue) {
            currentValue += increment;
            target.textContent = Math.round(currentValue).toLocaleString();
            setTimeout(updateStat, interval);
          } else {
            target.textContent = targetValue.toLocaleString();
          }
        };

        updateStat();
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// Energy Calculator
function initEnergyCalculator() {
  const calculateBtn = document.getElementById('calculateSavings');
  if (!calculateBtn) return;

  calculateBtn.addEventListener('click', () => {
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 0;
    const sunlightHours = parseFloat(document.getElementById('sunlightHours').value) || 5;
    const roofSize = parseFloat(document.getElementById('roofSize').value) || 0;

    if (monthlyBill <= 0 || roofSize <= 0) {
      alert('Please enter valid values for monthly bill and roof size.');
      return;
    }

    // Simple calculation logic (can be made more complex)
    const monthlySavings = monthlyBill * 0.8; // 80% savings
    const annualSavings = monthlySavings * 12;
    const lifetimeSavings = annualSavings * 25; // 25 year lifespan
    
    // System size based on bill and sunlight
    const systemSize = (monthlyBill / 150) * (5 / sunlightHours) * 5; // kW
    
    // Break-even point (years)
    const systemCost = systemSize * 2800; // $2800 per kW
    const taxCredit = systemCost * 0.3; // 30% federal tax credit
    const netCost = systemCost - taxCredit;
    const breakEven = netCost / annualSavings;

    // Update results
    document.getElementById('monthlySavings').textContent = `$${monthlySavings.toFixed(2)}`;
    document.getElementById('annualSavings').textContent = `$${annualSavings.toFixed(2)}`;
    document.getElementById('lifetimeSavings').textContent = `$${lifetimeSavings.toFixed(2)}`;
    document.getElementById('systemSize').textContent = `${systemSize.toFixed(1)} kW`;
    document.getElementById('breakEven').textContent = `${breakEven.toFixed(1)} years`;

    // Show results with animation
    const resultsContainer = document.getElementById('calculatorResults');
    resultsContainer.classList.add('fade-in');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Newsletter Form
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email) {
        // In a real application, you would send this to your server
        console.log(`Newsletter subscription for: ${email}`);
        
        // Show success message
        const formContainer = this.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Thank you for subscribing to our newsletter!';
        
        formContainer.appendChild(successMessage);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  });
}

// Active Navigation Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initEnergyCounter();
  initStatsCounter();
  initEnergyCalculator();
  initSmoothScrolling();
  initNewsletterForm();
  setActiveNavLink();
  
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// Add animation classes to elements when they enter the viewport
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.dataset.animation || 'fade-in';
        element.classList.add(animation);
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Handle window resize events
window.addEventListener('resize', () => {
  // Add any resize-specific logic here
});