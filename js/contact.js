// Contact Page Specific JavaScript

// DOM Elements
const quoteForm = document.getElementById('quoteForm');
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const stepIndicators = document.querySelectorAll('.step-indicator');
const formProgressBar = document.getElementById('formProgressBar');
const termsAgreement = document.getElementById('termsAgreement');
const formSuccess = document.getElementById('formSuccess');
const confirmationEmail = document.getElementById('confirmationEmail');

// Multi-step Form Navigation
function initMultiStepForm() {
  if (!quoteForm || formSteps.length === 0) return;

  let currentStep = 0;

  // Next button click handler
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Validate current step
      if (!validateStep(currentStep)) {
        return;
      }

      // If current step is the last step, submit the form
      if (currentStep === formSteps.length - 1) {
        quoteForm.submit();
        return;
      }

      // Hide current step
      formSteps[currentStep].classList.add('d-none');
      
      // Show next step
      currentStep++;
      formSteps[currentStep].classList.remove('d-none');
      
      // Update progress
      updateProgress(currentStep);
    });
  });

  // Previous button click handler
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Hide current step
      formSteps[currentStep].classList.add('d-none');
      
      // Show previous step
      currentStep--;
      formSteps[currentStep].classList.remove('d-none');
      
      // Update progress
      updateProgress(currentStep);
    });
  });

  // Form submission handler
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate final step
    if (!validateStep(currentStep)) {
      return;
    }
    
    // Update summary before submission
    updateSummary();
    
    // In a real application, you would send this data to your server
    console.log('Quote Request Submitted');
    
    // Show success message
    quoteForm.classList.add('d-none');
    formSuccess.classList.remove('d-none');
    
    // Set confirmation email
    const email = document.getElementById('email').value;
    confirmationEmail.textContent = email;
    
    // Scroll to top of success message
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Update progress bar and step indicators
  function updateProgress(step) {
    const progress = ((step + 1) / formSteps.length) * 100;
    formProgressBar.style.width = `${progress}%`;
    formProgressBar.setAttribute('aria-valuenow', progress);
    
    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
      if (index <= step) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Validate current step
  function validateStep(step) {
    let isValid = true;
    
    // Get all required inputs in current step
    const requiredInputs = formSteps[step].querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
      if (!input.value) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        
        // Additional validation for specific input types
        if (input.type === 'email' && !isValidEmail(input.value)) {
          input.classList.add('is-invalid');
          isValid = false;
        }
        
        if (input.type === 'tel' && !isValidPhone(input.value)) {
          input.classList.add('is-invalid');
          isValid = false;
        }
        
        if (input.id === 'zipCode' && !isValidZipCode(input.value)) {
          input.classList.add('is-invalid');
          isValid = false;
        }
      }
    });
    
    // Special validation for terms agreement on last step
    if (step === formSteps.length - 1 && termsAgreement && !termsAgreement.checked) {
      termsAgreement.classList.add('is-invalid');
      isValid = false;
    }
    
    return isValid;
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation (simple format check)
  function isValidPhone(phone) {
    const phoneRegex = /^\d{10,15}$|^\d{3}[-.\s]\d{3}[-.\s]\d{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, '')) || phoneRegex.test(phone);
  }

  // ZIP code validation
  function isValidZipCode(zipCode) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  }

  // Update summary information
  function updateSummary() {
    // Personal Information
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;
    
    // Property Details
    const propertyType = document.getElementById('propertyType').value;
    const propertySize = document.getElementById('propertySize').value;
    const roofType = document.getElementById('roofType').value;
    const shadingCondition = document.querySelector('input[name="shadingCondition"]:checked').value;
    
    // Energy Needs
    const monthlyBill = document.getElementById('monthlyBill').value;
    const electricCompany = document.getElementById('electricCompany').value;
    const primaryGoal = document.querySelector('input[name="primaryGoal"]:checked').value;
    
    // Get selected interests
    const interests = [];
    if (document.getElementById('solarInterest').checked) interests.push('Solar Panels');
    if (document.getElementById('batteryInterest').checked) interests.push('Battery Storage');
    if (document.getElementById('evInterest').checked) interests.push('EV Charging');
    if (document.getElementById('monitoringInterest').checked) interests.push('Energy Monitoring');
    
    // Update summary elements
    document.getElementById('summaryName').textContent = `${firstName} ${lastName}`;
    document.getElementById('summaryEmail').textContent = email;
    document.getElementById('summaryPhone').textContent = phone;
    document.getElementById('summaryAddress').textContent = `${address}, ${city}, ${state} ${zipCode}`;
    
    document.getElementById('summaryPropertyType').textContent = getPropertyTypeLabel(propertyType);
    document.getElementById('summaryPropertySize').textContent = propertySize;
    document.getElementById('summaryRoofType').textContent = getRoofTypeLabel(roofType);
    document.getElementById('summaryShading').textContent = getShadingLabel(shadingCondition);
    
    document.getElementById('summaryMonthlyBill').textContent = monthlyBill;
    document.getElementById('summaryElectricCompany').textContent = getElectricCompanyLabel(electricCompany);
    document.getElementById('summaryInterests').textContent = interests.join(', ') || 'None selected';
    document.getElementById('summaryGoal').textContent = getPrimaryGoalLabel(primaryGoal);
  }

  // Helper functions to get readable labels
  function getPropertyTypeLabel(value) {
    const labels = {
      'single-family': 'Single-Family Home',
      'multi-family': 'Multi-Family Home',
      'condo': 'Condominium',
      'commercial': 'Commercial Building',
      'industrial': 'Industrial Facility'
    };
    return labels[value] || value;
  }

  function getRoofTypeLabel(value) {
    const labels = {
      'asphalt': 'Asphalt Shingle',
      'metal': 'Metal',
      'tile': 'Tile',
      'flat': 'Flat/Low Slope',
      'other': 'Other'
    };
    return labels[value] || value;
  }

  function getShadingLabel(value) {
    const labels = {
      'none': 'No significant shading',
      'partial': 'Partial shading',
      'heavy': 'Heavy shading'
    };
    return labels[value] || value;
  }

  function getElectricCompanyLabel(value) {
    const labels = {
      'pge': 'Pacific Gas & Electric (PG&E)',
      'sce': 'Southern California Edison (SCE)',
      'sdge': 'San Diego Gas & Electric (SDG&E)',
      'ladwp': 'Los Angeles DWP',
      'other': 'Other'
    };
    return labels[value] || value;
  }

  function getPrimaryGoalLabel(value) {
    const labels = {
      'savings': 'Save money on electricity bills',
      'independence': 'Energy independence/backup power',
      'environmental': 'Environmental benefits',
      'other': 'Other'
    };
    return labels[value] || value;
  }

  // Add input event listeners to remove invalid state when user types
  const allInputs = quoteForm.querySelectorAll('input, select, textarea');
  allInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('is-invalid');
    });
  });
}

// Real-time Form Validation
function initFormValidation() {
  const inputs = document.querySelectorAll('.form-control, .form-select');
  if (inputs.length === 0) return;

  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateInput(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('is-invalid')) {
        validateInput(this);
      }
    });
  });

  function validateInput(input) {
    // Skip validation for non-required fields if empty
    if (!input.hasAttribute('required') && !input.value) {
      input.classList.remove('is-invalid');
      return;
    }

    if (!input.value) {
      input.classList.add('is-invalid');
      return;
    }

    // Specific validation based on input type or id
    switch (input.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
        break;
      
      case 'tel':
        const phoneRegex = /^\d{10,15}$|^\d{3}[-.\s]\d{3}[-.\s]\d{4}$/;
        if (!phoneRegex.test(input.value.replace(/\D/g, '')) && !phoneRegex.test(input.value)) {
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
        break;
      
      default:
        if (input.id === 'zipCode') {
          const zipRegex = /^\d{5}(-\d{4})?$/;
          if (!zipRegex.test(input.value)) {
            input.classList.add('is-invalid');
          } else {
            input.classList.remove('is-invalid');
          }
        } else {
          input.classList.remove('is-invalid');
        }
    }
  }
}

// Interactive Map
function initInteractiveMap() {
  const mapOverlay = document.querySelector('.map-overlay');
  if (!mapOverlay) return;

  // In a real application, you would initialize a map API here
  // For this example, we'll just simulate loading the map
  setTimeout(() => {
    mapOverlay.innerHTML = `
      <p>Click on a location to get directions:</p>
      <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
        <a href="https://maps.google.com/?q=San+Francisco,+CA+94105" target="_blank" class="btn btn-sm btn-primary">San Francisco</a>
        <a href="https://maps.google.com/?q=Los+Angeles,+CA+90001" target="_blank" class="btn btn-sm btn-primary">Los Angeles</a>
        <a href="https://maps.google.com/?q=San+Diego,+CA+92101" target="_blank" class="btn btn-sm btn-primary">San Diego</a>
      </div>
    `;
  }, 1500);
}

// Click-to-Call Functionality
function initClickToCall() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  if (phoneLinks.length === 0) return;

  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // On mobile devices, this will initiate a call
      // On desktop, we'll show a message
      if (!isMobileDevice()) {
        e.preventDefault();
        alert(`To call ${this.textContent}, please dial ${this.getAttribute('href').replace('tel:', '')} on your phone.`);
      }
    });
  });

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMultiStepForm();
  initFormValidation();
  initInteractiveMap();
  initClickToCall();
});