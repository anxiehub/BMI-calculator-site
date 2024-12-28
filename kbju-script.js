const translations = {
    en: {
        "kbju-calculator": "KBJU Calculator",
        "weight": "Weight (kg):",
        "height": "Height (cm):",
        "age": "Age:",
        "sex": "Sex:",
        "male": "Male",
        "female": "Female",
        "activity": "Activity Level:",
        "minimal": "Minimal",
        "low": "Low",
        "medium": "Medium",
        "high": "High",
        "very-high": "Very High",
        "calculate-kbju": "Calculate KBJU",
        "kbju-result": "Your KBJU Result:"
    },
    ru: {
        "kbju-calculator": "Калькулятор КБЖУ",
        "weight": "Вес (кг):",
        "height": "Рост (см):",
        "age": "Возраст:",
        "sex": "Пол:",
        "male": "Мужчина",
        "female": "Женщина",
        "activity": "Уровень активности:",
        "minimal": "Минимальная",
        "low": "Низкая",
        "medium": "Средняя",
        "high": "Высокая",
        "very-high": "Очень высокая",
        "calculate-kbju": "Рассчитать КБЖУ",
        "kbju-result": "Ваш результат КБЖУ:"
    },
    es: {
        "kbju-calculator": "Calculadora de KBJU",
        "weight": "Peso (kg):",
        "height": "Altura (cm):",
        "age": "Edad:",
        "sex": "Sexo:",
        "male": "Hombre",
        "female": "Mujer",
        "activity": "Nivel de actividad:",
        "minimal": "Mínima",
        "low": "Baja",
        "medium": "Media",
        "high": "Alta",
        "very-high": "Muy alta",
        "calculate-kbju": "Calcular KBJU",
        "kbju-result": "Tu resultado de KBJU:"
    }
};

document.getElementById('language').addEventListener('change', function() {
    const selectedLanguage = this.value;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[selectedLanguage][key];
    });
});

document.getElementById('calculate-kbju-btn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight-kbju').value);
    const height = parseFloat(document.getElementById('height-kbju').value);
    const age = parseInt(document.getElementById('age').value);
    const sex = document.getElementById('sex').value;
    const activity = document.getElementById('activity').value;

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert('Please enter valid numbers for weight, height, and age.');
        return;
    }

    let bmr;
    if (sex === 'Male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    switch (activity) {
        case 'Minimal':
            bmr *= 1.2;
            break;
        case 'Low':
            bmr *= 1.375;
            break;
        case 'Medium':
            bmr *= 1.55;
            break;
        case 'High':
            bmr *= 1.725;
            break;
        case 'Very High':
            bmr *= 1.9;
            break;
    }

    const proteins = weight * 1.8;
    const fats = weight * 0.8;
    const carbs = (bmr - (proteins * 4 + fats * 9)) / 4;

    document.getElementById('kbju-result').textContent = `Your daily needs: ${bmr.toFixed(2)} kcal, Proteins: ${proteins.toFixed(2)} g, Fats: ${fats.toFixed(2)} g, Carbohydrates: ${carbs.toFixed(2)} g`;

    // Play sound
    const audio = new Audio('sounds/click.mp3');
    audio.play();

    // Show modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><p>${document.getElementById('kbju-result').textContent}</p></div>`;
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