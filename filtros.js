let api = "46626f00e951432da448118605114abb";
let url = "https://api.football-data.org/v2/competitions/2014/matches";
let select = document.getElementById("select");
let botonBuscar = document.getElementById("buscar");
let ganados = document.getElementById("ganados");
let perdidos = document.getElementById("perdidos");
let empatados = document.getElementById("empatados");
let proximos = document.getElementById("no-jugados");
let loader = document.getElementById("loader");

fetch(url, {
  method: "GET",
  headers: {
    "X-Auth-Token": api,
  },
})
  .then(function (response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    init(data);
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
function init(data) {
  crearTabla(data.matches);
  selectEquipos(data.matches);
  botonBuscar.addEventListener("click", function () {
    tbody.innerHTML = "";
    filtros(data.matches);
  });
}

function crearTabla(partidos) {
  for (let i = 0; i < partidos.length; i++) {
    let fila = document.createElement("tr");
    let imgHome = document.createElement("img");
    imgHome.src = `https://crests.football-data.org/${partidos[i].homeTeam.id}.svg`;
    let imgAway = document.createElement("img");
    imgAway.src = `https://crests.football-data.org/${partidos[i].awayTeam.id}.svg`;
    let celda1 = document.createElement("td");
    celda1.innerHTML = `${partidos[i].homeTeam.name}`;
    let celda2 = document.createElement("td");
    celda2.append(
      imgHome,
      `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`,
      imgAway
    );
    if (
      `${partidos[i].score.fullTime.homeTeam}-${partidos[i].score.fullTime.awayTeam}` ==
      "null-null"
    ) {
      celda2 = document.createElement("td");
      celda2.append(imgHome, "Prox", imgAway);
    }
    let celda3 = document.createElement("td");
    celda3.innerHTML = `${partidos[i].awayTeam.name}`;

    let celda4 = document.createElement("td");
    celda4.innerHTML = partidos[i].matchday;

    fila.append(celda1, celda2, celda3, celda4);
    tbody.append(fila);
  }
}

function selectEquipos(partidos) {
  let arrayEquipos = partidos.map(function (equipo) {
    return equipo.homeTeam.name;
  });
  let setEquipos = [...new Set(arrayEquipos)];

  for (let i = 0; i < setEquipos.length; i++) {
    let optionSelect = document.createElement("option");

    select.append(optionSelect);
    optionSelect.innerHTML = setEquipos[i];
  }
  console.log(setEquipos);
}

function filtros(partidos) {
  console.log(partidos);
  let arrayFiltrada = [];

  if (select.value == "Todos los equipos") {
    crearTabla(partidos);
    return;
  } else {
    arrayFiltrada = partidos.filter(
      (equipo) =>
        equipo.homeTeam.name == select.value ||
        equipo.awayTeam.name == select.value
    );
  }

  if (ganados.checked == true) {
    arrayFiltrada = arrayFiltrada.filter(
      (equipo) =>
        (equipo.homeTeam.name == select.value &&
          equipo.score.winner == "HOME_TEAM") ||
        (equipo.awayTeam.name == select.value &&
          equipo.score.winner == "AWAY_TEAM")
    );
  } else if (perdidos.checked == true) {
    arrayFiltrada = arrayFiltrada.filter(
      (equipo) =>
        (equipo.homeTeam.name == select.value &&
          equipo.score.winner == "AWAY_TEAM") ||
        (equipo.awayTeam.name == select.value &&
          equipo.score.winner == "HOME_TEAM")
    );
  } else if (empatados.checked == true) {
    arrayFiltrada = arrayFiltrada.filter(
      (equipo) => equipo.score.winner == "DRAW"
    );
  } else if (proximos.checked == true) {
    arrayFiltrada = arrayFiltrada.filter(
      (equipo) => equipo.status != "FINISHED"
    );
  }
  if (arrayFiltrada == "") {
    crearTabla(partidos);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay resultados para tu busqueda",
    });
  }
  crearTabla(arrayFiltrada);
}
window.onload = function () {
  loader.style.display = "none";
};
