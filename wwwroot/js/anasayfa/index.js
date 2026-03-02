document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.events-slider');
    const nextBtn = document.querySelector('.slider-nav-btn.next');
    const prevBtn = document.querySelector('.slider-nav-btn.prev');

    if (!slider || !nextBtn || !prevBtn) return;

    // 1. KESİNTİSİZ AKIŞ İÇİN KLONLAMA
    const cards = Array.from(slider.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });

    // 2. AKIŞ AYARLARI
    let autoScrollSpeed = 0.3;
    let isPaused = false;
    let currentScroll = 0; // Hassas takip için değişken

    function step() {
        if (!isPaused) {
            // Hassas değişkenimize hızı ekliyoruz
            currentScroll += autoScrollSpeed;

            // Slider'a tam sayı olarak atıyoruz (Hareketi tetikleyen kısım burası)
            slider.scrollLeft = Math.floor(currentScroll);

            // Başa dönme kontrolü (Orijinal genişliğin yarısı)
            if (currentScroll >= slider.scrollWidth / 2) {
                currentScroll = 0;
                slider.scrollLeft = 0;
            }
        } else {
            // Manuel müdahale (oklar veya hover) olduğunda değişkeni senkronize tut
            currentScroll = slider.scrollLeft;
        }
        requestAnimationFrame(step);
    }

    // Başlat
    requestAnimationFrame(step);

    // 3. OK KONTROLLERİ
    const getMoveAmount = () => {
        const firstCard = slider.querySelector('.event-card');
        return firstCard ? firstCard.offsetWidth + 30 : 380;
    };

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getMoveAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        if (slider.scrollLeft <= 5) {
            currentScroll = slider.scrollWidth / 2;
            slider.scrollLeft = currentScroll;
        }
        slider.scrollBy({ left: -getMoveAmount(), behavior: 'smooth' });
    });

    // 4. DURAKLATMA MANTIĞI
    const pause = () => { isPaused = true; };
    const resume = () => {
        isPaused = false;
        currentScroll = slider.scrollLeft; // Devam ederken kaldığı yerden başla
    };

    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);

    [nextBtn, prevBtn].forEach(btn => {
        btn.addEventListener('mouseenter', pause);
        btn.addEventListener('mouseleave', resume);
        btn.addEventListener('click', () => {
            pause();
            setTimeout(resume, 2000);
        });
    });

    slider.addEventListener('touchstart', pause, { passive: true });
    slider.addEventListener('touchend', resume);
});