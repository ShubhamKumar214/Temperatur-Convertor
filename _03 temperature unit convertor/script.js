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
    // Get input values
    const inputTemp = parseFloat(inputValue.value);
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;

    // Validate input
    if (isNaN(inputTemp)) {
        resultDisplay.value = '';
        resultDisplay.placeholder = 'Enter a valid number';
        return;
    }

    // Check if units are selected
    if (!fromUnitValue || !toUnitValue) {
        resultDisplay.value = '';
        resultDisplay.placeholder = 'Select both units';
        return;
    }

    // If same units, just return the input value
    if (fromUnitValue === toUnitValue) {
        resultDisplay.value = inputTemp.toFixed(2);
        return;
    }

    let result;

    // Convert based on from and to units
    switch (fromUnitValue) {
        case 'celsius':
            if (toUnitValue === 'fahrenheit') {
                result = celsiusToFahrenheit(inputTemp);
            } else if (toUnitValue === 'kelvin') {
                result = celsiusToKelvin(inputTemp);
            }
            break;

        case 'fahrenheit':
            if (toUnitValue === 'celsius') {
                result = fahrenheitToCelsius(inputTemp);
            } else if (toUnitValue === 'kelvin') {
                result = fahrenheitToKelvin(inputTemp);
            }
            break;

        case 'kelvin':
            if (toUnitValue === 'celsius') {
                result = kelvinToCelsius(inputTemp);
            } else if (toUnitValue === 'fahrenheit') {
                result = kelvinToFahrenheit(inputTemp);
            }
            break;

        default:
            resultDisplay.value = '';
            resultDisplay.placeholder = 'Invalid conversion';
            return;
    }

    // Display result with 2 decimal places
    resultDisplay.value = result.toFixed(2);

    // Update placeholder with unit symbol
    updatePlaceholder();
}

// Function to update placeholder with appropriate unit symbol
function updatePlaceholder() {
    const toUnitValue = toUnit.value;
    let unitSymbol = '';

    switch (toUnitValue) {
        case 'celsius':
            unitSymbol = '°C';
            break;
        case 'fahrenheit':
            unitSymbol = '°F';
            break;
        case 'kelvin':
            unitSymbol = 'K';
            break;
        default:
            unitSymbol = '';
    }

    if (resultDisplay.value === '') {
        resultDisplay.placeholder = `Result in ${unitSymbol}`;
    }
}

// Function to reset default selected options
function resetDefaultOptions() {
    // Reset "From" unit to show actual selection
    if (fromUnit.value !== '') {
        fromUnit.querySelector('option[disabled]').style.display = 'none';
    }

    // Reset "To" unit to show actual selection
    if (toUnit.value !== '') {
        toUnit.querySelector('option[disabled]').style.display = 'none';
    }
}

// Event listeners
convertButton.addEventListener('click', function (e) {
    e.preventDefault();
    convertTemperature();
});

// Real-time conversion on input change
inputValue.addEventListener('input', convertTemperature);

// Convert when units are changed
fromUnit.addEventListener('change', function () {
    resetDefaultOptions();
    convertTemperature();
});

toUnit.addEventListener('change', function () {
    resetDefaultOptions();
    convertTemperature();
    updatePlaceholder();
});

// Allow Enter key to convert
inputValue.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

// Initialize placeholder
document.addEventListener('DOMContentLoaded', function () {
    resultDisplay.placeholder = 'Result will appear here';
});

// Validation for extreme temperatures
function validateTemperature(temp, unit) {
    let minTemp, maxTemp, unitName;

    switch (unit) {
        case 'celsius':
            minTemp = -273.15; // Absolute zero
            maxTemp = 1000000; // Arbitrary high limit
            unitName = 'Celsius';
            break;
        case 'fahrenheit':
            minTemp = -459.67; // Absolute zero in Fahrenheit
            maxTemp = 1800000; // Arbitrary high limit
            unitName = 'Fahrenheit';
            break;
        case 'kelvin':
            minTemp = 0; // Absolute zero
            maxTemp = 1000000; // Arbitrary high limit
            unitName = 'Kelvin';
            break;
        default:
            return true;
    }

    if (temp < minTemp) {
        alert(`Temperature cannot be below absolute zero (${minTemp}° ${unitName})`);
        return false;
    }

    return true;
}