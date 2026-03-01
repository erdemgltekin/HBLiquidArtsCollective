document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.events-slider');
    const nextBtn = document.querySelector('.slider-nav-btn.next');
    const prevBtn = document.querySelector('.slider-nav-btn.prev');

    // Elemanlar yoksa scripti çalıştırma (Hata önleme)
    if (!slider || !nextBtn || !prevBtn) return;

    // 1. KESİNTİSİZ AKIŞ İÇİN KLONLAMA
    // Orijinal kartları al ve slider'ın sonuna ekle
    const cards = Array.from(slider.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });

    // 2. AKIŞ AYARLARI
    let autoScrollSpeed = 0.5; // Hız 1'den 0.5'e düşürüldü (Daha yavaş ve premium)
    let isPaused = false;
    let requestID;

    // Otomatik Kaydırma Döngüsü
    function step() {
        if (!isPaused) {
            slider.scrollLeft += autoScrollSpeed;

            // Eğer orijinal set bittiyse (slider'ın yarısına gelindiyse) fark ettirmeden başa dön
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 0;
            }
        }
        requestID = requestAnimationFrame(step);
    }

    // Başlat
    requestID = requestAnimationFrame(step);

    // 3. OK KONTROLLERİ (MANUEL GEÇİŞ)
    // Kart genişliğini dinamik hesaplar (gap dahil)
    const getMoveAmount = () => {
        const firstCard = slider.querySelector('.event-card');
        return firstCard ? firstCard.offsetWidth + 30 : 380;
    };

    nextBtn.addEventListener('click', () => {
        // Yumuşak geçiş için behavior: 'smooth'
        slider.scrollBy({ left: getMoveAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        // En baştaysak sona atla (Sonsuz geri dönme hissi)
        if (slider.scrollLeft <= 5) {
            slider.scrollLeft = slider.scrollWidth / 2;
        }
        slider.scrollBy({ left: -getMoveAmount(), behavior: 'smooth' });
    });

    // 4. DURAKLATMA MANTIĞI (HOVER & TOUCH)
    // Kullanıcı kartları incelerken veya butonlara basarken akışı durdurur
    const pause = () => { isPaused = true; };
    const resume = () => { isPaused = false; };

    // Slider alanı
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);

    // Navigasyon butonları
    [nextBtn, prevBtn].forEach(btn => {
        btn.addEventListener('mouseenter', pause);
        btn.addEventListener('mouseleave', resume);
        // Tıklandığında da kısa bir duraksama için
        btn.addEventListener('click', () => {
            pause();
            setTimeout(resume, 2000); // Tıklandıktan 2 saniye sonra devam et
        });
    });

    // Mobil dokunmatik desteği
    slider.addEventListener('touchstart', pause, { passive: true });
    slider.addEventListener('touchend', resume);
});