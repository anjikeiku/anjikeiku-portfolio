 // HEADER
fetch(sitePath('header.html'))
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load header.html');
        }
        return response.text();
    })
    .then(data => {

        const headerContainer = document.getElementById('header');

        headerContainer.innerHTML = data;

        // Correct header image paths
        headerContainer.querySelectorAll('[data-site-src]')
            .forEach(element => {
                element.src = sitePath(element.dataset.siteSrc);
            });

        // Correct header navigation paths
        headerContainer.querySelectorAll('[data-site-href]')
            .forEach(element => {
                element.href = sitePath(element.dataset.siteHref);
            });

        // Load header scroll functionality
        const script = document.createElement('script');
        script.src = sitePath('js/header-scroll.js');
        document.body.appendChild(script);

    })
    .catch(error => console.error('Header error:', error));


// FOOTER
fetch(sitePath('footer.html'))
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load footer.html');
        }
        return response.text();
    })
    .then(data => {

        const footerContainer = document.getElementById('footer');

        footerContainer.innerHTML = data;

        // Correct footer image paths
        footerContainer.querySelectorAll('[data-site-src]')
            .forEach(element => {
                element.src = sitePath(element.dataset.siteSrc);
            });

        // Correct footer navigation paths
        footerContainer.querySelectorAll('[data-site-href]')
            .forEach(element => {
                element.href = sitePath(element.dataset.siteHref);
            });

        // Initialize back-to-top functionality
        if (typeof initBackToTop === 'function') {
            initBackToTop();
        }

    })
    .catch(error => console.error('Footer error:', error));
