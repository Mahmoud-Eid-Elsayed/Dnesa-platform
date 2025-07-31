 // Global variables
        let animationTriggered = false;

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);

            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });

            // Initialize all components
            initNavbar();
            initSmoothScrolling();
            initContactForm();
            initStatsAnimation();
            initScrollToTop();
        });

        // Navbar scroll effect
        function initNavbar() {
            const navbar = document.getElementById('navbar');

            window.addEventListener('scroll', function () {
                if (window.scrollY > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });

            // Mobile navbar collapse on link click
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse).hide();
                    }
                });
            });
        }

        // Smooth scrolling for anchor links
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Contact form handling
        function initContactForm() {
            const form = document.getElementById('contactForm');

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });

                if (isValid) {
                    // Simulate form submission
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;

                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                    submitBtn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function () {
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                    }
                });

                input.addEventListener('input', function () {
                    if (this.classList.contains('is-invalid') && this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                });
            });
        }

        // Animated counters for hero stats
        function initStatsAnimation() {
            const stats = document.querySelectorAll('.hero-stat-number');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationTriggered) {
                        animationTriggered = true;
                        animateStats();
                    }
                });
            }, { threshold: 0.5 });

            stats.forEach(stat => observer.observe(stat));
        }

        function animateStats() {
            const stats = document.querySelectorAll('.hero-stat-number');

            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }

        // Scroll to top functionality
        function initScrollToTop() {
            // Create scroll to top button
            const scrollBtn = document.createElement('button');
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.classList.add('scroll-to-top');
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                border: none;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            `;
            document.body.appendChild(scrollBtn);

            // Show/hide scroll button
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    scrollBtn.style.display = 'flex';
                } else {
                    scrollBtn.style.display = 'none';
                }
            });

            // Scroll to top on click
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Hover effects
            scrollBtn.addEventListener('mouseenter', () => {
                scrollBtn.style.transform = 'translateY(-3px)';
                scrollBtn.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
            });

            scrollBtn.addEventListener('mouseleave', () => {
                scrollBtn.style.transform = 'translateY(0)';
                scrollBtn.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
            });
        }

        // Utility functions
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Performance optimization for scroll events
        window.addEventListener('scroll', debounce(() => {
            // Any additional scroll-based functionality can be added here
        }, 10));

        // Add custom styles for form validation
        const style = document.createElement('style');
        style.textContent = `
            .form-control.is-invalid {
                border-color: var(--error-color);
                box-shadow: 0 0 0 0.25rem rgba(239, 68, 68, 0.25);
            }
            
            .scroll-to-top:hover {
                background: var(--primary-dark) !important;
            }
            
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 20px !important;
                    right: 20px !important;
                    width: 45px !important;
                    height: 45px !important;
                }
            }
        `;
        document.head.appendChild(style);