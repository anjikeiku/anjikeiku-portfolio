// HEADER
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Load header scroll functionality AFTER header is inserted
        const script = document.createElement("script");
        script.src = "js/header-scroll.js";
        document.body.appendChild(script);
    });

// FOOTER
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        initBackToTop();
    });