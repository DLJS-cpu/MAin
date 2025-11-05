let registrados = [
  { nombre: "Carmen", apellido: "Casanova", edad: 38, foto_perfil: "6073873.png" },
  { nombre: "Zacarías", apellido: "Zárate", edad: 40, foto_perfil: "6073873.png" },
  { nombre: "Alberto", apellido: "Alonso", edad: 29, foto_perfil: "6073873.png" },
  { nombre: "Luis", apellido: "López", edad: 31, foto_perfil: "6073873.png" },
];

let contenedor = document.getElementById("cards-container");
renderCards();

function agregar() {
  let archivo = document.getElementById("foto_perfil").files[0];
  let fotoURL;
  if (archivo) {
    fotoURL = URL.createObjectURL(archivo);
  } else {
    fotoURL = "6073873.png";
  }

  let nuevoRegistrado = {
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    edad: parseInt(document.getElementById("edad").value.trim(), 10),
    foto_perfil: fotoURL
  };

  if (!nuevoRegistrado.nombre || !nuevoRegistrado.apellido || !nuevoRegistrado.edad) {
    alert("Por favor, completa todos los campos antes de agregar.");
    
  } else {
    registrados.push(nuevoRegistrado);
    renderCards();
    document.getElementById("registro").reset();
    alert("Registro agregado correctamente.");
  }
}

function renderCards() {
  let carta = "";
  for (let i = 0; i < registrados.length; i++) {
    let persona = registrados[i];
    carta += `
      <div class="cards">
        <div class="img">
          <img src="${persona.foto_perfil}" alt="${persona.nombre}">
        </div>
        <div class="info">
          <h2>${persona.nombre} ${persona.apellido}</h2>
          <p>Edad: ${persona.edad} años</p>
        </div>
        <div class="acciones">
          <button type="button" onclick="eliminar(${i})">Eliminar</button>
        </div>
      </div>
    `;
  }

  if (registrados.length > 0) {
    contenedor.innerHTML = carta;
  } else {
    contenedor.innerHTML = "<p>No hay registros disponibles.</p>";
  }
}
function eliminar(index) {
  if (confirm(`¿Eliminar a ${registrados[index].nombre} ${registrados[index].apellido}?`)) {
    registrados.splice(index, 1);
    renderCards();
  } else {
    alert("Eliminación cancelada.");
  }
}

function ordenar() {
  if (registrados.length > 1) {
    registrados.sort(function (a, b) {
      return a.nombre.localeCompare(b.nombre);
    });
    renderCards();
  } else {
    alert("No hay suficientes registros para ordenar.");
  }
}

function buscar() {
  let nombreIngresado = document.getElementById("ingresar").value;
  let resultado = registrados.filter( function(persona) {
    return persona.nombre.includes(nombreIngresado);
  });

  if (resultado.length > 0) {
    contenedor.innerHTML = "";
    let persona = resultado[0];
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${persona.foto_perfil}" alt="Foto de ${persona.nombre}">
      <p><strong>Nombre:</strong> ${persona.nombre}</p>
      <p><strong>Apellido:</strong> ${persona.apellido}</p>
      <p><strong>Edad:</strong> ${persona.edad}</p>
    `;
    contenedor.appendChild(card);
  } else {
    contenedor.innerHTML = "<p>No se encontró ninguna persona con ese nombre.</p>";
  }
}

function limpiar() {
  if (document.getElementById("registro")) {
    document.getElementById("registro");
  } else {
    alert("No se encontró el formulario de registro.");
  }

  if (document.getElementById("buscador")) {
    document.getElementById("buscador").reset();
  } else {
    alert("No se encontró el formulario de búsqueda.");
  }

  renderCards();
}
