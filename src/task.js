class Task {
    constructor(task){
        this.id = task.id;
        this.name = task.name;
        this.description = task.description;
        this.users = task.users.map(user => new User(user));
    }
}
