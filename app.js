document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear el fondo de estrellas simple
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
        starsContainer.appendChild(star);
    }

    // Estilos para la animación de las estrellas (añadido dinámicamente)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);

    // 2. Intersection Observer para animar los elementos al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                // Opcional: si quieres que la animación se repita si sube y baja, quita el unobserve
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const stops = document.querySelectorAll('.stop');
    stops.forEach(stop => {
        observer.observe(stop);
    });
});
