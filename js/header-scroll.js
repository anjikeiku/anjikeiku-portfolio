const header = document.querySelector('header');

// Detect which video container exists on the current page
const videoSection = document.querySelector(
    '.home-video-container, .video-container'
);

if (header && videoSection) {

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                header.classList.remove('scrolled');
            } else {
                header.classList.add('scrolled');
            }
        },
        {
            threshold: 0
        }
    );

    observer.observe(videoSection);
}