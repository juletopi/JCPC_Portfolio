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
});
