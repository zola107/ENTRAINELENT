const gamesDatabase = [
    {
        id: 1,
        title: "Counter Strike",
        price: "59.99€",
        tags: ["Action", "FPS"],
        image: "images/cs.jpeg",
        installed: false
    },
    {
        id: 2,
        title: "Grounded",
        price: "49.99€",
        tags: ["RPG", "Aventure"],
        image: "images/grounded.jpeg",
        installed: true
    },
    {
        id: 3,
        title: "Rainbow Six Siege X",
        price: "39.99€",
        tags: ["Action", "FPS"],
        image: "images/R6.jpeg",
        installed: false
    },
    {
        id: 4,
        title: "Fortnite",
        price: "44.99€",
        tags: ["Aventure"],
        image: "images/fn.jpeg",
        installed: true
    },
    // ⬇️ AJOUTE ÇA ICI ⬇️
    {
        id: 5,
        title: "Rololf R6",
        price: "Gratuit",
        tags: ["Aventure", "Plateforme"],
        image: "images/rodolf.jpg",  // Crée une miniature ou utilise une image placeholder
        installed: true,
        gameLink: "games2.html"  // Le lien vers ton jeu
    },
    {
        id: 6,
        title: "snake",
        price: "Gratuit",
        tags: ["Aventure", "Plateforme"],
        image: "images/snake.jpeg",  // Crée une miniature ou utilise une image placeholder
        installed: true,
        gameLink: "games.html"  // Le lien vers ton jeu
     },
     
     {
        id: 7,
        title: "pong",
        price: "Gratuit",
        tags: ["Aventure", "Plateforme"],
        image: "images/raff.jpeg",  // Crée une miniature ou utilise une image placeholder
        installed: true,
        gameLink: "games3.html"  // Le lien vers ton jeu
     },

     {
        id: 7,
        title: "Space Invader",
        price: "Gratuit",
        tags: ["Aventure", "Plateforme"],
        image: "images/.jpeg",  // Crée une miniature ou utilise une image placeholder
        installed: true,
        gameLink: " games4.html"  // Le lien vers ton jeu
     },
    {
        id: 7,
        title: "Tetris",
        price: "Gratuit",
        tags: ["Aventure", "Plateforme"],
        image: "images/snake.jpeg",  // Crée une miniature ou utilise une image placeholder
        installed: true,
        gameLink: "games5.html"  // Le lien vers ton jeu
     }
];

// Navigation entre les pages
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(`${targetPage}-page`).classList.add('active');
        });
    });
}

// Créer une carte de jeu
function buildGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';

    card.innerHTML = `
        <div class="game-thumbnail">
            <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="game-details">
            <div class="game-name">${game.title}</div>
            <div class="game-price">${game.price}</div>
            <div class="game-tags">
                ${game.tags.map(tag => `<span class="game-tag">${tag}</span>`).join('')}
            </div>
            <button class="game-action-btn" data-id="${game.id}">
                ${game.installed ? '▶ Jouer' : '⬇ Installer'}
            </button>
        </div>
    `;

    return card;
}

// Afficher les jeux en vedette
function renderFeaturedGames() {
    const container = document.getElementById('featured-games');
    container.innerHTML = '';

    gamesDatabase.forEach(game => {
        const card = buildGameCard(game);
        container.appendChild(card);
    });

    setupGameButtons();
}

// Afficher la bibliothèque
function renderLibrary() {
    const container = document.getElementById('library-games');
    container.innerHTML = '';

    const installedGames = gamesDatabase.filter(game => game.installed);

    if (installedGames.length === 0) {
        container.innerHTML = '<p style="color:#666;text-align:center;grid-column:1/-1;padding:60px 20px;">Votre bibliothèque est vide</p>';
        return;
    }

    installedGames.forEach(game => {
        const card = buildGameCard(game);
        container.appendChild(card);
    });

    setupGameButtons();
}

// Configurer les boutons
function setupGameButtons() {
    const buttons = document.querySelectorAll('.game-action-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const gameId = parseInt(btn.getAttribute('data-id'));
            handleGameAction(gameId, btn);
        });
    });
}

// Actions jeu
function handleGameAction(gameId, button) {
    const game = gamesDatabase.find(g => g.id === gameId);

    if (!game.installed) {
        button.textContent = '⏳ Installation...';
        button.style.opacity = '0.6';
        button.disabled = true;

        setTimeout(() => {
            game.installed = true;
            button.textContent = '▶ Jouer';
            button.style.opacity = '1';
            button.disabled = false;

            showToast(`${game.title} installé avec succès !`, 'success');
            renderLibrary();
        }, 2000);
    } else {
        button.textContent = '⚡ Lancement...';
        button.style.opacity = '0.6';

        setTimeout(() => {
            button.textContent = '▶ Jouer';
            button.style.opacity = '1';
            showToast(`Lancement de ${game.title}`, 'info');
        }, 1500);
    }
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#4ade80' : '#667eea'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
    `;

    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Animations CSS
const animations = document.createElement('style');
animations.textContent = `
@keyframes slideUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
@keyframes slideDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100px); opacity: 0; }
}
`;
document.head.appendChild(animations);

// Recherche
function setupSearch() {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const gameCards = document.querySelectorAll('.game-card');

        gameCards.forEach(card => {
            const title = card.querySelector('.game-name').textContent.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    });
}

// Filtres
function setupFilters() {
    const chips = document.querySelectorAll('.chip');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
}

// Scroll animation
function setupScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.game-card, .category-item, .community-box, .help-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// Hero effect
function setupHeroEffect() {
    const hero = document.querySelector('.hero-banner');

    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        hero.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}

// Parallax cartes
function setupCardParallax() {
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.game-card:hover').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
            card.style.transform = `translateY(-4px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 GameStore chargé');

    setupNavigation();
    renderFeaturedGames();
    renderLibrary();
    setupSearch();
    setupFilters();
    setupScrollAnimations();
    setupHeroEffect();
    setupCardParallax();
});

// Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Fenêtre redimensionnée');
    }, 250);
});
 è   