console.log(standings.standings[0].table);

let tbody = document.getElementById("tbody");

function crearTabla(clasificacion) {
  for (let i = 0; i < clasificacion.length; i++) {
    let fila = document.createElement("tr");
    let img = document.createElement("img");
    img.setAttribute("src", clasificacion[i].team.crestUrl);
    let array = [
      clasificacion[i].position,
      img + clasificacion[i].team.name,
      clasificacion[i].playedGames,
      clasificacion[i].won,
      clasificacion[i].draw,
      clasificacion[i].lost,
      clasificacion[i].goalsFor,
      clasificacion[i].goalsAgainst,
      clasificacion[i].goalDifference,
      clasificacion[i].points,
    ];
    for (let j = 0; j < array.length; j++) {
      let celda = document.createElement("td");

      celda.innerHTML = array[j];
      celda.append(img);
      fila.append(celda);
    }
    tbody.append(fila);
  }
}
crearTabla(standings.standings[0].table);
