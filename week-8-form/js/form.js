document.addEventListener('DOMContentLoaded', (event) => {
    var submitButton = document.querySelector("#submit__button");

    submitButton.addEventListener("click",function (event) {
        event.preventDefault();
        validateInputs();
    });

    function checkNames() {
        var firstName = document.querySelector("#first_name");
        var lastName = document.querySelector("#last_name");
        var regex = /^[A-Za-z]+$/;

        if (regex.test(firstName.value) && regex.test(lastName.value)) {
            firstName.classList.remove("invalid-input");
            lastName.classList.remove("invalid-input");
            console.log("User name is " + firstName.value + " " + lastName.value);
            return true;
        }

        if(!regex.test(firstName.value)) {
            firstName.classList.add("invalid-input");
        }

        if(!regex.test(lastName.value)) {
            lastName.classList.add("invalid-input");
        }

        return false;
    }

    function checkRadioInputs() {
        var radioInputs = document.querySelector('.form__group--gender');
        var radioMale = document.querySelector("#male");
        var radioFemale = document.querySelector("#female");
        var selectedGender = undefined;

        if (radioMale.checked || radioFemale.checked ) {
            radioInputs.classList.remove("invalid-input");

            if (radioMale.checked) {
                selectedGender = radioMale.value;
            } else {
                selectedGender = radioFemale.value;
            }

            console.log( 'gender is ' + selectedGender);
            return true;
        } else if( !radioMale.checked || !radioFemale.checked) {

            console.log('no gender')
            radioInputs.classList.add("invalid-input");
            return false;
        }

    }

    function checkComment() {
        var textArea = document.querySelector("#comment");
        if (textArea.value !== null && textArea.value !== undefined && textArea.value !== '' ) {
            console.log( "text area content " + "\n" + textArea.value);
            textArea.classList.remove("invalid-input");
            return true;
        }

        textArea.classList.add("invalid-input");
        return false;
    }

    function validateInputs() {
        var banner = document.querySelector('.form__confirm');
        var firstName = undefined;
        var lastName = undefined;
        var bannerMessage = undefined;
        var namesStatus = checkNames();
        var radioStaus = checkRadioInputs();
        var commentStatus = checkComment();


        if( namesStatus && radioStaus && commentStatus ) {
            firstName = document.querySelector("#first_name").value;
            lastName = document.querySelector("#last_name").value;
            bannerMessage = "Hello " + firstName + " " + lastName + " " + "thank you for submitting the form";

            banner.textContent = bannerMessage;
            banner.classList.add('form__confirm--active');

            return true;
        } else {
            return false;
        }
    }


});
