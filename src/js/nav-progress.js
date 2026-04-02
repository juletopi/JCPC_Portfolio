document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('#nav-progress');
    if (!nav) return;

    const levelNumber = nav.querySelector('.nav-progress__level-number');
    const headline = nav.querySelector('.nav-progress__headline');
    const fill = nav.querySelector('.nav-progress__bar-fill');
    const collapseEl = nav.querySelector('#nav-progress-collapse');
    const statusEl = nav.querySelector('.nav-progress__status');
    const links = Array.from(nav.querySelectorAll('.nav-progress__link[data-section]'));
    const sections = links
        .map(function (link) {
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (!section) return null;
            return {
                id: sectionId,
                name: link.textContent.trim(),
                section: section,
                link: link,
            };
        })
        .filter(Boolean);

    if (!sections.length) return;

    function padLevel(index) {
        return String(index).padStart(2, '0');
    }

    function getScrollProgress() {
        const doc = document.documentElement;
        const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
        const rawProgress = window.scrollY / maxScroll;
        return Math.max(0, Math.min(1, rawProgress));
    }

    function getActiveSectionId() {
        const offset = Math.round(window.innerHeight * 0.32);
        const probeLine = window.scrollY + offset;
        let activeSection = sections[0];

        for (let index = 0; index < sections.length; index += 1) {
            const item = sections[index];
            const top = item.section.getBoundingClientRect().top + window.scrollY;
            if (top <= probeLine) {
                activeSection = item;
            }
        }

        return activeSection.id;
    }

    function syncActiveSection(activeId) {
        const activeIndex = sections.findIndex(function (item) {
            return item.id === activeId;
        });

        if (activeIndex === -1) return;

        const activeSection = sections[activeIndex];

        if (levelNumber) {
            levelNumber.textContent = padLevel(activeIndex + 1);
        }

        if (headline) {
            headline.textContent = 'LVL ' + padLevel(activeIndex + 1) + ' • ' + activeSection.name;
        }

        links.forEach(function (link) {
            const isActive = link.getAttribute('data-section') === activeId;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function syncProgressBar() {
        if (!fill) return;
        const progress = getScrollProgress();
        fill.style.width = (progress * 100).toFixed(2) + '%';
    }

    function updateNavigationState() {
        syncProgressBar();
        syncActiveSection(getActiveSectionId());
    }

    function setupCollapseInteraction() {
        if (!collapseEl || !window.bootstrap || !window.bootstrap.Collapse) return;

        const collapseApi = new window.bootstrap.Collapse(collapseEl, { toggle: false });
        const hoverEnabled = window.matchMedia('(hover: hover) and (pointer: fine)');

        function setExpanded(expanded) {
            if (expanded) {
                collapseApi.show();
            } else {
                collapseApi.hide();
            }
        }

        function syncMode() {
            setExpanded(false);
        }

        if (statusEl) {
            statusEl.addEventListener('click', function () {
                if (hoverEnabled.matches) return;
                const expanded = collapseEl.classList.contains('show');
                setExpanded(!expanded);
            });
        }

        nav.addEventListener('mouseenter', function () {
            if (hoverEnabled.matches) setExpanded(true);
        });

        nav.addEventListener('mouseleave', function () {
            if (hoverEnabled.matches) setExpanded(false);
        });

        nav.addEventListener('focusin', function () {
            if (hoverEnabled.matches) setExpanded(true);
        });

        nav.addEventListener('focusout', function () {
            if (!hoverEnabled.matches) return;
            const active = document.activeElement;
            if (!nav.contains(active)) {
                setExpanded(false);
            }
        });

        links.forEach(function (link) {
            link.addEventListener('click', function () {
                if (!hoverEnabled.matches) {
                    setExpanded(false);
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (hoverEnabled.matches) return;
            if (!collapseEl.classList.contains('show')) return;
            if (!nav.contains(event.target)) {
                setExpanded(false);
            }
        });

        if (typeof hoverEnabled.addEventListener === 'function') {
            hoverEnabled.addEventListener('change', syncMode);
        } else if (typeof hoverEnabled.addListener === 'function') {
            hoverEnabled.addListener(syncMode);
        }

        syncMode();
    }

    let rafId = null;
    function requestSync() {
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(function () {
            rafId = null;
            updateNavigationState();
        });
    }

    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);
    window.addEventListener('orientationchange', requestSync);

    setupCollapseInteraction();
    updateNavigationState();
    if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        if (sections.some(function (item) { return item.id === hashId; })) {
            syncActiveSection(hashId);
        }
    }
});
