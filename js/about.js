// About Page Specific JavaScript

// DOM Elements
const timelineItems = document.querySelectorAll('.timeline-item');
const impactNumbers = document.querySelectorAll('.impact-number');

// Animate Timeline Items
function initTimelineAnimation() {
  if (timelineItems.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Animate Impact Numbers
function initImpactCounter() {
  if (impactNumbers.length === 0) return;

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

        const updateCounter = () => {
          if (currentValue < targetValue) {
            currentValue += increment;
            target.textContent = Math.round(currentValue).toLocaleString();
            setTimeout(updateCounter, interval);
          } else {
            target.textContent = targetValue.toLocaleString();
          }
        };

        updateCounter();
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });

  impactNumbers.forEach(number => {
    observer.observe(number);
  });
}

// Team Member Hover Effects
function initTeamHoverEffects() {
  const teamCards = document.querySelectorAll('.team-card');
  if (teamCards.length === 0) return;

  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('shadow-lg');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('shadow-lg');
    });
  });
}

// Value Cards Animation
function initValueCardsAnimation() {
  const valueCards = document.querySelectorAll('.value-card');
  if (valueCards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  valueCards.forEach(card => {
    observer.observe(card);
  });
}

// Certification Cards Animation
function initCertificationAnimation() {
  const certCards = document.querySelectorAll('.certification-card');
  if (certCards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  certCards.forEach(card => {
    observer.observe(card);
  });
}

// Region Cards Animation
function initRegionCardsAnimation() {
  const regionCards = document.querySelectorAll('.region-card');
  if (regionCards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  regionCards.forEach(card => {
    observer.observe(card);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTimelineAnimation();
  initImpactCounter();
  initTeamHoverEffects();
  initValueCardsAnimation();
  initCertificationAnimation();
  initRegionCardsAnimation();
});