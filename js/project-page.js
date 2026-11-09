document.addEventListener('DOMContentLoaded', async function () {

    const projectId = document.body.dataset.project;

    const project = await getProjectData(projectId);

    if (!project) return;

    document.getElementById('project-name').innerText =
        project.name;

    const image = document.getElementById('project-image');

    image.src = sitePath(project.image);
    image.alt = project.name;


    //DISPLAY CATEGORIZED TAGS
    const tagContainer = document.getElementById('project-tags');

    tagContainer.innerHTML = '';

    Object.entries(project.groupedTags).forEach(function ([category, tags]) {

        const group = document.createElement('div');
        group.classList.add('tag-group');

        const heading = document.createElement('h4');
        heading.innerText = category;

        const list = document.createElement('ul');

        tags.forEach(function (tag) {

            const li = document.createElement('li');

            li.innerText = tag;

            list.appendChild(li);

        });

        group.appendChild(heading);
        group.appendChild(list);

        tagContainer.appendChild(group);

    });

});