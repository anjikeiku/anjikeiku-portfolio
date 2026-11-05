fetch('projects.html')
    .then(response => response.text())
    .then(data => {

        const projectGrid = document.getElementById('project-grid');
        projectGrid.innerHTML = data;

        const searchInput = document.getElementById('input-box');
        const projects = projectGrid.querySelectorAll('.project-card');
        const noResults = document.getElementById('no-results');

        searchInput.addEventListener('input', function () {

            const searchValue = searchInput.value.toLowerCase().trim();

            let visibleProjects = 0;

            projects.forEach(function (project) {

                const projectName = project.innerText.toLowerCase();
                const projectKeywords = project.dataset.search.toLowerCase();

                const searchableText = projectName + " " + projectKeywords;

                if (searchableText.includes(searchValue)) {
                    project.classList.remove('hidden');
                    visibleProjects++;
                } else {
                    project.classList.add('hidden');
                }

            });

            noResults.style.display =
                visibleProjects === 0 ? 'block' : 'none';

        });

    })
    .catch(error => console.error('Error loading projects:', error));