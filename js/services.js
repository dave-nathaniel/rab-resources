// Services Page Specific JavaScript

// DOM Elements
const galleryFilters = document.querySelectorAll('.gallery-filters button');
const galleryItems = document.querySelectorAll('.gallery-item');
const diagramControls = document.querySelectorAll('.diagram-controls button');
const explanationContents = document.querySelectorAll('.explanation-content');
const calculateSolarSystemBtn = document.getElementById('calculateSolarSystem');

// Initialize Gallery Filters
function initGalleryFilters() {
  if (galleryFilters.length === 0 || galleryItems.length === 0) return;

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Update active filter button
      galleryFilters.forEach(btn => btn.classList.remove('active'));
      filter.classList.add('active');

      const filterValue = filter.getAttribute('data-filter');

      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize Battery Diagram Controls
function initBatteryDiagram() {
  if (diagramControls.length === 0 || explanationContents.length === 0) return;

  diagramControls.forEach(control => {
    control.addEventListener('click', () => {
      // Update active control button
      diagramControls.forEach(btn => btn.classList.remove('active'));
      control.classList.add('active');

      const mode = control.getAttribute('data-mode');

      // Show corresponding explanation
      explanationContents.forEach(content => {
        content.classList.add('d-none');
      });

      document.getElementById(`${mode}Explanation`).classList.remove('d-none');
    });
  });
}

// Initialize Solar System Calculator
function initSolarCalculator() {
  if (!calculateSolarSystemBtn) return;

  calculateSolarSystemBtn.addEventListener('click', () => {
    const homeSize = parseFloat(document.getElementById('homeSize').value) || 0;
    const electricityBill = parseFloat(document.getElementById('electricityBill').value) || 0;
    const roofType = document.getElementById('roofType').value;
    const location = document.getElementById('location').value;

    if (homeSize <= 0 || electricityBill <= 0) {
      alert('Please enter valid values for home size and electricity bill.');
      return;
    }

    // Calculate system size based on electricity bill and location
    let systemSize = (electricityBill / 150) * 5; // Base calculation
    
    // Adjust for location (sunlight hours)
    if (location === 'high') {
      systemSize *= 0.8; // Less system size needed in high sunlight areas
    } else if (location === 'low') {
      systemSize *= 1.2; // More system size needed in low sunlight areas
    }
    
    // Adjust for roof type (efficiency factors)
    const roofEfficiency = {
      'asphalt': 1,
      'metal': 1.05,
      'tile': 0.95,
      'flat': 1.1
    };
    
    systemSize *= roofEfficiency[roofType] || 1;
    
    // Calculate costs and savings
    const costPerWatt = 2.80; // $2.80 per watt
    const systemCost = systemSize * 1000 * costPerWatt;
    const taxCredit = systemCost * 0.3; // 30% federal tax credit
    const afterTaxCredit = systemCost - taxCredit;
    
    // Annual savings based on system size and electricity bill
    const annualSavings = electricityBill * 12 * 0.85; // 85% of current bill
    
    // Payback period
    const paybackPeriod = afterTaxCredit / annualSavings;

    // Update results
    document.getElementById('recommendedSize').textContent = `${systemSize.toFixed(1)} kW`;
    document.getElementById('estimatedCost').textContent = `$${systemCost.toFixed(2)}`;
    document.getElementById('afterTaxCredit').textContent = `$${afterTaxCredit.toFixed(2)}`;
    document.getElementById('annualSavingsSolar').textContent = `$${annualSavings.toFixed(2)}`;
    document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} years`;

    // Show results with animation
    const resultsContainer = document.getElementById('solarCalculatorResults');
    resultsContainer.classList.add('fade-in');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// Initialize Inverter Efficiency Chart
function initInverterChart() {
  const chartCanvas = document.getElementById('inverterChart');
  if (!chartCanvas) return;

  // Check if Chart.js is available
  if (typeof Chart === 'undefined') {
    // Load Chart.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = createChart;
    document.head.appendChild(script);
  } else {
    createChart();
  }

  function createChart() {
    const ctx = chartCanvas.getContext('2d');
    
    // Data for different inverter types
    const labels = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
    const stringInverterData = [86, 90, 93, 95, 96, 96.5, 97, 97, 96.5, 96];
    const microInverterData = [90, 92, 94, 95, 96, 96.5, 97, 97.5, 97.5, 97];
    const hybridInverterData = [84, 88, 91, 93, 95, 96, 96.5, 96.5, 96, 95.5];
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'String Inverter',
            data: stringInverterData,
            borderColor: 'rgba(21, 101, 192, 0.7)',
            backgroundColor: 'rgba(21, 101, 192, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Microinverter',
            data: microInverterData,
            borderColor: 'rgba(46, 204, 113, 0.7)',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Hybrid Inverter',
            data: hybridInverterData,
            borderColor: 'rgba(241, 196, 15, 0.7)',
            backgroundColor: 'rgba(241, 196, 15, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            min: 80,
            max: 100,
            title: {
              display: true,
              text: 'Efficiency (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Load Percentage'
            }
          }
        }
      }
    });
  }
}

// Initialize Consultation Form
function initConsultationForm() {
  const consultationForm = document.getElementById('consultationForm');
  if (!consultationForm) return;

  consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const propertyType = document.getElementById('propertyType').value;
    const interestedIn = document.getElementById('interestedIn').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !phone || !propertyType || !interestedIn) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // In a real application, you would send this data to your server
    console.log('Consultation Request:', { name, email, phone, propertyType, interestedIn, message });
    
    // Show success message
    const formContainer = consultationForm.parentElement;
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.innerHTML = `
      <h4>Thank you for your request!</h4>
      <p>We've received your consultation request and will contact you within 24 hours to discuss your renewable energy options.</p>
      <p>A confirmation email has been sent to ${email}.</p>
    `;
    
    // Replace form with success message
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initBatteryDiagram();
  initSolarCalculator();
  initInverterChart();
  initConsultationForm();
});