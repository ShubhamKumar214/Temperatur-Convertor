// Get DOM elements
const inputValue = document.getElementById('decimal');
const fromUnit = document.getElementById('value-unit');
const toUnit = document.getElementById('unit');
const resultDisplay = document.getElementById('display');
const convertButton = document.getElementById('submit');

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9 + 273.15;
}
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9 / 5 + 32;
}

// Main conversion function
function convertTemperature() {
    const inputTemp = parseFloat(inputValue.value);
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;

    if (isNaN(inputTemp)) {
        resultDisplay.value = '';
        resultDisplay.placeholder = 'Enter a valid number';
        return;
    }
    if (!fromUnitValue || !toUnitValue) {
        resultDisplay.value = '';
        resultDisplay.placeholder = 'Select both units';
        return;
    }
    if (fromUnitValue === toUnitValue) {
        resultDisplay.value = inputTemp.toFixed(2);
        return;
    }

    let result;
    switch (fromUnitValue) {
        case 'celsius':
            if (toUnitValue === 'fahrenheit') result = celsiusToFahrenheit(inputTemp);
            else if (toUnitValue === 'kelvin') result = celsiusToKelvin(inputTemp);
            break;
        case 'fahrenheit':
            if (toUnitValue === 'celsius') result = fahrenheitToCelsius(inputTemp);
            else if (toUnitValue === 'kelvin') result = fahrenheitToKelvin(inputTemp);
            break;
        case 'kelvin':
            if (toUnitValue === 'celsius') result = kelvinToCelsius(inputTemp);
            else if (toUnitValue === 'fahrenheit') result = kelvinToFahrenheit(inputTemp);
            break;
        default:
            resultDisplay.value = '';
            resultDisplay.placeholder = 'Invalid conversion';
            return;
    }
    resultDisplay.value = result.toFixed(2);
    updatePlaceholder();
}

// Function to update placeholder with appropriate unit symbol
function updatePlaceholder() {
    const toUnitValue = toUnit.value;
    let unitSymbol = '';
    switch (toUnitValue) {
        case 'celsius': unitSymbol = '°C'; break;
        case 'fahrenheit': unitSymbol = '°F'; break;
        case 'kelvin': unitSymbol = 'K'; break;
        default: unitSymbol = '';
    }
    if (resultDisplay.value === '') {
        resultDisplay.placeholder = `Result in ${unitSymbol}`;
    }
}

// Event listeners
convertButton.addEventListener('click', function (e) {
    e.preventDefault();
    convertTemperature();
});
inputValue.addEventListener('input', convertTemperature);
fromUnit.addEventListener('change', convertTemperature);
toUnit.addEventListener('change', function () {
    convertTemperature();
    updatePlaceholder();
});
inputValue.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') convertTemperature();
});
document.addEventListener('DOMContentLoaded', function () {
    resultDisplay.placeholder = 'Result will appear here';
});