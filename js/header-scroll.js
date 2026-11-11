
const header = document.querySelector('header');
const divHeader = document.querySelector('.div-header');

const videoSection = document.querySelector(
    '.home-video-container, .video-container'
);

if (header && videoSection && divHeader) {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                header.classList.remove('scrolled');
                divHeader.classList.remove('scrolled');
            } else {
                header.classList.add('scrolled');
                divHeader.classList.add('scrolled');
            }
        },
        {
            threshold: 0
        }
    );

    observer.observe(videoSection);
}