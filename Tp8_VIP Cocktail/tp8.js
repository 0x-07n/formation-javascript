const url =
  "https://alpha-javascript-7cc48-default-rtdb.europe-west1.firebasedatabase.app/";
const noeud = "personnes";
const url2 = `${url}${noeud}.json`;

const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const btnAjouter = document.getElementById("btnAjouter");
const tbody = document.getElementById("myTbody");
const templateTr = document.getElementById("templateTr").content;

// Ajouter un VIP
btnAjouter.addEventListener("click", () => {
  const prenom = prenomInput.value.trim();
  const nom = nomInput.value.trim();

  if (!prenom || !nom) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const nouveauVip = { prenom, nom, confirme: false };
  axios
    .post(url2, nouveauVip)
    .then(() => {
      prenomInput.value = "";
      nomInput.value = "";
      chargerVip(); // Recharger la liste
    })
    .catch((err) => console.error(err));
});

// Charger et afficher les VIP
function chargerVip() {
  axios
    .get(url2)
    .then((response) => {
      tbody.innerHTML = ""; // Nettoyer le tableau
      const data = response.data;
      if (data) {
        Object.keys(data).forEach((id) => {
          const vip = data[id];
          const tr = templateTr.cloneNode(true);
          const [tdPrenom, tdNom, tdSupprimer, tdConfirmer] =
            tr.querySelectorAll("td");

          tdPrenom.textContent = vip.prenom;
          tdNom.textContent = vip.nom;

          // Bouton supprimer
          tdSupprimer.querySelector("button").addEventListener("click", () => {
            axios.delete(`${url}${noeud}/${id}.json`).then(() => chargerVip());
          });

          // Bouton confirmer
          const btnConfirmer = tdConfirmer.querySelector("button");
          btnConfirmer.addEventListener("click", () => {
            axios
              .patch(`${url}${noeud}/${id}.json`, { confirme: true })
              .then(() => chargerVip());
          });

          // Modifier le style si confirmé
          if (vip.confirme) {
            tr.querySelector("tr").classList.add("table-success");
            btnConfirmer.disabled = true;
          }

          tbody.appendChild(tr);
        });
      }
    })
    .catch((err) => console.error(err));
}

// Charger la liste des VIP au chargement de la page
document.addEventListener("DOMContentLoaded", chargerVip);
