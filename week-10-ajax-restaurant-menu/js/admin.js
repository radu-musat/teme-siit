var foodList = {};
getList();

async function getList() {
    var response = await fetch("https://first-time-ajax-rm.firebaseio.com/.json");
    window.foodList = await response.json();

    draw();
}


function draw(){
    var template = "";

    var foodListHTML = document.querySelector("#food-list");

    for (var i in foodList.menu) {
        var item = foodList.menu[i];

        if( foodList.menu[i] === null ) {
            continue
        }

            template += `
               <li class="food-list__item">
                               
                    <!-- item information  -->
                    <div class="food-list__item-info">
                         <h2 class="food-list__item-title">${item.nume}</h2> 
                    
                        <picture>
                            <img src="${item.imagine}">
                        </picture>

                        <!-- item details -->
                        <div class="food-list__item-details">
                            <h3>Recipe:</h3>
                            <p class="food-list__item-recipe">${item.reteta}</p>
                            <h3>Ingredients:</h3>
                            <p class="food-list__item-ingredients">${item.ingrediente}</p>
                        </div>
                        <div class="buttons">
                            <a href="save.html?id=${i}&mode=edit" class="button">Edit</a>
                            <a href="delete.html?id=${i}" class="button">Delete</a>
                        </div>
                    </div>
                                  
                </li>
        `
    }
    foodListHTML.innerHTML = template;
}
