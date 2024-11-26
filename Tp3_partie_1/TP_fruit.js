document.getElementById("btnAjouter").onclick = () => {
    const fruitInput = document.getElementById('fruit');
    const fruit = fruitInput.value.trim();

    if (fruit === "") {
        alert("Veuillez entrer un fruit.");
        return;
    }

    fruitInput.value = '';

    const tbody = document.getElementById("myTbody");
    const template = document.getElementById('templateTr');

    const clone = template.content.cloneNode(true);
    const td = clone.querySelector("td");
    const btn = clone.querySelector("button");

    td.textContent = fruit;
    btn.onclick = (evt) => handleRemove(evt);

    tbody.appendChild(clone);
};

const handleRemove = (evt) => {
    evt.target.closest("tr").remove();
};