let tabla = document.getElementById("tabla");
let thead = document.getElementById("thead");
let tbody = document.getElementById("tbody");

function crearTabla(partidos) {
  for (let i = 0; i < partidos.length; i++) {
    let fila = document.createElement("tr");
    let imgHome = document.createElement("img");
    imgHome.setAttribute(
      "src",
      `https://crests.football-data.org/${partidos[i].homeTeam.id}.svg`
    );
    let imgAway = document.createElement("img");
    imgAway.setAttribute(
      "src",
      `https://crests.football-data.org/${partidos[i].awayTeam.id}.svg`
    );

    let celda1 = document.createElement("td");
    celda1.innerHTML = `${partidos[i].homeTeam.name}`;

    let celda2 = document.createElement("td");
    celda2.innerHTML = `${partidos[i].score.fullTime.homeTeam}-${partidos[i].score.fullTime.awayTeam}`;

    if (
      `${partidos[i].score.fullTime.homeTeam}-${partidos[i].score.fullTime.awayTeam}` ==
      "null-null"
    ) {
      celda2.innerHTML = "Partido no jugado";
    }

    let celda3 = document.createElement("td");
    celda3.innerHTML = `${partidos[i].awayTeam.name}`;

    let celda4 = document.createElement("td");
    celda4.innerHTML = partidos[i].matchday;

    celda1.append(imgHome);
    celda2.append(imgAway);
    fila.append(celda1, celda2, celda3, celda4);
    tbody.append(fila);
  }
}

crearTabla(data.matches);
console.log(data.matches);
