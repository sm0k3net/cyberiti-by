document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const consultationBtn = document.getElementById('consultationBtn');
    const orderPentestBtn = document.getElementById('orderPentestBtn');
    const serviceButtons = document.querySelectorAll('[data-service]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

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

    // Initialize Yandex Map
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(() => {
            const map = new ymaps.Map('map', {
                center: [53.902284, 27.561831], // Coordinates for Minsk
                zoom: 15,
                controls: ['zoomControl']
            });
            
            const placemark = new ymaps.Placemark([53.902284, 27.561831], {
                hintContent: 'ООО "Сайберити"',
                balloonContent: 'Наш офис'
            });

            map.geoObjects.add(placemark);
        });
    }
});