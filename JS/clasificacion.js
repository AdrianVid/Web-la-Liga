let api = "46626f00e951432da448118605114abb";
let url = "https://api.football-data.org/v2/competitions/2014/standings";
let tbody = document.getElementById("tbody");
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
  .then(function (stand) {
    init(stand);
    console.log(stand);
  })
  .catch(function (err) {
    console.log(err);
  });
function init(stand) {
  clasificaciones = stand.standings;
  crearTabla(stand.standings[0].table);
  loader.style.display = "none";
}

function crearTabla(clasificacion) {
  for (let i = 0; i < clasificacion.length; i++) {
    let fila = document.createElement("tr");
    let img = document.createElement("img");
    img.src = clasificacion[i].team.crestUrl;

    let array = [
      clasificacion[i].position,
      img,
      clasificacion[i].team.name,
      clasificacion[i].points,
      clasificacion[i].playedGames,
      clasificacion[i].won,
      clasificacion[i].draw,
      clasificacion[i].lost,
      clasificacion[i].goalsFor,
      clasificacion[i].goalsAgainst,
      clasificacion[i].goalDifference,
    ];
    for (let j = 0; j < array.length; j++) {
      let celda = document.createElement("td");

      celda.append(array[j]);

      fila.append(celda);
    }
    tbody.append(fila);
  }
}
