class Project {
    constructor(project){
        this.id = project.id;
        this.description = project.attributes.description;
        this.name = project.attributes.name;
        this.tasks = project.attributes.tasks.map(task => new Task(task));
        Project.all.push(this);
    }

    static all = [];
    static findById = (projectId) => Project.all.find(project => project.id == projectId);

    renderProject(){
        const projectCardList = document.querySelector("#master-card-list");
        const projectCard = this.makeProjectCard();
        projectCardList.appendChild(projectCard);
    }

    makeProjectCard(){
        const projectCard = document.createElement("div");
        projectCard.id = this.id;
        projectCard.className = "project-card";
        const name = document.createElement("h2");
        projectCard.appendChild(name);
        name.innerText = `${this.name}`;
        const description = document.createElement("h3");
        projectCard.appendChild(description);
        description.innerText = `${this.description}`;
        projectCard.addEventListener("click", () =>{
            let project = Project.findById(projectCard.id);
            project.renderProjectTasks();
        });
        return projectCard;
    }

    renderProjectTasks(){
        const projectCardList = document.querySelector("#master-card-list");
        projectCardList.innerHTML = "";
        this.renderProject();
        const taskCardList = document.createElement("div");
        projectCardList.appendChild(taskCardList);
        taskCardList.className = "task-card-list";
        const taskCardListTitle = document.createElement("h2");
        taskCardList.appendChild(taskCardListTitle);
        taskCardListTitle.innerText = "Project Tasks";
        this.tasks.forEach(task => {
            const taskCard = task.renderTask();
            taskCardList.appendChild(taskCard);
            taskCard.className = "task-card";
            const hr = document.createElement("hr");
            taskCard.appendChild(hr);
            const users = task.users;
            const userCards = users.map(user => user.renderUserCard());
            let usersTitle = document.createElement("h4");
            usersTitle.innerText = "Users assiigned to this task:";
            taskCard.appendChild(usersTitle);
            userCards.forEach(card => {
                taskCard.appendChild(card);
                card.className += " inline-block smaller-font";
            });
        });
    }
}
