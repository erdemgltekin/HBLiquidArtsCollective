/**
 * HB Liquid Arts Collective - Hizmetlerimiz Sayfası İnteraktif Davranışlar
 * Kart tıklamalarıyla detaylı overlay açma ve dinamik içerik yükleme.
 */

document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');
    const overlay = document.getElementById('serviceDetailOverlay');
    const overlayBody = document.getElementById('overlayBody');
    const closeOverlayBtn = document.getElementById('closeOverlay');

    if (!serviceCards || !overlay || !overlayBody || !closeOverlayBtn) return;

    // Her hizmet için detaylı içerik datası
    const serviceDetails = {
        'consultancy': {
            icon: 'bi-briefcase',
            title: 'Danışmanlık',
            desc: 'Oteller, restoranlar ve premium mekanlar için stratejik içecek programı geliştirme, menü küratörlüğü ve bar tasarım danışmanlığı sunuyoruz.',
            features: [
                { title: 'Menü Küratörlüğü', desc: 'Mekanınızın kimliğine özel imza kokteyller ve içki seçkileri.' },
                { title: 'Bar Planlama', desc: 'Verimlilik odaklı ergonomik bar tasarımı ve ekipman seçimi.' },
                { title: 'Maliyet Analizi', desc: 'Reçete standartlaştırma ve kârlılık optimizasyonu.' }
            ]
        },
        'workshop': {
            icon: 'bi-mortarboard',
            title: 'Workshop',
            desc: 'Craft sanatında ustalaşmak isteyen meraklılar ve profesyoneller için tasarlanmış sürükleyici miksoloji sınıfları ve içki eğitim programları.',
            features: [
                { title: 'Home-Mixologist', desc: 'Evde profesyonel seviyede kokteyl yapım teknikleri.' },
                { title: 'Pro-Masterclass', desc: 'Bar personeli için ileri seviye servis ve miksoloji eğitimi.' },
                { title: 'Tadım Etkinlikleri', desc: 'Viski, cin ve diğer craft spiritler üzerine derinlemesine tadım seansları.' }
            ]
        },
        'catering': {
            icon: 'bi-stars',
            title: 'Catering',
            desc: 'Premium sunum ve hizmetle özel etkinlikler, kurumsal fonksiyonlar ve kutlamalar için kişiselleştirilmiş kokteyl catering deneyimleri sağlıyoruz.',
            features: [
                { title: 'Mobil Bar', desc: 'İstediğiniz her yere kurulumu yapılabilen şık mobil bar sistemleri.' },
                { title: 'İmza Kokteyller', desc: 'Etkinliğinize özel tasarlanmış içecek konseptleri.' },
                { title: 'Profesyonel Ekip', desc: 'Deneyimli miksolojistler ve servis personeli.' }
            ]
        },
        'bar-concept': {
            icon: 'bi-award',
            title: 'Bar Konseptleri',
            desc: 'Markanıza özel benzersiz bar konseptleri ve tasarımları oluşturuyoruz. Sadece bir içki menüsü değil, bir yaşam tarzı tasarlıyoruz.',
            features: [
                { title: 'İmza Deneyimler', desc: 'Misafirlerin akıllarında yer edecek duyusal bar deneyimleri.' },
                { title: 'Görsel Kimlik', desc: 'Barınızın estetiği ve sunum standartlarının belirlenmesi.' }
            ]
        },
        'staff-training': {
            icon: 'bi-people',
            title: 'Personel Eğitimi',
            desc: 'Ekibinizi en yüksek hizmet standartlarına ve miksoloji tekniklerine hazırlıyoruz. Kaliteli hizmetin temelinde donanımlı ekip yatar.',
            features: [
                { title: 'Miksoloji Teknikleri', desc: 'Doğru karıştırma, çalkalama ve garnitür sanatının öğretilmesi.' },
                { title: 'Misafir İlişkileri', desc: 'Premium servis protokolleri ve hikaye anlatıcılığı.' }
            ]
        },
        'menu-opt': {
            icon: 'bi-graph-up-arrow',
            title: 'Menü Optimizasyonu',
            desc: 'Karlılığı artıran ve müşteri memnuniyetini maksimize eden stratejik menü geliştirme çalışmaları yapıyoruz.',
            features: [
                { title: 'Veri Odaklı Revizyon', desc: 'Satış verilerine dayalı menü mühendisliği.' },
                { title: 'Sezonluk Güncellemeler', desc: 'Mevsimsel girdilere göre dinamik menü yönetimi.' }
            ]
        }
    };

    // Overlay'i açar ve içeriği yükler
    function openOverlay(serviceId) {
        const data = serviceDetails[serviceId];
        if (!data) return;

        // İçeriği oluştur
        let contentHtml = `
            <div class="detail-header">
                <div class="detail-icon"><i class="bi ${data.icon}"></i></div>
                <h2>${data.title}</h2>
                <div class="detail-desc">${data.desc}</div>
            </div>
            <div class="feat-list">
        `;

        data.features.forEach(f => {
            contentHtml += `
                <div class="feat-item">
                    <i class="bi bi-check2-circle"></i>
                    <div class="feat-text">
                        <h4>${f.title}</h4>
                        <p>${f.desc}</p>
                    </div>
                </div>
            `;
        });

        contentHtml += `</div><div class="mt-5 pt-5 border-top border-secondary text-center">
            <a href="#contact-form-section" class="btn-submit-glass px-5 text-decoration-none" onclick="document.getElementById('serviceDetailOverlay').classList.remove('active')">
                Teklif Al
            </a>
        </div>`;

        overlayBody.innerHTML = contentHtml;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scroll kilitle
    }

    // Overlay'i kapatır
    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Scroll aç
    }

    // Event Dinleyicileri
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const sid = this.getAttribute('data-service-id');
            openOverlay(sid);
        });
    });

    closeOverlayBtn.addEventListener('click', closeOverlay);

    // Overlay dışına tıklayınca kapat
    overlay.addEventListener('click', function(e) {
        if (e.target.classList.contains('overlay-glass')) {
            closeOverlay();
        }
    });

    // ESC tuşuyla kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeOverlay();
    });
});
