document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const consultationBtn = document.getElementById('consultationBtn');
    const heroConsultationBtn = document.getElementById('heroConsultationBtn');
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

    heroConsultationBtn?.addEventListener('click', () => {
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
            
            console.log('Form submitted:', data);
            showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');
            
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
            
            form.reset();
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
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

        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
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
                center: [53.902496, 27.561481],
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            const placemark = new ymaps.Placemark([53.902496, 27.561481], {
                hintContent: 'CYBERITI',
                balloonContent: '<strong>CYBERITI</strong><br>г. Минск, ул. Немига, 40'
            }, {
                preset: 'islands#redDotIcon'
            });

            map.geoObjects.add(placemark);
        });
    }

    // Header scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.9)';
            }
        });
    }

    // Мобильное меню - ИСПРАВЛЕННОЕ
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Закрытие мобильного меню при клике на ссылку
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        // Закрытие мобильного меню при изменении размера экрана
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }

    // Слайдер - ИСПРАВЛЕННЫЙ
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        console.log('Showing slide:', index);
        
        // Убираем активный класс со всех слайдов и точек
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Добавляем активный класс к текущему слайду и точке
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3500);
        console.log('Slideshow started');
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
        console.log('Slideshow stopped');
    }

    // Инициализация слайдера
    if (slides.length > 0) {
        console.log('Found', slides.length, 'slides');
        showSlide(0);
        startSlideshow();

        // Клики по точкам
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Dot clicked:', index);
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // Пауза при наведении на слайдер
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideshow);
            sliderContainer.addEventListener('mouseleave', startSlideshow);
        }
    }

    // Intersection Observer для анимаций
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation (исключая hero)
    document.querySelectorAll('.section:not(.hero-section)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});