class Project {
    constructor(project){
        this.id = project.id;
        this.description = project.attributes.description;
        this.name = project.attributes.name;
        this.tasks = project.attributes.tasks.map(task => new Task(task));
    }

    render(){
        const projectCardList = document.querySelector("#master-card-list");
        const projectCard = document.createElement("div");
        projectCardList.appendChild(projectCard);
        projectCard.id = this.id;
        projectCard.className = "project-card";
        const name = document.createElement("h2");
        projectCard.appendChild(name);
        name.innerText = `${this.name}`;
        const description = document.createElement("h3");
        projectCard.appendChild(description);
        description.innerText = `${this.description}`;
    }
}
