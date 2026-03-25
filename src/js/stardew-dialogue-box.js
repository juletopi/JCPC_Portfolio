$(document).ready(function () {

    const dialogueTabs = [
        {
            id: 'sobre-mim',
            label: 'Sobre mim',
            icon: 'src/images/stardew_valley/avatar.svg',
            portrait: 'src/images/stardew_valley/portrait_juletopi.png',
            portraitAlt: 'Julio Cezar',
            title: 'Sobre mim',
            content: `
                <p class="lead pixel-text">
                    Heya folks! Sou Julio Cezar (Juletopi). Desenvolvedor Full-Stack e estudante do IFRO.<br>
                    Trabalho criando robôs de webscraping com Python, desenvolvendo sites com PHP Laravel e criando apps com React.
                </p>
                <p class="pixel-text">
                    No meu tempo livre, voce provavelmente vai me encontrar estudando, ouvindo rock,<br>
                    assistindo anime, jogando na Steam ou lendo mangas.
                </p>
            `,
            badges: [
                { cssClass: 'bg-custom-primary',    text: 'LVL 22' },
                { cssClass: 'bg-custom-secondary',  text: 'CLASS: &nbsp; FULL-STACK DEVELOPER' },
                { cssClass: 'bg-custom-success',    text: 'HP: 130% &nbsp; (BOOSTED BY COFFEE)' },
            ],
        },
        {
            id: 'interesses',
            label: 'Interesses',
            icon: 'src/images/stardew_valley/heart.svg',
            title: 'Interesses',
            content: `
                <p class="lead pixel-text">Coisas que fazem meu coração de dev feliz fora do código:</p>
                <p class="pixel-text">
                    🎸 &nbsp; Rock, Clássicas e Eletrônicas — escutando playlists grandonas no Spotify.<br>
                    📺 &nbsp; Anime e Mangá — sempre re-assistindo animes que gosto e lendo alguns mangás nichados.<br>
                    🎮 &nbsp; Games — Steam é meu segundo lar e Minecraft é onde gasto minha criatividade construindo.<br>
                    💬 &nbsp; Pergunte-me algo sobre desenvolvimento web, webscraping, Python, PHP Laravel, C# .NET.
                </p>
            `,
        },
        {
            id: 'contato',
            label: 'Entre em contato',
            icon: 'src/images/stardew_valley/map.svg',
            title: 'Entre em contato',
            content: `
                <p class="lead pixel-text">Quer conversar, colaborar ou só dizer oi?</p>
                <p class="pixel-text">
                    Estou sempre aberto a novas oportunidades,<br>
                    projetos legais e boas conversas!
                </p>
            `,
            badges: [
                { cssClass: 'bg-custom-primary',    text: 'LINKEDIN',  link: 'https://www.linkedin.com/in/julio-cezar-pereira-camargo/' },
                { cssClass: 'bg-custom-secondary',  text: 'GITHUB',    link: 'https://github.com/juletopi' },
                { cssClass: 'bg-custom-info',       text: 'INSTAGRAM', link: 'https://www.instagram.com/juletopi/' },
            ],
        },
        {
            id: 'spotify',
            label: 'Escutando no Spotify',
            icon: 'src/images/stardew_valley/spotify.svg',
            title: '',
            content: `
                <div class="stardew-spotify-player">
                    <img
                        class="stardew-dancing-npc stardew-dancing-npc--left"
                        src="src/images/stardew_valley/dancing_abigail.gif"
                        alt="Abigail dançando"
                        loading="lazy"
                    />
                    <a href="https://open.spotify.com/user/7qje4cjhxymamlcmxzo749qvo"
                       target="_blank" rel="noopener noreferrer"
                       class="stardew-spotify-link">
                        <img
                            class="stardew-spotify-widget-img"
                            src="https://spotify-api-readme-fork.vercel.app/api/spotify/"
                            alt="Player Spotify de Juletopi"
                            loading="lazy"
                        />
                    </a>
                    <img
                        class="stardew-dancing-npc stardew-dancing-npc--right"
                        src="src/images/stardew_valley/dancing_emily.gif"
                        alt="Emily dançando"
                        loading="lazy"
                    />
                </div>
            `,
        },
    ];

    const STORAGE_KEY = 'stardew-dialogue-active-tab';
    const spotifyHiddenMq = window.matchMedia('(max-width: 480px)');
    const tabIds = dialogueTabs.map(function (t) { return t.id; });

    function getInitialTabId() {
        let id = localStorage.getItem(STORAGE_KEY);
        if (!id || tabIds.indexOf(id) === -1) {
            id = dialogueTabs[0].id;
        }
        if (spotifyHiddenMq.matches && id === 'spotify') {
            id = dialogueTabs[0].id;
        }
        return id;
    }

    const initialTabId = getInitialTabId();

    const root = $('#stardew-dialogue-root');
    if (!root.length) return;

    let tabsHtml = `<div class="dialogue-tabs-container">`;
    dialogueTabs.forEach(function (tab) {
        const activeClass = tab.id === initialTabId ? 'dialogue-tab--active' : '';
        tabsHtml += `
            <button class="btn dialogue-tab ${activeClass}"
                    data-tooltip="${tab.label}"
                    data-tab="${tab.id}"
                    aria-label="${tab.label}">
                <img src="${tab.icon}" class="dialogue-tab-img" alt="${tab.label}">
            </button>`;
    });
    tabsHtml += `</div>`;

    let panelsHtml = `<div class="dialogue-content-box bg-pixel-card mt-0 mx-2">`;
    dialogueTabs.forEach(function (tab) {
        const hidden = tab.id !== initialTabId ? ' style="display:none"' : '';

        let badgesHtml = '';
        if (tab.badges && tab.badges.length) {
            badgesHtml = `<div class="status-bar mt-3">`;
            tab.badges.forEach(function (badge) {
                if (badge.link) {
                    badgesHtml += `<a href="${badge.link}" target="_blank" rel="noopener"
                                      class="badge ${badge.cssClass} p-2 me-2">${badge.text}</a>`;
                } else {
                    badgesHtml += `<span class="badge ${badge.cssClass} p-2 me-2">${badge.text}</span>`;
                }
            });
            badgesHtml += `</div>`;
        }

        const hasPortrait = !!tab.portrait;
        const contentCol  = hasPortrait ? 'col-md-8' : 'col-12';
        const portraitHtml = hasPortrait ? `
                <div class="col-md-4 text-center mb-4 mb-md-0">
                    <div class="avatar-container">
                        <img src="${tab.portrait}" class="img-fluid portrait-npc" alt="${tab.portraitAlt}">
                    </div>
                </div>` : '';

        panelsHtml += `
            <div id="tab-${tab.id}" class="dialogue-panel row align-items-center"${hidden}>
                ${portraitHtml}
                <div class="${contentCol}">
                    <h2 class="section-title">${tab.title}</h2>
                    ${tab.content}
                    ${badgesHtml}
                </div>
            </div>`;
    });
    panelsHtml += `</div>`;

    root.html(`<div class="stardew-menu">${tabsHtml}${panelsHtml}</div>`);

    function setActiveTab(tabId) {
        if (tabIds.indexOf(tabId) === -1) {
            tabId = dialogueTabs[0].id;
        }
        if (spotifyHiddenMq.matches && tabId === 'spotify') {
            tabId = dialogueTabs[0].id;
        }
        root.find('.dialogue-tab').removeClass('dialogue-tab--active');
        root.find('.dialogue-tab[data-tab="' + tabId + '"]').addClass('dialogue-tab--active');
        root.find('.dialogue-panel').hide();
        root.find('#tab-' + tabId).show();
        try {
            localStorage.setItem(STORAGE_KEY, tabId);
        } catch (e) {}
    }

    root.on('click', '.dialogue-tab', function () {
        setActiveTab($(this).data('tab'));
    });

    function syncSpotifyTabVisibility() {
        const hideSpotify = spotifyHiddenMq.matches;
        root.toggleClass('stardew-dialogue--no-spotify', hideSpotify);
        if (hideSpotify && root.find('.dialogue-tab--active').data('tab') === 'spotify') {
            setActiveTab(dialogueTabs[0].id);
        }
    }

    syncSpotifyTabVisibility();
    if (typeof spotifyHiddenMq.addEventListener === 'function') {
        spotifyHiddenMq.addEventListener('change', syncSpotifyTabVisibility);
    } else if (typeof spotifyHiddenMq.addListener === 'function') {
        spotifyHiddenMq.addListener(syncSpotifyTabVisibility);
    }
});
