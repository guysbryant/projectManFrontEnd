const baseUrl = "http://localhost:3000/api/v1";
const projectsUrl = baseUrl + "/projects";
const usersUrl = baseUrl + "/users";
document.addEventListener("DOMContentLoaded",() => {
    getProjectsIndex(projectsUrl);
    addLoadProjectsListener();
    getUsersIndex(usersUrl);
    addLoadUsersListener();
});

const getProjectsIndex = (url) =>{
    fetch(url)
        .then(response => response.json())
        .then(projects => projects.data.forEach(project => new Project(project).render()));
};

const addLoadProjectsListener = () =>{
    document.querySelector("#projects-link").addEventListener("click", () =>{
        document.querySelector("#master-card-list").innerHTML = "<h1>Projects</h1>";
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
        document.querySelector("#master-card-list").innerHTML = "<h1>Users</h1>";
        getProjectsIndex(usersUrl);
    });
};
