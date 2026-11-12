// KEYWORD ALIASES
const keywordAliases = {
    adobe: [
        'photoshop',
        'illustrator',
        'after effects',
        'premiere pro',
    ],

    blender: [
        '3d',
        '3d modeling',
        '3d rendering'
    ],

    '3d': [ 
        'blender',
        'autodesk',
        '3dsmax',
        'maya'
    ]
};

// LOAD PROJECTS
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

        // Limit displayed tags
        projects.forEach(project => {

            const tagList = project.querySelector('.project-tags');
            const tags = Array.from(tagList.querySelectorAll('li'));

            // Hide tags after third
            tags.slice(3).forEach(tag => {
                tag.style.display = 'none';
            });

            // Add indicator if more than 3 tags
            if (tags.length > 3) {

                const moreTags = document.createElement('li');

                const hiddenCount = tags.length - 3;

                moreTags.textContent = `+${hiddenCount} more`;

                moreTags.classList.add('more-tags');

                tagList.appendChild(moreTags);

            }

        });

        // Search automatically as user types
        searchInput.addEventListener('input', function () {

            const searchValue = searchInput.value
                .toLowerCase()
                .trim();

            let visibleProjects = 0;

            projects.forEach(function (project) {

                // Get project name
                const projectName = project.querySelector('h3')
                    .innerText.toLowerCase();

                // Get all project tags
                const projectTags = Array.from(
                    project.querySelectorAll('.project-tags li')
                ).map(tag => tag.innerText.toLowerCase());

                // Get matching keyword aliases
                const aliases = Object.entries(keywordAliases)
                .filter(([category, keywords]) =>
                    projectTags.some(tag => keywords.includes(tag))
                )
                .flatMap(([category, keywords]) => {

                    const matchingTags = projectTags.filter(tag =>
                        keywords.includes(tag)
                    );

                    return [
                        category,
                        ...matchingTags
                    ];

                });

                // Combine searchable information
                const searchableText = [
                    projectName,
                    ...projectTags,
                    ...aliases
                ].join(' ');

                // Check if search matches
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