document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme
    initTheme();
    
    // Make windows draggable
    makeWindowsDraggable();
    
    // Initialize clock
    updateClock();
    setInterval(updateClock, 60000);
    
    // Add event listeners to dock items
    initDock();
    
    // Window controls
    initWindowControls();
    
    // Initialize toolbar buttons
    initToolbarButtons();
    
    // Enhance welcome message
    enhanceWelcomeMessage();
});

// Theme initialization and toggle
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        themeSwitch.checked = true;
    }
    
    // Handle theme toggle
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Make windows draggable
function makeWindowsDraggable() {
    const windows = document.querySelectorAll('.macos-window');
    if (!windows.length) return;
    
    windows.forEach(window => {
        const header = window.querySelector('.window-header');
        if (!header) return;
        
        let isDragging = false;
        let offsetX, offsetY;
        
        // Set initial z-index for proper stacking
        window.style.zIndex = '1';
        
        const startDrag = (e) => {
            // Only allow left mouse button or touch
            if (e.type === 'mousedown' && e.button !== 0) return;
            
            isDragging = true;
            
            // Bring window to front
            windows.forEach(w => {
                w.style.zIndex = '1';
                w.classList.remove('focused');
            });
            window.style.zIndex = '10';
            window.classList.add('focused');
            
            // Calculate offset
            const rect = window.getBoundingClientRect();
            offsetX = (e.clientX || e.touches[0].clientX) - rect.left;
            offsetY = (e.clientY || e.touches[0].clientY) - rect.top;
            
            // Add active class for visual feedback
            window.classList.add('dragging');
            
            // Prevent text selection while dragging
            e.preventDefault();
        };
        
        const doDrag = (e) => {
            if (!isDragging) return;
            
            // Get current mouse/touch position
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            
            // Calculate new position
            const x = clientX - offsetX;
            const y = clientY - offsetY;
            
            // Apply the transform
            window.style.transform = `translate(${x}px, ${y}px)`;
            
            e.preventDefault();
        };
        
        const stopDrag = () => {
            if (isDragging) {
                isDragging = false;
                window.classList.remove('dragging');
            }
        };
        
        // Mouse events
        header.addEventListener('mousedown', startDrag);
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('mouseleave', stopDrag);
        window.addEventListener('mousemove', doDrag);
        
        // Touch events for mobile
        header.addEventListener('touchstart', startDrag);
        window.addEventListener('touchend', stopDrag);
        window.addEventListener('touchcancel', stopDrag);
        window.addEventListener('touchmove', doDrag);
    });
    
    // Handle window focus
    windows.forEach(window => {
        window.addEventListener('mousedown', () => {
            // Bring clicked window to front
            windows.forEach(w => {
                w.style.zIndex = '1';
                w.classList.remove('focused');
            });
            window.style.zIndex = '10';
            window.classList.add('focused');
        });
    });
}

// Update clock in the menu bar
function updateClock() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert to 12-hour format
    
    timeElement.textContent = hours12 + ":" + minutes.toString().padStart(2, '0') + " " + ampm;
}

// Initialize dock functionality
function initDock() {
    const dockItems = document.querySelectorAll('.dock-item');
    if (!dockItems.length) return;
    
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            const windowId = item.getAttribute('data-window');
            
            // Special handling for settings
            if (item.id === 'settings-dock-item') {
                // Toggle theme
                const themeSwitch = document.getElementById('theme-switch');
                if (themeSwitch) {
                    themeSwitch.checked = !themeSwitch.checked;
                    // Trigger the change event
                    themeSwitch.dispatchEvent(new Event('change'));
                }
                return;
            }
            
            if (!windowId) return;
            
            const targetWindow = document.getElementById(windowId);
            if (!targetWindow) return;
            
            // Close all other windows
            document.querySelectorAll('.macos-window').forEach(w => {
                if (w !== targetWindow) {
                    minimizeWindow(w);
                }
            });
            
            // Show window and make fullscreen
            openWindowFullscreen(targetWindow);
        });
    });
}

function openWindowFullscreen(window) {
    // Reset any previous transformations
    window.style.transform = 'scale(1)';
    window.style.display = 'flex';
    window.style.opacity = '1';
    
    // Bring window to front
    document.querySelectorAll('.macos-window').forEach(w => {
        w.style.zIndex = '1';
        w.classList.remove('focused');
        w.dataset.fullscreen = 'false';
    });
    
    window.style.zIndex = '10';
    window.classList.add('focused');
    
    // Make window fullscreen
    window.style.position = 'absolute';
    window.style.top = '40px';
    window.style.left = '20px';
    window.style.width = 'calc(100% - 40px)';
    window.style.height = 'calc(100% - 100px)';
    window.dataset.fullscreen = 'true';
    
    // Add fullscreen button if it doesn't exist
    if (!window.querySelector('.fullscreen-exit-btn')) {
        const exitButton = document.createElement('button');
        exitButton.className = 'fullscreen-exit-btn';
        exitButton.innerHTML = '<i class="fas fa-compress-alt"></i>';
        exitButton.setAttribute('aria-label', 'Exit fullscreen');
        exitButton.style.position = 'absolute';
        exitButton.style.top = '8px';
        exitButton.style.right = '15px';
        exitButton.style.zIndex = '1001';
        exitButton.style.background = 'transparent';
        exitButton.style.border = 'none';
        exitButton.style.color = 'inherit';
        exitButton.style.fontSize = '14px';
        exitButton.style.cursor = 'pointer';
        
        exitButton.addEventListener('click', (e) => {
            e.stopPropagation();
            restoreWindow(window);
        });
        
        window.appendChild(exitButton);
    }
}

function minimizeWindow(window) {
    window.style.transform = 'scale(0.9) translateY(20px)';
    window.style.opacity = '0';
    setTimeout(() => {
        window.style.display = 'none';
        // Remove fullscreen state
        window.style.position = '';
        window.style.top = '';
        window.style.left = '';
        window.style.width = '';
        window.style.height = '';
        window.dataset.fullscreen = 'false';
        
        // Remove fullscreen exit button if it exists
        const exitButton = window.querySelector('.fullscreen-exit-btn');
        if (exitButton) {
            window.removeChild(exitButton);
        }
    }, 300);
}

function restoreWindow(window) {
    // Restore window to original state
    window.style.position = '';
    window.style.top = '';
    window.style.left = '';
    window.style.width = '';
    window.style.height = '';
    window.style.transform = 'scale(1)';
    window.dataset.fullscreen = 'false';
    
    // Remove fullscreen exit button if it exists
    const exitButton = window.querySelector('.fullscreen-exit-btn');
    if (exitButton) {
        window.removeChild(exitButton);
    }
}

// Initialize window controls
function initWindowControls() {
    const controls = document.querySelectorAll('.window-controls .control');
    if (!controls.length) return;
    
    // Window controls (close, minimize, maximize)
    controls.forEach(control => {
        control.addEventListener('click', (e) => {
            const window = e.target.closest('.macos-window');
            e.stopPropagation();
            
            if (control.classList.contains('close')) {
                minimizeWindow(window);
            } else if (control.classList.contains('minimize')) {
                minimizeWindow(window);
            } else if (control.classList.contains('maximize')) {
                // Toggle fullscreen
                if (window.dataset.fullscreen === 'true') {
                    restoreWindow(window);
                } else {
                    openWindowFullscreen(window);
                }
            }
        });
    });
}

// Initialize toolbar buttons
function initToolbarButtons() {
    // Safari toolbar buttons
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    if (toolbarButtons.length) {
        toolbarButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent window click
                
                // Add visual feedback
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                }, 300);
                
                // Get button action from aria-label
                const action = button.getAttribute('aria-label');
                if (action) {
                    console.log(`Toolbar action: ${action}`);
                    
                    // Handle specific actions
                    if (action === 'Go back' || action === 'Go forward') {
                        // Simulate navigation effect
                        const window = button.closest('.macos-window');
                        if (window) {
                            window.classList.add('navigating');
                            setTimeout(() => {
                                window.classList.remove('navigating');
                            }, 300);
                        }
                    } else if (action === 'Reload page') {
                        // Simulate reload effect
                        const window = button.closest('.macos-window');
                        if (window) {
                            const content = window.querySelector('.window-content');
                            if (content) {
                                content.style.opacity = '0.5';
                                setTimeout(() => {
                                    content.style.opacity = '1';
                                }, 300);
                            }
                        }
                    }
                }
            });
        });
    }
    
    // Finder view options
    const viewOptions = document.querySelectorAll('.view-options .toolbar-btn');
    if (viewOptions.length) {
        viewOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent window click
                
                // Remove active class from all options
                viewOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Handle view change
                const action = option.getAttribute('aria-label');
                const finderContent = document.querySelector('.finder-content');
                
                if (finderContent && action) {
                    if (action === 'Grid view') {
                        finderContent.classList.remove('list-view');
                        finderContent.classList.add('grid-view');
                    } else if (action === 'List view') {
                        finderContent.classList.remove('grid-view');
                        finderContent.classList.add('list-view');
                    }
                }
            });
        });
    }
}

// Enhanced welcome message
function enhanceWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    const spaceJourney = document.getElementById('space-journey-container');
    
    if (welcomeMessage && spaceJourney) {
        // Make welcome message more comprehensive
        welcomeMessage.innerHTML = `
            <h1>Welcome to Aaron's Portfolio</h1>
            <h2>Software Developer & Creative Problem Solver</h2>
            <p class="welcome-description">Explore my projects, skills, and experience in a MacOS-inspired interface</p>
            <button id="explore-btn" class="explore-btn">Start Exploring</button>
        `;
        
        // Add animation classes
        welcomeMessage.classList.add('animated-welcome');
        
        // Add event listener to explore button
        const exploreBtn = document.getElementById('explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                // Hide welcome message and space journey with animation
                welcomeMessage.classList.add('fade-out');
                spaceJourney.classList.add('fade-out');
                
                // After animation, hide completely
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    spaceJourney.style.display = 'none';
                    
                    // Show first window (about)
                    const aboutWindow = document.getElementById('about-window');
                    if (aboutWindow) {
                        openWindowFullscreen(aboutWindow);
                    }
                }, 1000);
            });
        }
    }
    
    // Setup exit fullscreen button
    const exitFullscreenBtn = document.getElementById('exit-fullscreen');
    if (exitFullscreenBtn) {
        exitFullscreenBtn.addEventListener('click', () => {
            welcomeMessage.style.display = 'none';
            spaceJourney.style.display = 'none';
            exitFullscreenBtn.style.display = 'none';
        });
    }
}
