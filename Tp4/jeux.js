const tab1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let tab2 = [...tab1, ...tab1];
console.log(tab1);
console.log(tab2);

let startTime = null;

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
        startTime = new Date();
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
              const endTime = new Date();
              document.getElementById('fin').classList.remove('none');
              alert(`Bravo, tu as fini en ${(endTime - startTime) / 1000} secondes !`);
            }
          }, 500);
        } else {
          setTimeout(() => {
            tuile1.classList.remove('green');
            tuile2.classList.remove('green');
            resetSelection();
          }, 500);
        }
      }
    } else if (tuile.classList.contains('green')) {
      tuile.classList.remove('green');
      selection--;
      if (selection === 0) resetSelection();
    }
  };
});