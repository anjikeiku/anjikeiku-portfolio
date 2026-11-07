// HEADER
fetch('/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load header.html');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Load header scroll functionality AFTER header is inserted
        const script = document.createElement("script");
        script.src = "/js/header-scroll.js";
        document.body.appendChild(script);
    })
    .catch(error => console.error('Header error:', error));


// FOOTER
fetch('/footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load footer.html');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('footer').innerHTML = data;

        // Initialize back to top
        if (typeof initBackToTop === 'function') {
            initBackToTop();
        }
    })
    .catch(error => console.error('Footer error:', error));