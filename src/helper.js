class Helper {
    static buttonMaker = (callBack, value, parent) => {
        let button = document.createElement("input");
        button.type = "submit";
        button.addEventListener("click", callBack);
        button.value = value;
        parent.appendChild(button);
    }

    static textInputMaker = (text, id, parent) => {
        let name = document.createElement("input");
        parent.append(name);
        name.type = "text";
        name.id = id;
        name.placeholder = text;
    }

    static appendBr = (parent) => parent.appendChild(document.createElement("br"))

    static addClick = (parent, callBack) => parent.addEventListener("click", callBack)

    static master = () => document.querySelector("#master-card-list")
}
