console.log('DOM fully loaded and parsed');

var db = "https://first-time-ajax-rm.firebaseio.com/.json";
var menu = "https://first-time-ajax-rm.firebaseio.com/menu/.json";
var foodList = {};
var submitButton = document.querySelector(".form input[type=\"submit\"]");
var saveMode = "add";
var productId = undefined;

var dishNameInput = document.querySelector("#name-input");
var dishImageInput = document.querySelector("#product-image-url");
var dishIngredientsInput = document.querySelector("#ingredients");
var dishRecipeInput = document.querySelector("#recipe");

getList();
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    save();
});

async function getList() {
    var response = await fetch(db);
    window.foodList = await response.json();
    console.log(foodList);
    setSaveMode();
}

async function save() {

    var inputs = [ dishNameInput, dishImageInput, dishIngredientsInput, dishRecipeInput ];

    var inputsRule = dishNameInput.value.length > 1 && dishRecipeInput.value.length > 1
                     && dishIngredientsInput.value.length > 1 && dishImageInput.value.length > 1;

    var foodItem = undefined;


    if(saveMode === "add" && inputsRule ) {
        console.log("add-mode");

        foodItem = {
            imagine: window.dishImageInput.value,
            ingrediente: window.dishIngredientsInput.value,
            nume: window.dishNameInput.value,
            reteta: window.dishRecipeInput.value
        }

        var response = await fetch(menu, {
            method: "POST",
            body: JSON.stringify(foodItem)
        });

        alert("Product has been added successfully");
        window.location.replace("admin.html");
    } else if (saveMode === "edit" && inputsRule ) {
        console.log("edit-mode");

        foodItem = {
            imagine: window.dishImageInput.value,
            ingrediente: window.dishIngredientsInput.value,
            nume: window.dishNameInput.value,
            reteta: window.dishRecipeInput.value
        }

        for ( var i in foodList.menu ) {
            if( window.productId === i ) {
                var response = await fetch(`https://first-time-ajax-rm.firebaseio.com/menu/${i}.json`, {
                    method: "PUT",
                    body: JSON.stringify(foodItem)
                });
            }
        }
        alert("Product has been edited successfully");
        window.location.replace("admin.html");
    } else {
        for (var i = 0; i < inputs.length; i++ ) {
            var input = inputs[i];
            console.log(input)
            if ( input.value.length < 1 ){
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        }
        alert("Please complete all of the input values");
    }

}

async function setSaveMode() {
    var params = new URLSearchParams(window.location.search);
    var mode = params.get("mode");
    var saveModeTitle = document.querySelector(".form__title");

    if( params.get('id') !== null ) {
        window.productId = params.get('id');
        console.log(window.productId);
    }

    if (mode === "add") {
        window.saveMode = "add";
        saveModeTitle.textContent = "Add a new product";
    } else if ( mode === "edit") {
        window.saveMode = "edit";

        for ( var i in foodList.menu ) {
            if( window.productId === i ) {
                var product = foodList.menu[i];
                window.dishImageInput.value = product.imagine;
                window.dishIngredientsInput.value = product.ingrediente;
                window.dishNameInput.value = product.nume;
                window.dishRecipeInput.value = product.reteta;

                saveModeTitle.textContent = product.nume + " - edit";
            }
        }
    }

    console.log(window.saveMode);
}
