document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const consultationBtn = document.getElementById('consultationBtn');
    const orderPentestBtn = document.getElementById('orderPentestBtn');
    const serviceButtons = document.querySelectorAll('[data-service]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const forms = document.querySelectorAll('form');

    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate modal appearance
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }

    // Close modal function
    function closeModal(modal) {
        if (!modal) return;
        
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Event Listeners
    consultationBtn?.addEventListener('click', () => {
        openModal('consultationModal');
    });

    orderPentestBtn?.addEventListener('click', () => {
        openModal('pentestOrderModal');
    });

    // Service buttons
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceType = button.dataset.service;
            openModal(`serviceModal-${serviceType}`);
        });
    });

    // Close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="flex"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    // Form submissions
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Close modal if form is in one
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
            
            // Reset form
            form.reset();
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Yandex Map
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(() => {
            const map = new ymaps.Map('map', {
                center: [53.902496, 27.561481], // Немига, 40, Минск
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            const placemark = new ymaps.Placemark([53.902496, 27.561481], {
                hintContent: 'CyberITI',
                balloonContent: '<strong>CyberITI</strong><br>г. Минск, ул. Немига, 40'
            }, {
                preset: 'islands#redDotIcon'
            });

            map.geoObjects.add(placemark);
        });
    }

    // Header scroll
    const header = document.getElementById('header');
    const sticky = header.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > sticky) {
            header.classList.add('header-sticky');
        } else {
            header.classList.remove('header-sticky');
        }
    });
});