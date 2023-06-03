document.addEventListener('DOMContentLoaded', function() {
    // Check if the button was clicked
    if (localStorage.getItem('buttonClicked') === 'true') {
        // If the button was clicked, change the text in home2.html
        var resultText = document.getElementById('resultText');
        if (resultText) {
            resultText.innerText = 'Button has been clicked!';
        }
    } else {
        // If the button was not clicked, display the default text in home2.html
        var resultText = document.getElementById('resultText');
        if (resultText) {
            resultText.innerText = 'NO CLICK!';
        }
    }
});

// Attach event listener to the button (only on home page 1)
var myButton = document.getElementById('myButton');
if (myButton) {
    myButton.addEventListener('click', function() {
        // Store the button click status in local storage
        localStorage.setItem('buttonClicked', 'true');
    });
}
