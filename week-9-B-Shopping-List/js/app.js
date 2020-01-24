console.log('DOM fully loaded and parsed');

var submitButton = document.querySelector(".form .button");
var sortButtons = document.querySelector(".shopping-list__sort");

var shoppingList =  [
    { name: "Oranges", status: "unpurchased", id: 0},
    { name: "Bananas", status: "unpurchased", id: 1},
    { name: "Asparagus", status: "unpurchased", id: 3},
    { name: "Coconuts", status: "unpurchased", id: 4}
];
var idCount = 4;


draw();
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    addItem();
    draw();
});

sortButtons.addEventListener("click", function (event) {
    var sortAscendingBtn = document.querySelector("#button--ascending");
    var sortDescendingBtn = document.querySelector("#button--descending");

    if (event.target == sortAscendingBtn) {
        sort("ascending");
    } else if (event.target == sortDescendingBtn) {
        sort("descending");
    }
});

function draw() {
    var list = document.querySelector(".shopping-list__items-list");
    var template =  "";

    for( var i = 0; i < shoppingList.length; i++ ) {
        var item = shoppingList[i];
        template+= `
           <li class="shopping-list__item">
                <span class="shopping-list__item-name 
                   ${item.status === "purchased" ? "shopping-list__item-name--purchased" : ""}">
                       ${item.name}
                </span>
                <button class="button" onclick="mark(this, ${item.id})">
                   ${item.status === "purchased" ? "Mark as unpurchased" : "Mark as purchased"} 
                </button>
            </li>
        `
    }
    list.innerHTML = template;
}

function addItem() {
    var userInputValue = document.querySelector("#name-input").value;

    if (userInputValue.length > 0) {
        idCount++;
        shoppingList.push({ name: userInputValue, status: "unpurchased", id: idCount });
    }
}

function mark(clickedButton, id) {
    for (i = 0; i < shoppingList.length; i++ ) {
        var item = shoppingList[i];

        if (item.id === id) {
            if(item.status === "unpurchased") {
                item.status = "purchased";
                clickedButton.innerText = "Mark as unpurchased";
                clickedButton.previousElementSibling.classList.add("shopping-list__item-name--purchased");
            } else {
                item.status = "unpurchased";
                clickedButton.innerText = "Mark as purchased";
                clickedButton.previousElementSibling.classList.remove("shopping-list__item-name--purchased");
            }
        }
    }
}

function sort(sortType) {
    if (sortType === "ascending") {
        shoppingList.sort(function (itemA, itemB) {
            return (itemA.name > itemB.name ) ? 1 : -1;
        });
    } else {
        shoppingList.sort(function (itemA, itemB) {
            return (itemA.name > itemB.name ) ? -1 : 1;
        });
    }

    draw();
}























