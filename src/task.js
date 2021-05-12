class Task {
    constructor(task){
        this.id = task.id;
        this.name = task.attributes.name;
        this.description = task.attributes.description;
        this.users = task.attributes.users.map(user => new User(user));
    }
    renderTask(){
        const taskCard = document.createElement("div");
        taskCard.id = this.id;
        const name = document.createElement("h3");
        taskCard.appendChild(name);
        name.innerText = this.name;
        const description = document.createElement("p");
        taskCard.appendChild(description);
        description.innerText = this.description;
        return taskCard;
    }
}
