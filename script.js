
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Theme switcher demo with vivid colors
        let currentTheme = 0;
        function changeTheme() {
            const themes = [
                {
                    name: 'Blue',
                    accent: '#60a5fa',
                    secondary: '#3b82f6'
                },
                {
                    name: 'Purple',
                    accent: '#a78bfa',
                    secondary: '#8b5cf6'
                },
                {
                    name: 'Emerald',
                    accent: '#6ee7b7',
                    secondary: '#10b981'
                },
                {
                    name: 'Amber',
                    accent: '#fbbf24',
                    secondary: '#f59e0b'
                },
                {
                    name: 'Rose',
                    accent: '#fb7185',
                    secondary: '#f43f5e'
                },
                {
                    name: 'Cyan',
                    accent: '#67e8f9',
                    secondary: '#06b6d4'
                },
                {
                    name: 'Indigo',
                    accent: '#a5b4fc',
                    secondary: '#6366f1'
                }
            ];
            
            currentTheme = (currentTheme + 1) % themes.length;
            const theme = themes[currentTheme];
            
            // Update CSS custom properties
            const root = document.documentElement;
            root.style.setProperty('--accent-color', theme.accent);
            root.style.setProperty('--accent-secondary', theme.secondary);
            root.style.setProperty('--accent-rgb', hexToRgb(theme.secondary));
            
            // Show theme name briefly
            showThemeNotification(theme.name);
        }
        
        // Helper function to convert hex to rgb
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? 
                `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
                '59, 130, 246';
        }
        
        // Show theme notification
        function showThemeNotification(themeName) {
            // Remove existing notification
            const existing = document.querySelector('.theme-notification');
            if (existing) existing.remove();
            
            const notification = document.createElement('div');
            notification.className = 'theme-notification';
            notification.textContent = `${themeName} Theme`;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 600;
                z-index: 1001;
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Animate out and remove
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100px)';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards including education
        document.querySelectorAll('.skill-card, .project-card, .education-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        console.log('🚀 Portfolio loaded successfully!');
    