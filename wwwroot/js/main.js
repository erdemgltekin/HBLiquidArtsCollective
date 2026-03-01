$(document).ready(function () {
    // --- 1. Header Sticky Efekti ---
    const header = $('#siteHeader');
    function checkScroll() {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 20) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    }
    $(window).on('scroll', checkScroll);
    checkScroll();

    // --- 2. Sayfa İçi Smooth Scroll ---
    $('a[href^="#"]').on('click', function (event) {
        const href = this.getAttribute('href');
        if (href !== "#" && href.length > 1) {
            const target = $(href);
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 85
                }, 800);
            }
        }
    });
});