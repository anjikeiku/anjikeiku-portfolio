document.addEventListener('DOMContentLoaded', function () {

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.lightbox-close');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    const caption = document.getElementById('caption');

    let currentGallery = [];
    let slideIndex = 0;


    //OPEN LIGHTBOX
    document.querySelectorAll('.lightbox-trigger').forEach(function (image) {

        image.addEventListener('click', function () {

            const galleryName = image.dataset.gallery;

            if (galleryName) {

                // GET IMAGES FROM THE SAME GALLERY
                currentGallery = Array.from(
                    document.querySelectorAll(
                        `.lightbox-trigger[data-gallery="${galleryName}"]`
                    )
                );

                slideIndex = currentGallery.indexOf(image);

                // SHOW GALLERY NAVIGATION
                prevButton.style.display = 'block';
                nextButton.style.display = 'block';

            } else {
                // STANDALONE IMAGE
                currentGallery = [image];
                slideIndex = 0;

                // HIDE GALLERY NAVIGATION
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
            showSlide();
            lightbox.classList.add('active');

            document.body.style.overflow = 'hidden';
        });
    });


    //DISPLAY CURRENT IMAGE
    function showSlide() {

        const image = currentGallery[slideIndex];

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        caption.textContent = image.alt;
    }


    //NEXT IMAGE
    function nextSlide() {
        if (currentGallery.length <= 1) return;
        slideIndex++;
        if (slideIndex >= currentGallery.length) {
            slideIndex = 0;
        }
        showSlide();
    }


    //PREVIOUS IMAGE
    function prevSlide() {
        if (currentGallery.length <= 1) return;
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = currentGallery.length - 1;
        }
        showSlide();
    }

    //CLOSE LIGHTBOX
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(function () {
            lightboxImage.src = '';
            caption.textContent = '';
        }, 300);
        currentGallery = [];
        slideIndex = 0;

        document.body.style.overflow = '';
    }

    //EVENT LISTENERS
    closeButton.addEventListener('click', closeLightbox);
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    //CLICK OUTSIDE IMAGE
    lightbox.addEventListener('click', function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    //KEYBOARD NAVIGATION
    document.addEventListener('keydown', function (event) {

        if (!lightbox.classList.contains('active')) return;

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'ArrowRight') {
            nextSlide();
        }

        if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });
});