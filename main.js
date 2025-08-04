document.addEventListener('DOMContentLoaded', () => {
    // Modal handling
    const modals = {
        consultation: document.getElementById('consultationModal'),
        pentest: document.getElementById('pentestModal')
    };

    const buttons = {
        consultation: document.getElementById('consultationBtn'),
        orderPentest: document.getElementById('orderPentestBtn'),
        moreInfo: document.getElementById('moreInfoBtn')
    };

    // Open modal function
    const openModal = (modalId) => {
        modals[modalId].style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Close modal function
    const closeModal = (modalId) => {
        modals[modalId].style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Event listeners for buttons
    buttons.consultation.addEventListener('click', () => openModal('consultation'));
    buttons.orderPentest.addEventListener('click', () => openModal('pentest'));

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        Object.keys(modals).forEach(modalId => {
            if (e.target === modals[modalId]) {
                closeModal(modalId);
            }
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            // Here you would typically send the data to your server
            console.log('Form submitted:', Object.fromEntries(formData));
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    });

    // Service tile click handlers
    document.querySelectorAll('.service-tile .more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const service = e.target.dataset.service;
            // Here you would show the modal with service details
            console.log(`Show details for ${service}`);
        });
    });
});