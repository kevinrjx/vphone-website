
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        
        const linkPath = link.getAttribute('href');
        if (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
            link.classList.add('active');
        } else if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        }
    });

 
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (sliderTrack && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval; 

        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                resetInterval();
            });
        }
        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); 
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        
        updateSlider();
        startInterval();
    }

    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

               
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                productCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category');
        if (initialCategory) {
            const initialButton = document.querySelector(`.filter-btn[data-category="${initialCategory}"]`);
            if (initialButton) {
                initialButton.click(); 
            }
        }
    }
});