document.addEventListener('DOMContentLoaded', () => {
    // Обработка модальных окон для услуг
    const serviceButtons = document.querySelectorAll('[data-service]');
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceType = button.dataset.service;
            const modalId = `serviceModal-${serviceType}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Функции для работы с модальными окнами
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Закрытие модальных окон
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Инициализация карты Яндекс (добавьте свой API ключ)
    ymaps.ready(() => {
        const map = new ymaps.Map('map', {
            center: [53.902284, 27.561831], // координаты Минска
            zoom: 15
        });
        
        const placemark = new ymaps.Placemark([53.902284, 27.561831], {
            hintContent: 'ООО "Сайберити"',
            balloonContent: 'Наш офис'
        });

        map.geoObjects.add(placemark);
    });
});