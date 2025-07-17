// ===== CHECKOUT FUNCTIONALITY ===== //

document.addEventListener('DOMContentLoaded', function() {
    initCheckout();
});

// ===== CHECKOUT INITIALIZATION ===== //
function initCheckout() {
    const enterButtons = document.querySelectorAll('.btn-enter');
    const checkoutModal = document.getElementById('checkout-modal');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Opportunity data
    const opportunities = {
        'luxury-car': {
            title: 'Luxury Car Collection',
            description: 'Win your dream car from our exclusive collection featuring the latest supercars and luxury vehicles.',
            price: 25,
            maxEntries: 5
        },
        'world-tour': {
            title: 'Luxury World Tour',
            description: 'Experience the world\'s most exclusive destinations with first-class travel and luxury accommodations.',
            price: 15,
            maxEntries: 10
        },
        'cash-jackpot': {
            title: 'Cash Jackpot',
            description: 'Pure cash prize giving you the ultimate freedom to choose your own adventure and fulfill your dreams.',
            price: 20,
            maxEntries: 5
        },
        'tech-bundle': {
            title: 'Premium Tech Bundle',
            description: 'Latest high-end electronics including laptops, smartphones, and cutting-edge gadgets.',
            price: 10,
            maxEntries: 15
        }
    };
    
    // Event listeners for entry buttons
    enterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const opportunityId = this.dataset.opportunity;
            openCheckoutModal(opportunityId, opportunities[opportunityId]);
        });
    });
    
    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeCheckoutModal);
    }
    
    // Close modal when clicking outside
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCheckoutModal();
            }
        });
    }
    
    // Initialize quantity controls
    initQuantityControls();
    
    // Initialize payment demos
    initPaymentDemos();
}

// ===== MODAL FUNCTIONS ===== //
function openCheckoutModal(opportunityId, opportunity) {
    const modal = document.getElementById('checkout-modal');
    const titleElement = document.getElementById('selected-opportunity-title');
    const descElement = document.getElementById('selected-opportunity-desc');
    const priceElement = document.getElementById('entry-price');
    const quantityInput = document.getElementById('entry-quantity');
    
    if (!modal || !opportunity) return;
    
    // Update modal content
    if (titleElement) titleElement.textContent = opportunity.title;
    if (descElement) descElement.textContent = opportunity.description;
    if (priceElement) priceElement.textContent = `$${opportunity.price}`;
    
    // Set quantity constraints
    if (quantityInput) {
        quantityInput.max = opportunity.maxEntries;
        quantityInput.value = 1;
    }
    
    // Update total cost
    updateTotalCost(opportunity.price, 1);
    
    // Store current opportunity data
    modal.dataset.opportunity = opportunityId;
    modal.dataset.price = opportunity.price;
    modal.dataset.maxEntries = opportunity.maxEntries;
    
    // Show modal
    modal.classList.add('show');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    const entryId = document.getElementById('entry-id');
    const drawDate = document.getElementById('draw-date');
    
    if (modal) {
        // Generate random entry ID
        const randomId = 'KV-' + new Date().getFullYear() + '-' + 
                         Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Set draw date (7 days from now)
        const drawDateValue = new Date();
        drawDateValue.setDate(drawDateValue.getDate() + 7);
        const formattedDate = drawDateValue.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        if (entryId) entryId.textContent = randomId;
        if (drawDate) drawDate.textContent = formattedDate;
        
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== QUANTITY CONTROLS ===== //
function initQuantityControls() {
    const quantityInput = document.getElementById('entry-quantity');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    if (!quantityInput) return;
    
    // Minus button
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            const minValue = parseInt(quantityInput.min) || 1;
            
            if (currentValue > minValue) {
                quantityInput.value = currentValue - 1;
                updateTotalFromQuantity();
            }
        });
    }
    
    // Plus button
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            const maxValue = parseInt(quantityInput.max) || 10;
            
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
                updateTotalFromQuantity();
            }
        });
    }
    
    // Input change
    quantityInput.addEventListener('change', function() {
        const value = parseInt(this.value);
        const min = parseInt(this.min) || 1;
        const max = parseInt(this.max) || 10;
        
        // Validate range
        if (value < min) this.value = min;
        if (value > max) this.value = max;
        
        updateTotalFromQuantity();
    });
}

function updateTotalFromQuantity() {
    const modal = document.getElementById('checkout-modal');
    const quantityInput = document.getElementById('entry-quantity');
    
    if (!modal || !quantityInput) return;
    
    const price = parseFloat(modal.dataset.price) || 0;
    const quantity = parseInt(quantityInput.value) || 1;
    
    updateTotalCost(price, quantity);
}

function updateTotalCost(price, quantity) {
    const totalElement = document.getElementById('total-amount');
    if (totalElement) {
        const total = price * quantity;
        totalElement.textContent = `$${total}`;
    }
}

// ===== PAYMENT DEMO FUNCTIONALITY ===== //
function initPaymentDemos() {
    const stripeBtn = document.querySelector('.stripe-demo-btn');
    const formBtns = document.querySelectorAll('.form-demo-btn');
    const termsCheckbox = document.getElementById('terms-agreement');
    
    // Stripe demo button
    if (stripeBtn) {
        stripeBtn.addEventListener('click', function() {
            if (!validateTerms()) return;
            
            // Simulate Stripe processing
            simulatePaymentProcessing('stripe');
        });
    }
    
    // Form provider demo buttons
    formBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!validateTerms()) return;
            
            const provider = this.dataset.provider;
            simulatePaymentProcessing(provider);
        });
    });
}

function validateTerms() {
    const termsCheckbox = document.getElementById('terms-agreement');
    
    if (!termsCheckbox || !termsCheckbox.checked) {
        showNotification('Please agree to the Terms & Conditions to continue', 'error');
        return false;
    }
    
    return true;
}

function simulatePaymentProcessing(provider) {
    const modal = document.getElementById('checkout-modal');
    const quantity = document.getElementById('entry-quantity').value;
    const price = modal.dataset.price;
    const total = price * quantity;
    
    // Show processing notification
    showNotification('Processing your payment...', 'info');
    
    // Disable all payment buttons during processing
    const paymentButtons = document.querySelectorAll('.stripe-demo-btn, .form-demo-btn');
    paymentButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    });
    
    // Simulate processing delay
    setTimeout(() => {
        // Re-enable buttons
        paymentButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
        
        // Reset button text
        const stripeBtn = document.querySelector('.stripe-demo-btn');
        const formBtns = document.querySelectorAll('.form-demo-btn');
        
        if (stripeBtn) {
            stripeBtn.innerHTML = '<i class="fab fa-stripe"></i> Pay Securely with Stripe';
        }
        
        formBtns.forEach(btn => {
            const provider = btn.dataset.provider;
            const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
            btn.innerHTML = `<i class="fas fa-external-link-alt"></i> Open ${providerName} Checkout`;
        });
        
        // Simulate successful payment
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            closeCheckoutModal();
            showSuccessModal();
            showNotification('Payment successful! Your entry has been confirmed.', 'success');
        } else {
            showNotification('Payment failed. Please try again.', 'error');
        }
        
    }, 2000); // 2 second processing simulation
}

// ===== NOTIFICATION SYSTEM ===== //
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#16a34a';
        case 'error': return '#dc2626';
        case 'warning': return '#d97706';
        default: return '#2563eb';
    }
}

// ===== FORM VALIDATION ===== //
function validateCheckoutForm() {
    const termsCheckbox = document.getElementById('terms-agreement');
    const quantityInput = document.getElementById('entry-quantity');
    
    const errors = [];
    
    // Validate terms agreement
    if (!termsCheckbox.checked) {
        errors.push('You must agree to the Terms & Conditions');
    }
    
    // Validate quantity
    const quantity = parseInt(quantityInput.value);
    const max = parseInt(quantityInput.max);
    const min = parseInt(quantityInput.min) || 1;
    
    if (quantity < min || quantity > max) {
        errors.push(`Quantity must be between ${min} and ${max}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ===== ESCAPE KEY HANDLER ===== //
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const checkoutModal = document.getElementById('checkout-modal');
        const successModal = document.getElementById('success-modal');
        
        if (checkoutModal && checkoutModal.classList.contains('show')) {
            closeCheckoutModal();
        }
        
        if (successModal && successModal.classList.contains('show')) {
            closeSuccessModal();
        }
    }
});

// ===== ADD NOTIFICATION STYLES ===== //
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

document.head.appendChild(notificationStyles);

// ===== EXPOSE GLOBAL FUNCTIONS ===== //
window.closeSuccessModal = closeSuccessModal;