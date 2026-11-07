// DETECT WEBSITE ROOT
const SITE_BASE = location.hostname === '127.0.0.1' ||
                  location.hostname === 'localhost'
    ? ''
    : '/anjikeiku-portfolio';


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

        // Load header scroll functionality AFTER header is inserted
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

        // Initialize back to top
        if (typeof initBackToTop === 'function') {
            initBackToTop();
        }
    })
    .catch(error => console.error('Footer error:', error));
