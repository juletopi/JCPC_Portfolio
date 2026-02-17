$(document).ready(function() {
    const themeToggleBtn = $('#theme-toggle-btn');
    const html = $('html');

    if (localStorage.getItem('theme') === 'light') {
        html.attr('data-bs-theme', 'light');
    }

    themeToggleBtn.on('click', function() {
        const currentTheme = html.attr('data-bs-theme');
        if (currentTheme === 'dark') {
            html.attr('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.attr('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);

            $('.menu-item').removeClass('active');
            $(this).addClass('active');
        }
    });

    $(window).scroll(function() {
        var scrollPos = $(this).scrollTop();
        $('.parallax-bg').css('transform', 'translateY(' + (scrollPos * 0.3) + 'px)');
        
        $('section').each(function() {
            var top = $(this).offset().top - 150;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                $('.menu-item').removeClass('active');
                $('a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    $('#year').text(new Date().getFullYear());

    const textElement = $('.typed-text');
    const texts = [
        'Dev Full-Stack',
        'Desenvolvendo sites com PHP Laravel',
        'Construindo automações com Python'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            textElement.text(currentText.substring(0, charIndex));
            charIndex++;
            
            if (charIndex > currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
        } else {
            textElement.text(currentText.substring(0, charIndex));
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
    
    setTimeout(typeWriter, 1000);
});
