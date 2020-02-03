var foodList = {};
var confirmDeleteBtn = document.querySelector("button.button");
getList();


async function getList() {
    var response = await fetch("https://first-time-ajax-rm.firebaseio.com/.json");
    window.foodList = await response.json();
    setItemTitle();
}

confirmDeleteBtn.addEventListener("click", function () {
    deleteItem();
});

async function deleteItem() {
    console.log('delete');
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    console.log(id)

    var response = await fetch(`https://first-time-ajax-rm.firebaseio.com/menu/${id}.json`, {
        method: "DELETE"
    });

    window.location.replace("admin.html");
}

function setItemTitle() {
    var title =  document.querySelector(".delete__title");
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");

    for ( var i in foodList.menu ) {
        var item = foodList.menu[i];
        if ( i === id ) {
            title.textContent = `Delete - ${item.nume}`;
        }
    }
}
