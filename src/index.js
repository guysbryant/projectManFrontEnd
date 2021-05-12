const baseUrl = "http://localhost:3000/api/v1";
const projectsUrl = baseUrl + "/projects";
const usersUrl = baseUrl + "/users";
document.addEventListener("DOMContentLoaded",() => {
    getProjectsIndex(projectsUrl);
    addLoadProjectsListener();
    addLoadUsersListener();
    addCreateProjectButton();
});

const getProjectsIndex = (url) =>{
    fetch(url)
        .then(response => response.json())
        .then(projects => projects.data.forEach(project => new Project(project).renderProject()));
};

const addLoadProjectsListener = () =>{
    Helper.addClick(document.querySelector("#projects-link"), () => {
        Helper.master().innerHTML = "<h1>Projects</h1>";
        addCreateProjectButton();
        getProjectsIndex(projectsUrl);
    });
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
    const formDiv = loadForm();
    Helper.buttonMaker(() => postProjectsCreate(getFormData(formDiv)), "Create Project", formDiv);
};

const postProjectsCreate = (data) => {
    fetch(projectsUrl, {
              method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(project => new Project(project.data).renderProject());
};

const loadForm = () => {
    const formDiv = document.createElement("div");
    Helper.master().innerHTML = "<h1>Create A New Project</h1>";
    Helper.master().appendChild(formDiv);

    Helper.textInputMaker("Project Name", "name", formDiv);
    Helper.appendBr(formDiv);
    Helper.appendBr(formDiv);

    Helper.textInputMaker("Project Description", "description", formDiv);
    Helper.appendBr(formDiv);
    Helper.appendBr(formDiv);
    return formDiv;
};


const getFormData = (form) => {
    return {
        name: form.querySelector("#name").value,
        description: form.querySelector("#description").value
    };
};
