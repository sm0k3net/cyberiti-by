document.addEventListener('DOMContentLoaded', () => {
    // Обработка модальных окон для услуг
    const serviceButtons = document.querySelectorAll('[data-service]');
    const consultationBtn = document.getElementById('consultationBtn');

    // Обработчик для кнопки "Получить консультацию"
    consultationBtn.addEventListener('click', () => {
        const modal = document.getElementById('consultationModal');
        openModal(modal);
    });

    // Обработчики для кнопок "Подробнее" в услугах
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = button.dataset.service;
            const modalId = `serviceModal-${serviceType}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Плавная прокрутка для всех внутренних ссылок
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

    // Функции для работы с модальными окнами
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Добавляем класс для анимации появления
        setTimeout(() => {
            modal.classList.add('modal-visible');
        }, 10);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('modal-visible');
        
        // Ждем окончания анимации перед скрытием
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
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

    // Инициализация карты Яндекс
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(() => {
            const map = new ymaps.Map('map', {
                center: [53.902284, 27.561831],
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