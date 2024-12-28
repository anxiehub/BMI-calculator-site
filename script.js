const translations = {
    en: {
        "bmi-calculator": "BMI Calculator",
        "weight": "Weight (kg):",
        "height": "Height (cm):",
        "calculate-bmi": "Calculate BMI",
        "bmi-result": "Your BMI Result:"
    },
    ru: {
        "bmi-calculator": "Калькулятор ИМТ",
        "weight": "Вес (кг):",
        "height": "Рост (см):",
        "calculate-bmi": "Рассчитать ИМТ",
        "bmi-result": "Ваш результат ИМТ:"
    },
    es: {
        "bmi-calculator": "Calculadora de IMC",
        "weight": "Peso (kg):",
        "height": "Altura (cm):",
        "calculate-bmi": "Calcular IMC",
        "bmi-result": "Tu resultado de IMC:"
    }
};

document.getElementById('language').addEventListener('change', function() {
    const selectedLanguage = this.value;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[selectedLanguage][key];
    });
});

document.getElementById('calculate-bmi-btn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (isNaN(weight) || isNaN(height)) {
        alert('Please enter valid numbers for weight and height.');
        return;
    }

    const bmi = weight / (height ** 2);
    let result = '';

    if (bmi < 18.5) {
        result = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        result = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        result = 'Overweight';
    } else {
        result = 'Obesity';
    }

    document.getElementById('bmi-result').textContent = `Your BMI: ${bmi.toFixed(2)} (${result})`;

    // Show modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><p>${document.getElementById('bmi-result').textContent}</p></div>`;
    document.body.appendChild(modal);

    // Close modal
    document.querySelector('.close').addEventListener('click', function() {
        modal.remove();
    });

    // Close modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });
});