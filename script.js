// script.js
let orders = ["🍅 Tomate", "🥬 Lechuga", "🧀 Queso", "🍞 Pan"];
let currentOrders = ["-", "-"];
let scores = [0, 0];
let timer = 60; // Tiempo en segundos
let gameInterval;
let timerInterval;

function startGame() {
    generateOrder(1);
    generateOrder(2);
    generateIngredients(1);
    generateIngredients(2);
    gameInterval = setInterval(() => {
        generateOrder(1);
        generateOrder(2);
        generateIngredients(1);
        generateIngredients(2);
    }, 10000); // Nuevos pedidos cada 10 segundos
    timerInterval = setInterval(updateTimer, 1000);
}

function generateIngredients(player) {
    const playerIngredients = document.getElementById(`ingredients${player}`);
    playerIngredients.innerHTML = ""; // Limpiar ingredientes anteriores

    // Generar ingredientes aleatorios
    let availableIngredients = orders.slice();
    for (let i = 0; i < 4; i++) {
        let ingredient = availableIngredients.splice(Math.floor(Math.random() * availableIngredients.length), 1);
        playerIngredients.innerHTML += `
            <button class="ingredient" onclick="addIngredient('${ingredient}', ${player})">
                ${ingredient}
            </button>`;
    }
}

function addIngredient(ingredient, player) {
    let kitchenId = `kitchen${player}`;
    let kitchen = document.getElementById(kitchenId);
    kitchen.innerHTML += `<div class="kitchen-item">${ingredient}</div>`;
}

function submitOrder(player) {
    let orderIndex = player - 1;
    let kitchenId = `kitchen${player}`;
    let kitchen = document.getElementById(kitchenId);
    let currentIngredients = kitchen.innerText.split("\n").filter(item => item.trim() !== "");

    if (currentIngredients.includes(currentOrders[orderIndex])) {
        scores[orderIndex] += 10;
        document.getElementById(`score${player}`).innerText = `Puntos: ${scores[orderIndex]}`;
        currentOrders[orderIndex] = "-";
        document.getElementById(`order${player}`).innerText = `Pedido: Completado`;
        setTimeout(() => generateOrder(player), 2000); // Genera un nuevo pedido después de completar
        kitchen.innerHTML = ""; // Limpia la cocina después de entregar el pedido
    } else {
        alert(`Jugador ${player}, ¡Pedido incorrecto!`);
    }
}

function generateOrder(player) {
    let order = orders[Math.floor(Math.random() * orders.length)];
    currentOrders[player - 1] = order;
    document.getElementById(`order${player}`).innerText = `Pedido: ${order}`;
}

function updateTimer() {
    timer--;
    document.getElementById("timer-bar").style.width = (timer * 100 / 60) + "%";
    if (timer <= 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert(`¡Tiempo acabado! Jugador 1: ${scores[0]} puntos, Jugador 2: ${scores[1]} puntos`);
    }
}

startGame();
