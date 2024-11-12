// script.js
const carousel = document.querySelector('.carousel');
let slideIndex = 0;

// Функция для перехода к следующему слайду
function nextSlide() {
    const images = carousel.getElementsByTagName('img');
    
    // Если достигли конца карусели, возвращаемся к началу
    if (slideIndex >= images.length) {
        slideIndex = 0;
    }
    
    carousel.scrollTo({
        left: images[slideIndex].offsetLeft,
        behavior: 'smooth'
    });
    
    slideIndex++;
}

// Автоматическое переключение слайдов через каждые 3 секунды
setInterval(nextSlide, 3000);

// Обработчик события прокрутки колесиком мыши
carousel.addEventListener('wheel', function(event) {
    event.preventDefault(); // Отключаем стандартную прокрутку страницы
    
    const deltaY = Math.sign(event.deltaY);
    
    if (deltaY > 0) {
        // Прокручиваем вправо
        nextSlide();
    } else {
        // Прокручиваем влево
        previousSlide();
    }
});

// Функция для перехода к предыдущему слайду
function previousSlide() {
    const images = carousel.getElementsByTagName('img');
    
    // Если находимся в начале карусели, переходим к последнему слайду
    if (slideIndex === 0) {
        slideIndex = images.length;
    }
    
    slideIndex--;
    
    carousel.scrollTo({
        left: images[slideIndex].offsetLeft,
        behavior: 'smooth'
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll(".lazyload");
    
    // Используем IntersectionObserver для отслеживания появления элементов в зоне видимости
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          
          // Отключаем наблюдение за элементом после загрузки
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' }); // Настраиваем отступ перед началом загрузки
  
    lazyImages.forEach(image => {
      observer.observe(image);
    });
  });
  