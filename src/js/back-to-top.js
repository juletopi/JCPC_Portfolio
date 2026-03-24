$(document).ready(function() {
    const btn = $('#back-to-top-btn');
    const threshold = 400;

    function updateVisibility() {
        if ($(window).scrollTop() > threshold) {
            btn.addClass('is-visible');
        } else {
            btn.removeClass('is-visible');
        }
    }

    $(window).on('scroll', updateVisibility);
    updateVisibility();

    btn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 450);
    });
});
