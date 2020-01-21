document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    var button = document.querySelector(".agenda__submit-button");
    var phoneInput = document.querySelector("#phone");
    var form = document.querySelector(".agenda__form");
    var idToBeAssigned = 0;
    var selectedId = undefined;

    var contacts = [{
        name: "Mike",
        phoneNumber: "0987612345",
        id: 0
    }];

    // Load existing users
    draw();

    // Prevent form from submitting if focus is not on the phone number input
    form.addEventListener("keypress", function (event) {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });

    // Enter user on enter keypress if focus is on the phone number input
    phoneInput.addEventListener("keypress", function(event){
        if(event.key === "Enter") {
            onInputSave();
        }
    });

    // Enter user when clicking sumbit button
    button.addEventListener("click" , function(event){
        event.preventDefault();
        onInputSave();
    });


    /*
       When editing/deleting - check if clicked element has edit/delete class
       This is done because new contact elements do not have events attached to them
     */

    document.addEventListener("click", function (event) {
         var isEditButton = event.target.classList.contains("agenda__contact-edit");
         var isDeleteButton = event.target.classList.contains("agenda__contact-delete");

        // Edit button
        if(isEditButton) {
            editContact(event);
        }

        // Delete Button
        if(isDeleteButton){
            deleteContact(event)
        }
    });

    function save(id){
        var nameInputValue = document.querySelector("#name").value;
        var phoneInputValue = document.querySelector("#phone").value;
        var contact = {
            name: undefined,
            phoneNumber: undefined,
            id: undefined
        }

        if(nameInputValue.length > 0 && phoneInputValue.length > 0) {
            if ( id === undefined || id === null || id === "" ){
                idToBeAssigned++;
                contact.name = nameInputValue;
                contact.phoneNumber = phoneInputValue;
                contact.id = idToBeAssigned;
                contacts.push(contact);
            } else {
                for ( var i = 0; i<contacts.length; i++ ) {
                     var contact = contacts[i];
                     if(contact.id === id){
                         contact.name = nameInputValue;
                         contact.phoneNumber = phoneInputValue;
                     }
                }
            }
        }

        nameInputValue = "";
        phoneInputValue = "";

    }

    function onInputSave() {
        if( selectedId !== undefined ) {
            for( var i = 0; i < contacts.length; i++ ) {
                var contact = contacts[i];
                if( contact.id === selectedId ) {
                    save(selectedId);
                    selectedId = undefined;
                }
            }
            draw();
        } else {
            save();
            draw();
        }
    }

    function editContact(event) {
        var nameInput = document.querySelector("#name");
        var phoneInput = document.querySelector("#phone");
        selectedId = +event.target.parentElement.getAttribute("data-user-id");


        for (var i = 0; i<contacts.length; i++ ) {
            var contact = contacts[i];
            if(contact.id === +selectedId){
                nameInput.value = contact.name;
                phoneInput.value = contact.phoneNumber;
            }
        }
    }

    function deleteContact(event) {
        console.log(event.target);
        selectedId = +event.target.parentElement.getAttribute("data-user-id");


        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];
            if(contact.id === selectedId) {
                contacts.splice(contacts.indexOf(contact),1);
            }
        }
        draw();
    }

    function draw(){
        var contactsContainer = document.querySelector(".agenda__contacts-list");
        var htmlContent = "";

        for( var i = 0 ; i < contacts.length; i++ ){
            var user = contacts[i];

            htmlContent +=
                `
                    <!-- agenda contact -->
                    <li class="agenda__contact">
                        <div class="agenda__contact-details">
                            <h3 class="agenda__contact-heading-mobile">Name</h3>
                            <span class="agenda__contact-name">${user.name}</span>

                            <h3 class="agenda__contact-heading-mobile">Phone number</h3>
                            <span class="agenda__contact-phone">${user.phoneNumber}</span>
                        </div>

                        <!-- contact edit & delete -->
                        <div class="agenda__contact-controls" data-user-id="${user.id}">
                            <button class="agenda__contact-edit">edit</button>
                            <button class="agenda__contact-delete">delete</button>
                        </div>
                    </li>
                      
                `
        }

        contactsContainer.innerHTML = htmlContent;
    }

});
