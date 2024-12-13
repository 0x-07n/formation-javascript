const tab1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let tab2 = [...tab1, ...tab1];
console.log(tab1);
console.log(tab2);

let startTime = null;
let timerInterval = null; // Stocke l'intervalle du timer

function melanger(tab) {
  for (let i = tab.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tab[i], tab[j]] = [tab[j], tab[i]]; 
  }
  return tab;
}
tab2 = melanger(tab2);

const container = document.getElementById('container');
tab2.forEach((num, index) => {
  const div = document.createElement('div');
  div.setAttribute('image-index', `${index}`);
  const img = document.createElement('img');
  img.src = `img/${num}.webp`;
  div.appendChild(img);
  container.appendChild(div);
});

function resetSelection() {
  selection = 0;
  nom1 = "";
  nom2 = "";
  tuile1 = null;
  tuile2 = null;
}

// Fonction pour mettre à jour le timer
function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = (currentTime - startTime) / 1000; // Temps écoulé en secondes avec millisecondes
  document.getElementById('timer').textContent = `Temps : ${elapsedTime.toFixed(3)} secondes`;
}

// Démarre le timer lorsque la partie commence
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 10); // Met à jour toutes les 10 millisecondes
}

// Arrête le timer lorsque la partie se termine
function stopTimer() {
  clearInterval(timerInterval);
}

const divs = document.querySelectorAll('#container > div');
let selection = 0;
let nom1 = "";
let nom2 = "";
let tuile1 = null;
let tuile2 = null;
let score = 0;

divs.forEach(tuile => {
  tuile.onclick = () => {
    if (!tuile.classList.contains('green') && selection < 2) {
      tuile.classList.add('green');
      selection++;
      if (startTime === null) {
        startTimer(); // Lance le timer
      }

      if (selection === 1) {
        nom1 = tuile.querySelector('img').src;
        tuile1 = tuile;
      } else if (selection === 2) {
        nom2 = tuile.querySelector('img').src;
        tuile2 = tuile;

        if (nom1 === nom2) {
          setTimeout(() => {
            tuile1.querySelector('img').remove();
            tuile2.querySelector('img').remove();
            tuile1.classList.remove('green');
            tuile2.classList.remove('green');
            tuile1.onclick = null;
            tuile2.onclick = null;
            resetSelection();
            score++;
            if (score === 12) { 
              stopTimer(); // Arrête le timer
              const endTime = new Date();
              document.getElementById('fin').classList.remove('none');
              alert(`Bravo, tu as fini en ${(endTime - startTime) / 1000} secondes !`);
            }
          }, 50);
        } else {
          setTimeout(() => {
            tuile1.classList.remove('green');
            tuile2.classList.remove('green');
            resetSelection();
          }, 50);
        }
      }
    } else if (tuile.classList.contains('green')) {
      tuile.classList.remove('green');
      selection--;
      if (selection === 0) resetSelection();
    }
  };
});
