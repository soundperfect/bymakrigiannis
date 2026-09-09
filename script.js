document.addEventListener('DOMContentLoaded', () => {
  calculateEstimate();
});

// Years Experience
const currentYear = new Date().getFullYear();
const years = currentYear - 1943;

const years_classes = document.querySelectorAll('.year');
years_classes.forEach((year) => {
  year.textContent = years;
});

// Mobile navigation menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn && mobileMenu && menuIcon) {
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu && menuIcon) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
});

// Modal Control (Phone Pop-up)
function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

// Close modal on click outside box
window.addEventListener('click', (e) => {
  const modal = document.getElementById('contactModal');
  if (e.target === modal) {
    closeContactModal();
  }
});

// Cost Estimator Calculation
function calculateEstimate() {
  const vehicleTypeEl = document.getElementById('estVehicleType');
  const engineSizeEl = document.getElementById('estEngineSize');
  const displayEl = document.getElementById('estimatedCostDisplay');

  if (!vehicleTypeEl || !engineSizeEl || !displayEl) return;

  const multiplier = parseFloat(vehicleTypeEl.value) || 1.0;
  const engineCost = parseFloat(engineSizeEl.value) || 0;

  let baseSum = 0;
  const checkboxes = ['srvOil', 'srvFull', 'srvBrakes', 'srvAC', 'srvDiag', 'srvKteo'];
  
  checkboxes.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.checked) {
      baseSum += parseFloat(el.value);
    }
  });

  const total = Math.round((baseSum * multiplier) + engineCost);
  displayEl.textContent = `${total}€`;
}