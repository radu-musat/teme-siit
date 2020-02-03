console.log('DOM fully loaded and parsed');

var foodList = {};
var submitButton = document.querySelector(".form input[type=\"submit\"]");


getList();
async function getList() {
    var response = await fetch("https://first-time-ajax-rm.firebaseio.com/.json");
    window.foodList = await response.json();

    draw();
}

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    draw();
});


function draw(){
    var inputValue = document.querySelector(".form input[type=\"text\"] ").value;
    var template = "";

    var foodListHTML = document.querySelector("#food-list");


    for (var i in foodList.menu) {
        var item = foodList.menu[i];


        if( foodList.menu[i] === null ) {
            continue
        }

        //search
        if(  foodList.menu[i].ingrediente.indexOf(inputValue)!==-1  ) {

            console.log(inputValue);
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
                        <a  class="button" href="details.html?id=${i}" target="_blank">Details</a>
                    </div>
                                  
                </li>
        `

        }



    }
    foodListHTML.innerHTML = template;
}

//window.location



