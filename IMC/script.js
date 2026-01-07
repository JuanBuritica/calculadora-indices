document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAll();
    });
});

function calculateAll() {
    // 1. Get Inputs
    const peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);
    const alturaUnidad = document.getElementById('altura-unidad').value;
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const valorActividad = parseFloat(document.getElementById('actividad').value);
    const objetivo = document.getElementById('objetivo').value;

    if (isNaN(peso) || isNaN(altura) || isNaN(edad)) {
        alert("Por favor ingrese todos los datos válidos.");
        return;
    }

    // Smart Height Conversion
    // If unit is CM, convert to Meters.
    if (alturaUnidad === 'cm') {
        altura = altura / 100;
    }
    // If unit is M, but value is > 3 (implausible for human height in meters), assume CM was intended.
    else if (altura > 3) {
        altura = altura / 100;
    }

    // 2. Constants based on Gender
    // Para %GC: Masculino = 10.8, Femenino = 0
    const valor_genero_gc = (genero === 'male') ? 10.8 : 0;

    // Para TMB: Masculino = 5, Femenino = -161
    const valor_genero_tmb = (genero === 'male') ? 5 : -161;


    // 3. Calculations
    const imc = calcularBMC(peso, altura);
    const gc = calcularPorcentajeGrasa(imc, edad, valor_genero_gc);
    const tmb = calcularCaloriasRepos(peso, altura, edad, valor_genero_tmb);
    const tdee = calcularCaloriasActividad(tmb, valorActividad);
    const goalCalories = calcularCaloriasObjetivo(tmb, tdee, objetivo);


    // 4. Update UI
    updateUI({ imc, gc, tmb, tdee, goalCalories, objetivo });
}

// --- Logic Functions (Ported from Python) ---

function calcularBMC(peso, altura) {
    // IMC = peso / altura^2
    return peso / (Math.pow(altura, 2));
}

function calcularPorcentajeGrasa(imc, edad, valor_genero) {
    // %GC = 1.2 * IMC + 0.23 * edad - 5.4 - valor_genero
    return 1.2 * imc + 0.23 * edad - 5.4 - valor_genero;
}

function calcularCaloriasRepos(peso, altura, edad, valor_genero) {
    // TMB = (10*peso) + (6.25*altura_cm) - (5*edad) + valor_genero
    // Python code converts height to cm inside the function: altura * 100
    const altura_cm = altura * 100;
    return (10 * peso) + (6.25 * altura_cm) - (5 * edad) + valor_genero;
}

function calcularCaloriasActividad(tmb, valor_actividad) {
    return tmb * valor_actividad;
}

function calcularCaloriasObjetivo(tmb, tdee, objetivo) {
    let min, max, desc;

    if (objetivo === 'lose') {
        // Adelgazar: 80% to 85% of TMB (Original Guide)
        min = tmb * 0.80;
        max = tmb * 0.85;
        desc = "Déficit Calórico (80-85% TMB)";
    } else if (objetivo === 'maintain') {
        // Mantener: TDEE
        min = tdee;
        max = tdee;
        desc = "Mantenimiento (TDEE)";
    } else if (objetivo === 'gain') {
        // Ganar Masa: TDEE + 300 to 500 kcal
        min = tdee + 300;
        max = tdee + 500;
        desc = "Superávit (+300-500 kcal)";
    }

    return { min, max, desc };
}

// --- UI Helper ---

function getIMCCategory(imc) {
    if (imc < 16) return { text: 'Delgadez Severa', color: '#ef4444' };
    if (imc < 17) return { text: 'Delgadez Moderada', color: '#f97316' };
    if (imc < 18.5) return { text: 'Delgadez Aceptable', color: '#eab308' };
    if (imc < 25) return { text: 'Peso Normal', color: '#22c55e' };
    if (imc < 30) return { text: 'Sobrepeso', color: '#eab308' };
    if (imc < 35) return { text: 'Obesidad I', color: '#f97316' };
    if (imc < 40) return { text: 'Obesidad II', color: '#ef4444' };
    if (imc < 50) return { text: 'Obesidad III', color: '#dc2626' };
    return { text: 'Obesidad IV', color: '#991b1b' };
}

function updateUI(data) {
    // Format numbers
    const imcStr = data.imc.toFixed(2);
    const gcStr = data.gc.toFixed(2) + '%';
    const tmbStr = Math.round(data.tmb).toLocaleString() + ' kcal';
    const tdeeStr = Math.round(data.tdee).toLocaleString() + ' kcal';

    let lossStr, lossDesc;
    if (data.objetivo === 'maintain') {
        lossStr = Math.round(data.goalCalories.min) + ' kcal';
        lossDesc = data.goalCalories.desc;
    } else {
        lossStr = `${Math.round(data.goalCalories.min)} - ${Math.round(data.goalCalories.max)} kcal`;
        lossDesc = data.goalCalories.desc;
    }

    // IMC Category
    const category = getIMCCategory(data.imc);
    const badge = document.getElementById('imc-category');
    badge.textContent = category.text;
    badge.style.backgroundColor = category.color;
    badge.style.color = '#fff'; // ensure text is readable

    // Update Values with animation
    animateValue('imc-value', imcStr);
    animateValue('gc-value', gcStr);
    animateValue('tmb-value', tmbStr);
    animateValue('tdee-value', tdeeStr);

    // Update Goal Card
    animateValue('loss-value', lossStr);
    document.querySelector('#card-loss h3').textContent = 'Objetivo: ' + getObjetivoLabel(data.objetivo);
    document.querySelector('#card-loss .result-desc').textContent = lossDesc;
}

function getObjetivoLabel(val) {
    if (val === 'lose') return 'Adelgazar';
    if (val === 'maintain') return 'Mantener';
    if (val === 'gain') return 'Ganar Masa';
    return '';
}

function animateValue(id, endValue) {
    const el = document.getElementById(id);
    // Simple transition for now, just replacing text. 
    // Could add number counting effect if requested, but text replacement is instant and clean.
    el.style.opacity = 0;
    setTimeout(() => {
        el.textContent = endValue;
        el.style.opacity = 1;
    }, 200);
}
