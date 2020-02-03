console.log('DOM fully loaded and parsed');

var foodList = {}

getList();

async function getList() {
    var response = await fetch("https://first-time-ajax-rm.firebaseio.com/.json");
    window.foodList = await response.json();

    draw();

}

function draw() {
    var htmlContainer = document.querySelector("#container--item-details");
    var id = window.location.search.substring(4);
    console.log(id.substring(4));

    var template = "";
    for (var i in foodList.menu) {
        var item = foodList.menu[i];
        if(i === id) {
            template = `
              <h1 class="item-details__title">${item.nume}</h1>
              <main class="item-details">
                <picture>
                    <img src="${item.imagine}">
                </picture>
                <ul>
                    <li>
                        <h2>Ingredients:</h2>
                        <p>${item.ingrediente}</p>
                    </li>
                    <li>
                        <h2>Name: </h2>
                         <p>${item.nume} </p>
                    </li>
                    <li>
                        <h2>Recipe: </h2>
                        <p>${item.reteta}</p>
                    </li>
                </ul>
              </main>         
            `
        }
    }
    htmlContainer.innerHTML = template;

}
