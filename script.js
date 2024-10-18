// App data with categorization
const apps = [
    { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github', category: 'dev' },
    { name: 'VS Code', url: 'https://vscode.dev', icon: 'fas fa-code', category: 'dev' },
    { name: 'CodePen', url: 'https://codepen.io', icon: 'fab fa-codepen', category: 'dev' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'fab fa-stack-overflow', category: 'dev' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'fas fa-robot', category: 'ai' },
    { name: 'Claude AI', url: 'https://www.anthropic.com', icon: 'fas fa-brain', category: 'ai' },
    { name: 'Blackbox AI', url: 'https://www.useblackbox.io', icon: 'fas fa-box', category: 'ai' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'fab fa-linkedin', category: 'social' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: 'fab fa-youtube', category: 'social' },
    { name: 'Arduino Cloud', url: 'https://cloud.arduino.cc', icon: 'fab fa-arduino', category: 'dev' },
    { name: 'Replit', url: 'https://replit.com', icon: 'fas fa-terminal', category: 'dev' },
    { name: 'LeetCode', url: 'https://leetcode.com', icon: 'fas fa-code-branch', category: 'dev' },
    { name: 'Dev.to', url: 'https://dev.to', icon: 'fab fa-dev', category: 'social' },
    { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', icon: 'fab fa-free-code-camp', category: 'dev' }
];

// Quick links data
const links = [
    { name: 'GitHub Profile', url: 'https://github.com/yourusername' },
    { name: 'Portfolio', url: 'https://yourportfolio.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { name: 'Blog', url: 'https://yourblog.com' },
    { name: 'Resume', url: '/resume.pdf' }
];

// GitHub stats data (you can replace with real API data)
const githubStats = {
    repos: 50,
    stars: 100,
    commits: 500,
    followers: 20
};

// Function to create app cards with categories
function createAppCards() {
    const appsContainer = document.getElementById('apps-container');
    const categories = ['all', 'dev', 'ai', 'social'];
    
    categories.forEach(category => {
        const tabPane = document.createElement('div');
        tabPane.className = `tab-pane fade ${category === 'all' ? 'show active' : ''}`;
        tabPane.id = category;
        
        const row = document.createElement('div');
        row.className = 'row g-4';
        
        const filteredApps = category === 'all' 
            ? apps 
            : apps.filter(app => app.category === category);
        
        filteredApps.forEach(app => {
            const col = document.createElement('div');
            col.className = 'col-md-3 col-sm-6';
            col.innerHTML = `
                <div class="app-card text-center">
                    <div class="app-icon">
                        <i class="${app.icon}"></i>
                    </div>
                    <h5>${app.name}</h5>
                    <a href="${app.url}" class="btn btn-outline-light btn-sm mt-2">
                        Open <i class="fas fa-external-link-alt ms-1"></i>
                    </a>
                </div>
            `;
            row.appendChild(col);
        });
        
        tabPane.appendChild(row);
        appsContainer.appendChild(tabPane);
    });
}

// Function to create quick links
function createQuickLinks() {
    const linksContainer = document.getElementById('links-container');
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'btn btn-outline-light btn-sm';
        linkElement.innerHTML = `${link.name} <i class="fas fa-external-link-alt ms-1"></i>`;
        linksContainer.appendChild(linkElement);
    });
}

// Function to update time and date
function updateTimeDate() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    timeElement.textContent = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
    
    dateElement.textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const aiModel = document.getElementById('ai-model');
    
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        const selectedModel = aiModel.value;
        if (query) {
            let searchUrl;
            switch (selectedModel) {
                case 'claude':
                    searchUrl = `https://www.anthropic.com/claude?query=${encodeURIComponent(query)}`;
                    break;
                case 'chatgpt':
                    searchUrl = `https://chat.openai.com/?q=${encodeURIComponent(query)}`;
                    break;
                case 'blackbox':
                    searchUrl = `https://www.useblackbox.io/search?q=${encodeURIComponent(query)}`;
                    break;
                default:
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            }
            window.location.href = searchUrl;
        }
    });
}

// Function to handle voice search
function handleVoiceSearch() {
    const micButton = document.getElementById('mic-button');
    const searchInput = document.getElementById('search-input');
    
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = function(event) {
            const result = event.results[0][0].transcript;
            searchInput.value = result;
            setTimeout(() => document.getElementById('search-button').click(), 500);
        };
        
        micButton.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        micButton.style.display = 'none';
    }
}

// Function to handle navbar transparency
function handleNavbarTransparency() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Function to handle theme toggle
function handleThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    let isDark = true;
    
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        document.body.classList.toggle('light-theme');
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createAppCards();
    createQuickLinks();
    handleSearch();
    handleVoiceSearch();
    handleNavbarTransparency();
    handleThemeToggle();
    
    // Update time and date immediately and then every second
    updateTimeDate();
    setInterval(updateTimeDate, 1000);
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
