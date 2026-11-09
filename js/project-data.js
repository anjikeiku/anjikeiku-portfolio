// PROJECT TAGS
const tagCategories = {
    creative: [
        'creative direction',
        'brand identity',
        'illustration'
    ],

    production: [
        'print',
        'event coordination',
        'social media',
        'packaging'
    ],

    software: [
        'illustrator',
        'photoshop',
        'blender',
        'autodesk',
        '3dsmax',
        'maya'
    ]
};

//GROUP PROJECT TAGS
function groupProjectTags(tags) {

    const grouped = {};

    Object.entries(tagCategories).forEach(([category, categoryTags]) => {

        const matchingTags = tags.filter(tag =>
            categoryTags.includes(tag.toLowerCase())
        );

        if (matchingTags.length > 0) {
            grouped[category] = matchingTags;
        }

    });

    return grouped;
}

//GET PROJECT DATA
async function getProjectData(projectId) {

    try {

        // Fetch the central project data
        const response = await fetch(sitePath('projects.html'));

        if (!response.ok) {
            throw new Error('Could not load projects.html');
        }

        const html = await response.text();

        // Convert fetched HTML into a document
        const parser = new DOMParser();

        const documentData = parser.parseFromString(
            html,
            'text/html'
        );

        // Find the requested project
        const project = documentData.querySelector(
            `[data-project="${projectId}"]`
        );

        if (!project) {
            throw new Error(`Project "${projectId}" not found`);
        }

        // Extract project information
        const tags = Array.from(
            project.querySelectorAll('.project-tags li')
        ).map(tag => tag.innerText.trim());

        return {
            name: project.querySelector('h3')?.innerText || '',

            image: project.querySelector('img')?.getAttribute('src') || '',

            tags: tags,

            groupedTags: groupProjectTags(tags)
        };

    } catch (error) {

        console.error('Project data error:', error);
        return null;

    }
}