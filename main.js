const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;

function updateSlider() {
    const slideWidth = slide[0].clientWidth; // Ancho dinámico de un slide
    const gap = parseFloat(getComputedStyle(slides).gap) || 0; // Espacio entre slides
    slides.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slide.length;
    updateSlider();
});

prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slide.length) % slide.length;
    updateSlider();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % slide.length;
    updateSlider();
}, 5000);

// Ajusta el slider en caso de redimensionar la ventana
window.addEventListener('resize', updateSlider);








// Ir arriba botón //

window.onscroll = function(){
    if(document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container')
        .classList.add('show')
    }else{
        document.querySelector('.go-top-container')
        .classList.remove('show')  
    }
}

document.querySelector('.go-top-container').addEventListener('click', () =>{
    window.scrollTo({
        top: 0,
        behavior:'smooth'
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const heroHeading = document.querySelector("#hero h1");
    const heroParagraph = document.querySelector("#hero p");

    // Detecta si es un dispositivo móvil o no
    const isMobile = window.matchMedia("(max-width: 992px)").matches;

    if (isMobile) {
        // En móviles, la animación se activa con un clic en el <h1>
        heroHeading.addEventListener("click", () => {
            if (heroHeading.classList.contains("active")) {
                heroHeading.classList.remove("active");
            } else {
                heroHeading.classList.add("active");
            }
        });
    } else {
        // En escritorio, la animación de hover funciona normalmente
        heroHeading.addEventListener("mouseenter", () => {
            heroHeading.classList.add("active");
        });

        heroHeading.addEventListener("mouseleave", () => {
            heroHeading.classList.remove("active");
        });
    }
});






window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 100) {
    document.querySelector('.go-top-container2').classList.add('show');
  } else {
    document.querySelector('.go-top-container2').classList.remove('show');
  }
});

document.querySelector('.go-top-container2').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



