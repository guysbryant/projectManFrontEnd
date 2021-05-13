const baseUrl = "http://localhost:3000/api/v1";
const projectsUrl = baseUrl + "/projects";
const usersUrl = baseUrl + "/users";
document.addEventListener("DOMContentLoaded",() => {
    getProjectsIndex(projectsUrl);
    addLoadProjectsListener();
    addLoadUsersListener();
    addCreateProjectButton();
    Helper.toggleDarkMode();
});

const getProjectsIndex = (url) =>{
    fetch(url)
        .then(response => response.json())
        .then(projects => projects.data.forEach(project => new Project(project).renderProject()));
};

const addLoadProjectsListener = () =>
      Helper.addClick(document.querySelector("#projects-link"), () => loadProjects());

const loadProjects = () => {
    Helper.master().innerHTML = "<h1>Projects</h1>";
    addCreateProjectButton();
    // getProjectsIndex(projectsUrl);
    Project.all.forEach(project => project.renderProject());
};

const getUsersIndex = (url) =>{
    fetch(url)
        .then(response => response.json())
        .then(users => users.data.forEach(user => new User(user).render()));
};

const addLoadUsersListener = () =>{
    Helper.addClick(document.querySelector("#users-link"), () => {
        Helper.master().innerHTML = "<h1>Users</h1>";
        getUsersIndex(usersUrl);
    });
};

const addCreateProjectButton = () => {
    Helper.buttonMaker(() => createProject(), "Create A New Project", Helper.master());
};

const createProject = () => {
    const formDiv = Helper.loadForm();
    Helper.buttonMaker(() => postProjectsCreate(formDiv), "Create Project", formDiv);
};

const postProjectsCreate = (form) => {
    const data = getFormData(form);
    fetch(projectsUrl, {
              method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(project => {
            new Project(project.data);
            loadProjects();
        })
        .catch(errors => console.log(errors));
};

const getFormData = (form) => {
    return {
        name: form.querySelector("#name").value,
        description: form.querySelector("#description").value
    };
};
