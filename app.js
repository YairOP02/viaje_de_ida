document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL LOGIN INTERACTIVO ---
    const overlay = document.getElementById('login-overlay');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    const nameInput = document.getElementById('nameInput');
    const btnStep1 = document.getElementById('btnStep1');
    const error1 = document.getElementById('error1');
    
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');

    // Paso 1: Validar Nombre
    btnStep1.addEventListener('click', () => {
        const name = nameInput.value.trim().toLowerCase();
        // Validación estricta: Solo deja pasar si el texto contiene "francis" o "yair"
        if (name.includes('francis') || name.includes('yair')) {
            step1.style.opacity = '0';
            setTimeout(() => {
                step1.classList.add('hidden');
                step1.style.display = 'none'; // Asegura que no ocupe espacio
                step2.classList.remove('hidden');
                step2.style.display = 'block';
                // Trigger reflow
                void step2.offsetWidth;
                step2.style.opacity = '1';
            }, 500);
        } else {
            error1.classList.remove('hidden');
        }
    });

    // Bromita con el botón NO
    btnNo.addEventListener('click', () => {
        btnNo.innerText = "Error: Opción deshabilitada por el destino";
        btnNo.style.color = "#ff4d4d";
        btnNo.style.borderColor = "#ff4d4d";
        setTimeout(() => {
            btnNo.innerText = "No";
            btnNo.style.color = "";
            btnNo.style.borderColor = "";
        }, 2000);
    });

    // Paso 2: Dijo que SÍ
    btnYes.addEventListener('click', () => {
        step2.style.opacity = '0';
        setTimeout(() => {
            step2.classList.add('hidden');
            step2.style.display = 'none'; // Evita que empuje el paso 3 a la derecha
            step3.classList.remove('hidden');
            step3.style.display = 'block';
            void step3.offsetWidth;
            step3.style.opacity = '1';

            // Iluminación gradual del fondo (de negro puro al fondo transparente estrellado)
            overlay.style.backgroundColor = 'rgba(0,0,0,0)';
            
            // Después de 4 segundos del mensaje final, desaparecer el overlay por completo
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove(); // Quita el overlay del código para poder hacer scroll
                }, 2000);
            }, 4000);

        }, 500);
    });


    // --- LÓGICA DE LAS ESTRELLAS Y SCROLL (Ya existente) ---
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

    // Estrellas Fugaces
    for (let i = 0; i < 6; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = Math.random() * 50 + 'vh';
        shootingStar.style.left = (Math.random() * 50 + 50) + 'vw'; // Que salgan de la derecha
        shootingStar.style.animationDelay = (Math.random() * 10) + 's';
        starsContainer.appendChild(shootingStar);
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

    // --- LÓGICA DE TARJETAS INTERACTIVAS (Tocar para revelar) ---
    const interactiveCards = document.querySelectorAll('.glass-card:not(.final-card)');
    interactiveCards.forEach(card => {
        // Añadir el hint dinámicamente
        const hint = document.createElement('div');
        hint.className = 'tap-hint';
        hint.innerHTML = '👆 Toca para ver la imagen';
        card.appendChild(hint);

        // Al tocar la tarjeta, alterna entre mostrar el poema o la foto
        card.addEventListener('click', () => {
            card.classList.toggle('revealed');
            
            // Si tiene un video, reproducirlo al revelar para evitar problemas en móviles
            const video = card.querySelector('video');
            if (video && card.classList.contains('revealed')) {
                video.play().catch(e => console.log('Autoplay bloqueado', e));
            }
        });
    });

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
            }
        });
    }, observerOptions);

    const stops = document.querySelectorAll('.stop');
    stops.forEach(stop => {
        observer.observe(stop);
    });

    // --- EASTER EGG (Secreto Final) ---
    const secretBox = document.getElementById('secretBox');
    if (secretBox) {
        secretBox.addEventListener('click', () => {
            // Obtener la fecha de hoy
            const hoy = new Date();
            const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaString = hoy.toLocaleDateString('es-ES', opciones);

            secretBox.style.opacity = '1';
            secretBox.innerHTML = `
                <div class="secret-message fade-in-slow">
                    Con todo el amor del mundo,<br>
                    de <strong>Yair Oquendo</strong> para su reina <strong>Francis Scott</strong>.<br>
                    <span style="font-size: 0.9rem; opacity: 0.7; color: white;">${fechaString} - Nuestro Viaje</span>
                </div>
            `;
            secretBox.style.cursor = 'default';
        });
    }

    // --- CONTADOR DE TIEMPO EN VIVO ---
    // Fecha y hora exacta: 31 de marzo de 2026, a las 14:30 (2:30 PM)
    const startDate = new Date('2026-03-31T14:30:00-05:00');

    function updateCounter() {
        const now = new Date();
        let diff = now - startDate;

        if (diff < 0) return; // Si por alguna razón la fecha del celular está mal

        // Cálculo de días totales
        const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Asumiendo un promedio de 30 días por mes para simplicidad en este conteo emocional
        const months = Math.floor(daysTotal / 30);
        const days = daysTotal % 30;

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const elMonths = document.getElementById('c-months');
        const elDays = document.getElementById('c-days');
        const elHours = document.getElementById('c-hours');
        const elMinutes = document.getElementById('c-minutes');
        const elSeconds = document.getElementById('c-seconds');

        if(elMonths) elMonths.innerText = months;
        if(elDays) elDays.innerText = days;
        if(elHours) elHours.innerText = hours;
        if(elMinutes) elMinutes.innerText = minutes;
        if(elSeconds) elSeconds.innerText = seconds;
    }

    setInterval(updateCounter, 1000);
    updateCounter(); // Llamada inicial
});
