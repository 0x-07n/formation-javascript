// Fonction pour récupérer les VIP du localStorage
function getVIPs() {
    const vipList = localStorage.getItem("vips");
    return vipList ? JSON.parse(vipList) : [];
  }
  
  // Fonction pour afficher les VIP dans le tableau
  function displayVIPs() {
    const vips = getVIPs();
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Clear existing rows
  
    vips.forEach((vip, index) => {
      const tr = document.createElement("tr");
      tr.classList.add(vip.isPresent ? "table-success" : "table-danger"); // Change row color based on presence
  
      tr.dataset.indice = index;
      tr.innerHTML = `
        <td>${vip.firstName}</td>
        <td>${vip.lastName}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteVIP(${index})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-warning" onclick="togglePresence(${index}, this)">
            <i class="fa fa-check"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // Fonction pour ajouter un VIP
  function addVIP(firstName, lastName) {
    const vips = getVIPs();
    vips.push({ firstName, lastName, isPresent: false }); // Ajouter un champ isPresent
    localStorage.setItem("vips", JSON.stringify(vips));
    displayVIPs();
  }
  
  // Fonction pour supprimer un VIP
  function deleteVIP(index) {
    const vips = getVIPs();
    vips.splice(index, 1); // Supprimer le VIP à l'index spécifié
    localStorage.setItem("vips", JSON.stringify(vips));
    displayVIPs();
  }
  
  // Fonction pour changer le statut de présence d'un VIP
  function togglePresence(index, button) {
    const vips = getVIPs();
    vips[index].isPresent = !vips[index].isPresent; // Inverse l'état de présence
    localStorage.setItem("vips", JSON.stringify(vips));
  
    // Modifier la couleur de la ligne en fonction du statut de présence
    const tr = button.closest('tr');
    if (vips[index].isPresent) {
      tr.classList.remove("table-danger");
      tr.classList.add("table-success");
    } else {
      tr.classList.remove("table-success");
      tr.classList.add("table-danger");
    }
  }
  
  // Événement pour ajouter un VIP lors du clic sur le bouton "plus"
  document.querySelector("button.btn-success").addEventListener("click", () => {
    const firstName = document.querySelector('input[aria-label="Prénom"]').value;
    const lastName = document.querySelector('input[aria-label="Nom"]').value;
  
    if (firstName && lastName) {
      addVIP(firstName, lastName);
      document.querySelector('input[aria-label="Prénom"]').value = "";
      document.querySelector('input[aria-label="Nom"]').value = "";
    }
  });
  
  // Charger les VIP au démarrage de la page
  document.addEventListener("DOMContentLoaded", displayVIPs);
  