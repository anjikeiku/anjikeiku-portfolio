
// Initialize back-to-top button
function initBackToTop() {

    const mybutton = document.getElementById("myBtn");

    // Stop if button doesn't exist
    if (!mybutton) return;

    // Show or hide button when scrolling
    window.addEventListener("scroll", function() {

        if (window.scrollY > 20) {
            mybutton.style.display = "flex";
        } else {
            mybutton.style.display = "none";
        }

    });

    // Scroll to top when clicked
    mybutton.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}