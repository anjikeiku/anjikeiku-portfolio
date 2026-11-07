document.addEventListener('DOMContentLoaded', async function () {

    const projectId = document.body.dataset.project;

    const project = await getProjectData(projectId);

    if (!project) return;

    document.getElementById('project-name').innerText =
        project.name;

    const image = document.getElementById('project-image');

    image.src = project.image;
    image.alt = project.name;

    const tagContainer = document.getElementById('project-tags');

    project.tags.forEach(function (tag) {

        const li = document.createElement('li');

        li.innerText = tag;

        tagContainer.appendChild(li);

    });

});