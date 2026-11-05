fetch('projects.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load projects.html');
        }
        return response.text();
    })
    .then(data => {

        const projectGrid = document.getElementById('project-grid');
        const searchInput = document.getElementById('input-box');
        const noResults = document.getElementById('no-results');

        // Load all project cards
        projectGrid.innerHTML = data;

        // Get all project cards
        const projects = projectGrid.querySelectorAll('.project-card');

        // Search automatically as user types
        searchInput.addEventListener('input', function () {

            const searchValue = searchInput.value
                .toLowerCase()
                .trim();

            let visibleProjects = 0;

            projects.forEach(function (project) {

                const projectName = project.querySelector('h3')
                    .innerText.toLowerCase();

                const projectKeywords = (
                    project.dataset.search || ''
                ).toLowerCase();

                const projectTags = project.querySelector('.project-tags')
                    ?.innerText.toLowerCase() || '';

                const searchableText =
                    projectName + ' ' +
                    projectKeywords + ' ' +
                    projectTags;

                if (searchableText.includes(searchValue)) {

                    project.classList.remove('hidden');
                    visibleProjects++;

                } else {

                    project.classList.add('hidden');

                }

            });

            // Show or hide the no-results message
            noResults.style.display =
                visibleProjects === 0 ? 'block' : 'none';

        });

    })
    .catch(error => console.error('Error loading projects:', error));