document.addEventListener('DOMContentLoaded', () => {
    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for buttons
    document.getElementById('consultationBtn').addEventListener('click', () => {
        openModal('consultationModal');
    });

    document.getElementById('orderPentestBtn').addEventListener('click', () => {
        openModal('pentestModal');
    });

    // Close button handlers
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
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
            alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
            form.reset();
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});