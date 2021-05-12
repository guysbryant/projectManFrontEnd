const baseUrl = "http://localhost:3000/api/v1";
const projectsUrl = baseUrl + "/projects";
const usersUrl = baseUrl + "/users";
document.addEventListener("DOMContentLoaded",() => {
    master = document.querySelector("#master-card-list");
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
    document.querySelector("#projects-link").addEventListener("click", () =>{
        master.innerHTML = "<h1>Projects</h1>";
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
    document.querySelector("#users-link").addEventListener("click", () =>{
        master.innerHTML = "<h1>Users</h1>";
        getUsersIndex(usersUrl);
    });
};

const addCreateProjectButton = () => {
    buttonMaker(() => createProject(), "Create A New Project", master);
};

const buttonMaker = (callBack, value, parent) => {
    let button = document.createElement("input");
    button.type = "submit";
    button.addEventListener("click", callBack);
    button.value = value;
    parent.appendChild(button);
};

const createProject = () => {
    const formDiv = loadForm();
    buttonMaker(() => postProjectsCreate(getFormData(formDiv)), "Create Project", formDiv);
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
    master.innerHTML = "<h1>Create A New Project</h1>";
    master.appendChild(formDiv);

    textInputMaker("Project Name", "name", formDiv);
    appendBr(formDiv);appendBr(formDiv);

    textInputMaker("Project Description", "description", formDiv);
    appendBr(formDiv);appendBr(formDiv);
    return formDiv;
};

const appendBr = (parent) => parent.appendChild(document.createElement("br"));

const getFormData = (form) => {
    return {
        name: form.querySelector("#name").value,
        description: form.querySelector("#description").value
    };
};

const textInputMaker = (text, id, parent) => {
    let name = document.createElement("input");
    parent.append(name);
    name.type = "text";
    name.id = id;
    name.placeholder = text;
}
