class User{
    constructor(user){
        this.id = user.id;
        this.name = user.attributes.name;
    }

    render(){
        const userCardList = document.querySelector("#master-card-list");
        const userCard = document.createElement("div");
        userCardList.appendChild(userCard);
        userCard.id = this.id;
        userCard.className = "user-card";
        const name = document.createElement("h2");
        userCard.appendChild(name);
        name.innerText = `${this.name}`;
    }
}
