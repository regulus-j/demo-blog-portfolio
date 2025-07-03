// Fix for Portfolio button navigation
document.addEventListener('DOMContentLoaded', function() {
    var portfolioBtn = document.getElementById('portfolio-link');
    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', function(e) {
            // Allow default navigation to portfolio.html
            window.location.href = 'portfolio.html';
        });
    }
});
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll reveal animation to various elements
    const animatedElements = document.querySelectorAll('.tour-day, .photo-item, .blog-conclusion, .blog-sidebar > div');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
        // Initially hide elements that will be animated
        element.classList.add('animate-on-scroll');
    });
    
    // Staggered animation for photo gallery items
    const galleries = document.querySelectorAll('.photo-gallery');
    galleries.forEach(gallery => {
        const photos = gallery.querySelectorAll('.photo-item');
        photos.forEach((photo, index) => {
            photo.style.animationDelay = `${0.15 * index}s`;
        });
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
        if (heroSection) {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });
    
    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('.tour-day, .blog-conclusion');
    const navItems = document.querySelectorAll('.blog-nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') && item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link, .table-of-contents a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
});
