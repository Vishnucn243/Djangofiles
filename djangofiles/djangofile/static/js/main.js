// Modern Book Gallery JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltips with custom options
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            animation: true,
            delay: { show: 100, hide: 100 }
        });
    });

    // Enhanced image preview functionality
    const imageInput = document.querySelector('input[type="file"]');
    const imagePreview = document.querySelector('#imagePreview');
    const previewContainer = document.querySelector('.preview-container');
    
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Show loading spinner
                const spinner = document.createElement('div');
                spinner.className = 'loading-spinner';
                previewContainer.appendChild(spinner);
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Remove spinner and show image with fade effect
                    spinner.remove();
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    imagePreview.style.opacity = '0';
                    setTimeout(() => {
                        imagePreview.style.opacity = '1';
                    }, 50);
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Enhanced form validation with visual feedback
    const uploadForm = document.querySelector('.upload-form form');
    if (uploadForm) {
        const inputs = uploadForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add visual feedback on focus
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                validateInput(this);
            });
        });

        uploadForm.addEventListener('submit', function(e) {
            let isValid = true;
            const titleInput = this.querySelector('input[name="title"]');
            const fileInput = this.querySelector('input[type="file"]');
            
            if (!validateInput(titleInput)) isValid = false;
            if (!validateInput(fileInput)) isValid = false;
            
            if (!isValid) {
                e.preventDefault();
                showAlert('Please fill in all required fields correctly', 'danger');
            }
        });
    }

    // Enhanced alert system with animations
    function showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Add entrance animation
        alertDiv.style.opacity = '0';
        alertDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            alertDiv.style.opacity = '1';
            alertDiv.style.transform = 'translateY(0)';
        }, 50);
        
        // Auto dismiss with fade out
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            alertDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }

    // Enhanced smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = 'var(--hover-shadow)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--card-shadow)';
        });
    });

    // Enhanced lazy loading with fade-in effect
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            img.src = img.dataset.src;
            img.onload = () => {
                img.style.opacity = '1';
            };
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Enhanced logout form submission with confirmation
    const logoutForm = document.querySelector('form[action*="logout"]');
    if (logoutForm) {
        logoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                this.submit();
            }
        });
    }

    // Helper function for input validation
    function validateInput(input) {
        const isValid = input.value.trim() !== '';
        input.classList.toggle('is-invalid', !isValid);
        input.classList.toggle('is-valid', isValid);
        return isValid;
    }
});