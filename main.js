document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const consultationBtn = document.getElementById('consultationBtn');
    const orderPentestBtn = document.getElementById('orderPentestBtn');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const serviceButtons = document.querySelectorAll('[data-service]');

    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal(modal) {
        if (!modal) return;
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event Listeners
    consultationBtn?.addEventListener('click', () => {
        openModal('consultationModal');
    });

    orderPentestBtn?.addEventListener('click', () => {
        openModal('pentestModal');
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

    // Service buttons
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceType = button.dataset.service;
            openModal(`serviceModal-${serviceType}`);
        });
    });

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            console.log('Form submitted:', Object.fromEntries(formData));
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
            form.reset();
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});