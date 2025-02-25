// Paralax effect
window.addEventListener('scroll', function() {
    const parallaxContainer = document.querySelector('.parallax-container');
    let scrollPosition = window.scrollY; 
    parallaxContainer.style.backgroundPositionY = scrollPosition * 0.5 + 'px'; 
});

// Atualização automática do ano para o rodapé
document.getElementById('current-year').textContent = new Date().getFullYear();

// Event listener para o botão Github
document.getElementById('github-button-id').addEventListener('click', function() {
    event.preventDefault();
    if (confirm('Você será redirecionado para outra página. Deseja continuar?')) {
        window.location.href = 'https://github.com/juletopi';
    }
});
