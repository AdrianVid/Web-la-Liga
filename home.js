let api = "46626f00e951432da448118605114abb";
let url = "https://api.football-data.org/v2/competitions/2014/matches";

fetch(url, {
  method: "GET",
  headers: {
    "X-Auth-Token": api,
  },
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    init(data);
  })
  .catch(function (err) {
    console.log(err);
  });
function init(data) {
  equipos(data.matches);
}

function equipos(partidos) {
  let equiposLiga = [];
  for (let i = 0; i < partidos.length; i++) {
    listaEquipos(equiposLiga);
  }
}

function listaEquipos(lista) {
  let row = document.getElementById("row");
  for (let j = 0; j < lista.lenght; j++) {
    let escudo = document.createElement("img");
    escudo.src = `https://crests.football-data.org/${lista[j].id}.svg`;

    let equipo = document.createElement("div");
    equipo.append(escudo, `${lista[j].nombre}`);

    row.append(equipo);
  }
}
