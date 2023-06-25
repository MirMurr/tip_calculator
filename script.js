const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('num-of-people');
const tipPerPerson = document.getElementById('tip-result');
const totalPerPerson = document.getElementById('total-result');
const tips = document.querySelectorAll(".tip-element");
const tipCustom = document.getElementById("custom-tip");
const resetBtn = document.querySelector('.reset-btn');
const error = document.getElementById('error');


//setting the values - these will be displayed
billInput.value = '0.0';
peopleInput.value = '1';
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);


let billValue = 0.0; 
let peopleValue = 1; // or peopleInput
let tipValue = 0.15;


//Bill input function
function billInputFunction() {
    billValue = parseFloat(billInput.value)
    calculateTip();
}

//Number of people & error message if people < 1
function peopleInputFunction() {
    peopleValue = parseFloat(peopleInput.value)
    

        if (peopleValue < 1) {
            error.style.display ="block"
            peopleInput.style.border ="red solid 1px"
        } else {
            error.style.display = "none"
            peopleInput.style.border = "none"
            calculateTip();
        }
}

//Calculates custom tip
function tipInputFunction() {
    tipValue = parseFloat(tipCustom.value / 100);

    tips.forEach(function(val) {
        val.classList.remove("active-tip");
    });
    calculateTip();
}

//Activates the tip numbers on click select tip section
function handleClick(e) {
    tips.forEach(function(val) {
        val.classList.remove("active-tip");
        if (e.target.innerHTML == val.innerHTML) {
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML) / 100; 
        }
    });
    calculateTip();

}

// Calculates the amount of the tip per person
function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue / peopleValue) + tipAmount;
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

// Reserts all values to default
function reset() {
    billInput.value = '0.0';
    billInputFunction()
    peopleInput.value = '1';
    peopleInputFunction()
    tipCustom.value = "";
}


// Eventlisteners 
billInput.addEventListener("input", billInputFunction);
billInput.addEventListener("click", () => {
    billInput.value = "";
});

peopleInput.addEventListener("input", peopleInputFunction);

peopleInput.addEventListener("click", () => {
    peopleInput.value = "";
});

tips.forEach(function(val) {
    val.addEventListener("click", handleClick);
});

tipCustom.addEventListener("input", tipInputFunction);

resetBtn.addEventListener("click", reset);
