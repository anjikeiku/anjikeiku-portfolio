const SITE_BASE = '/anjikeiku-portfolio';

// HEADER
fetch(`${SITE_BASE}/header.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load header.html');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Load header scroll functionality
        const script = document.createElement("script");
        script.src = `${SITE_BASE}/js/header-scroll.js`;
        document.body.appendChild(script);
    })
    .catch(error => console.error('Header error:', error));


// FOOTER
fetch(`${SITE_BASE}/footer.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load footer.html');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('footer').innerHTML = data;

        if (typeof initBackToTop === 'function') {
            initBackToTop();
        }
    })
    .catch(error => console.error('Footer error:', error));
