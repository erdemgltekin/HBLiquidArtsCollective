$(document).ready(function () {
    // Formu yakalıyoruz
    const $form = $('#globalContactForm');

    if ($form.length) {
        $form.on('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Buton ve içindeki metni form üzerinden bul
            const $btn = $(this).find('.btn-submit-glass');
            const $btnText = $btn.find('.btn-text');

            // 1. Durum: Gönderiliyor
            $btn.addClass('is-sending');
            $btnText.text('Mesajınız İletiliyor...');

            // 2. Simülasyon (2 saniye)
            setTimeout(function () {
                // 3. Durum: Başarı
                $btn.removeClass('is-sending').addClass('is-success');
                $btnText.text('Talebiniz Başarıyla Alındı');

                // 4. Formu ve Select'i Temizle
                $form[0].reset();
                $form.find('select').val('').trigger('change');

                // 5. Reset (5 saniye sonra butonu eski haline döndür)
                setTimeout(function () {
                    $btn.removeClass('is-success');
                    $btnText.text('Talebi Gönder');
                }, 5000);

            }, 2000);

            return false;
        });
    }
});