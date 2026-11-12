const profileImage = document.querySelector('.about-profile img');

if (profileImage) {

    profileImage.addEventListener('click', function() {

        // Restart animation
        profileImage.classList.remove('wiggle');

        //in case none image
        void profileImage.offsetWidth;

        profileImage.classList.add('wiggle');

    });

}