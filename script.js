document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER ON SCROLL
       ========================================================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       ACTIVE LINK ON SCROLL & OBSERVER FOR SECTIONS
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    /* ==========================================================================
       REVEAL ON SCROLL ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => revealObserver.observe(element));

    /* ==========================================================================
       CONTACT FORM SUBMISSION HANDLER
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission API call
            setTimeout(() => {
                // Mock success
                formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully. Nadir will get back to you shortly.`;
                formMessage.className = 'form-feedback success';
                
                // Clear form fields
                contactForm.reset();

                // Restore button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-feedback';
                }, 5000);
            }, 1200);
        });
    }
});
