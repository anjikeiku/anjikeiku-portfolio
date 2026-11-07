
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
        return {
            name: project.querySelector('h3')?.innerText || '',

            image: project.querySelector('img')?.getAttribute('src') || '',

            tags: Array.from(
                project.querySelectorAll('.project-tags li')
            ).map(tag => tag.innerText.trim())
        };

    } catch (error) {

        console.error('Project data error:', error);
        return null;

    }
}
