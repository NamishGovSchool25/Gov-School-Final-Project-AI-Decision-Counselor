// Enhanced JavaScript for AI Decision Helper

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize Firebase authentication
    initializeAuth();
    
    // Handle form submission with loading state
    const decisionForm = document.getElementById('decisionForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (decisionForm && analyzeBtn) {
        decisionForm.addEventListener('submit', function(e) {
            // Show loading state
            const btnText = analyzeBtn.querySelector('.btn-text');
            const btnLoading = analyzeBtn.querySelector('.btn-loading');
            
            if (btnText && btnLoading) {
                btnText.classList.add('d-none');
                btnLoading.classList.remove('d-none');
                analyzeBtn.disabled = true;
            }
            
            // Add loading class for additional styling
            analyzeBtn.classList.add('btn-loading');
        });
    }
    
    // Format AI analysis content for better readability
    const analysisContent = document.getElementById('analysisContent');
    if (analysisContent) {
        formatAnalysisContent(analysisContent);
    }
    
    // Auto-resize textarea
    const textarea = document.getElementById('decision');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Character counter for textarea
    if (textarea) {
        addCharacterCounter(textarea);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});

function formatAnalysisContent(container) {
    let content = container.innerHTML;
    
    // Remove asterisks from formatting
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Format section headers with icons and better styling
    content = content.replace(/^[\*]*\s*(Pros:|PROS:)\s*[\*]*/gmi, '<div class="analysis-section pros-section mt-4 mb-3"><h4 class="text-success mb-3"><i class="fas fa-thumbs-up me-2"></i>Pros</h4>');
    content = content.replace(/^[\*]*\s*(Cons:|CONS:)\s*[\*]*/gmi, '</div><div class="analysis-section cons-section mt-4 mb-3"><h4 class="text-warning mb-3"><i class="fas fa-thumbs-down me-2"></i>Cons</h4>');
    content = content.replace(/^[\*]*\s*(Other Considerations:|OTHER CONSIDERATIONS:)\s*[\*]*/gmi, '</div><div class="analysis-section considerations-section mt-4 mb-3"><h4 class="text-info mb-3"><i class="fas fa-lightbulb me-2"></i>Other Considerations</h4>');
    content = content.replace(/^[\*]*\s*(To help you decide, ask yourself:|TO HELP YOU DECIDE, ASK YOURSELF:)\s*[\*]*/gmi, '</div><div class="analysis-section question-section mt-4 mb-3"><h4 class="text-primary mb-3"><i class="fas fa-question-circle me-2"></i>Reflective Question</h4>');
    
    // Format lists with icons
    content = content.replace(/^[\s]*-\s*(.+)$/gmi, '<div class="d-flex align-items-start mb-3"><div class="me-3 mt-1"><i class="fas fa-check-circle text-success" style="font-size: 0.9rem;"></i></div><div class="flex-grow-1">$1</div></div>');
    
    // Format paragraphs with better spacing
    content = content.replace(/\n\n+/g, '</p><p class="mb-3">');
    
    // Add opening paragraph tag and close any remaining sections
    if (!content.startsWith('<div class="analysis-section')) {
        content = '<p class="mb-4 lead">' + content;
    }
    
    // Close any remaining open sections
    content += '</div>';
    
    // Clean up empty paragraphs and fix nested tags
    content = content.replace(/<p[^>]*>\s*<\/p>/g, '');
    content = content.replace(/<p[^>]*>\s*<div/g, '<div');
    content = content.replace(/<\/div>\s*<\/p>/g, '</div>');
    content = content.replace(/<p[^>]*>\s*<h4/g, '<h4');
    content = content.replace(/<\/h4>\s*<\/p>/g, '</h4>');
    
    container.innerHTML = content;
}

function addCharacterCounter(textarea) {
    const counter = document.createElement('div');
    counter.className = 'form-text text-end mt-2';
    counter.id = 'charCounter';
    textarea.parentNode.appendChild(counter);
    
    function updateCounter() {
        const length = textarea.value.length;
        const minLength = 10;
        const color = length >= minLength ? 'text-success' : 'text-muted';
        counter.className = `form-text text-end mt-2 ${color}`;
        counter.innerHTML = `<i class="fas fa-keyboard me-1"></i>${length} characters ${length >= minLength ? '✓' : `(${minLength - length} more needed)`}`;
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter(); // Initial call
}

// Error handling for failed requests
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Show user-friendly error message
    const alertContainer = document.querySelector('.container');
    if (alertContainer) {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger alert-dismissible fade show';
        errorAlert.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            Something went wrong. Please refresh the page and try again.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        alertContainer.insertBefore(errorAlert, alertContainer.firstChild);
    }
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    document.getElementById('themeToggle').addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Firebase Authentication Management
function initializeAuth() {
    if (window.firebase && window.firebase.auth) {
        console.log('Firebase auth initialized');
        
        // Listen for authentication state changes
        window.firebase.onAuthStateChanged(window.firebase.auth, (user) => {
            if (user) {
                console.log('Auth state changed: User logged in -', user.email);
                console.log('User UID:', user.uid);
            } else {
                console.log('Auth state changed: User logged out');
            }
            updateAuthUI(user);
        });

        // Handle login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Login button clicked');
                
                if (!window.firebase || !window.firebase.auth || !window.firebase.provider) {
                    console.error('Firebase not properly initialized');
                    alert('Authentication system not ready. Please refresh the page and try again.');
                    return;
                }
                
                // Try popup first, fall back to redirect
                window.firebase.signInWithPopup(window.firebase.auth, window.firebase.provider)
                    .then((result) => {
                        console.log('Sign-in successful:', result.user);
                    })
                    .catch((error) => {
                        console.error('Sign-in error:', error);
                        
                        if (error.code === 'auth/popup-blocked') {
                            console.log('Popup blocked, trying redirect');
                            window.firebase.signInWithRedirect(window.firebase.auth, window.firebase.provider);
                        } else if (error.code === 'auth/configuration-not-found') {
                            alert('Authentication is not properly configured. Please ensure:\n\n1. Firebase Authentication is enabled in the Firebase console\n2. Google sign-in provider is enabled\n3. This domain is added to authorized domains\n\nContact support if this continues.');
                        } else {
                            alert('Sign-in failed: ' + error.message);
                        }
                    });
            });
        } else {
            console.error('Login button not found');
        }

        // Handle logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.firebase.signOut(window.firebase.auth).then(() => {
                    window.location.href = '/';
                });
            });
        }
    }
}

function updateAuthUI(user) {
    const loginNav = document.getElementById('loginNav');
    const userNav = document.getElementById('userNav');
    const dashboardNav = document.getElementById('dashboardNav');
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');

    if (user) {
        // User is signed in
        loginNav.style.display = 'none';
        userNav.style.display = 'block';
        dashboardNav.style.display = 'block';
        
        if (userName) userName.textContent = user.displayName || user.email;
        if (userPhoto) userPhoto.src = user.photoURL || '/static/default-avatar.svg';
        
        // Show success message
        console.log('User authenticated successfully:', user.email);
    } else {
        // User is signed out
        loginNav.style.display = 'block';
        userNav.style.display = 'none';
        dashboardNav.style.display = 'none';
    }
}

// Enhanced form submission with user data saving
function saveDecisionToFirebase(decision, analysis) {
    if (window.firebase && window.firebase.auth && window.firebase.auth.currentUser) {
        const user = window.firebase.auth.currentUser;
        const usersRef = window.firebase.collection(window.firebase.db, 'Users');
        
        // Create a new document with decision data
        window.firebase.addDoc(usersRef, {
            userId: user.uid,
            userEmail: user.email,
            Decision: decision,
            Login: user.email,
            analysis: analysis,
            timestamp: window.firebase.serverTimestamp()
        }).then(() => {
            console.log('Decision saved to Firebase Users collection');
        }).catch((error) => {
            console.error('Error saving decision:', error);
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('decisionForm');
        if (form) {
            form.submit();
        }
    }
    
    // Escape to clear textarea
    if (e.key === 'Escape') {
        const textarea = document.getElementById('decision');
        if (textarea && document.activeElement === textarea) {
            if (confirm('Clear your input?')) {
                textarea.value = '';
                textarea.focus();
            }
        }
    }
});
