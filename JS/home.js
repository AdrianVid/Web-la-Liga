let api = "46626f00e951432da448118605114abb";
let url = "https://api.football-data.org/v2/competitions/2014/matches";

fetch(url, {
  method: "GET",
  headers: {
    "X-Auth-Token": "46626f00e951432da448118605114abb",
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
  let listaEquipos = partidos.map(function (equipo) {
    return equipo.homeTeam.name;
  });
  let setEquipos = [...new Set(listaEquipos)];

  for (let i = 0; i < setEquipos.length; i++) {
    let optionSelect = document.createElement("div");
    row.append(optionSelect);
    optionSelect.innerHTML = setEquipos[i];
  }
  console.log(setEquipos);
}
