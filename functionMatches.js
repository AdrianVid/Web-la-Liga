let tabla = document.getElementById("tabla");
let thead = document.getElementById("thead");
let tbody = document.getElementById("tbody");

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
      celda2.innerHTML = "Partido no jugado";
    }
    let celda3 = document.createElement("td");
    celda3.innerHTML = `${partidos[i].awayTeam.name}`;

    let celda4 = document.createElement("td");
    celda4.innerHTML = partidos[i].matchday;

    fila.append(celda1, celda2, celda3, celda4);
    tbody.append(fila);
  }
}
crearTabla(data.matches);

let partidos = data.matches;
let select = document.getElementById("select");
let botonBuscar = document.getElementById("buscar");
let ganar = document.getElementById("ganados");
let perder = document.getElementById("perdidos");
let empate = document.getElementById("empatados");
let proximos = document.getElementById("no-jugados");

botonBuscar.addEventListener("click", function () {
  tbody.innerHTML = "";
  /* else if (
      inputFiltro.value !== partidos[i].homeTeam.name ||
      inputFiltro.value !== partidos[i].awayTeam.name
    ) {
      tbody.innerHTML =
        "Tienes que introducir el nombre del equipo correctamente";
    }  else
 
  if (inputFiltro.value === "") {
      tbody.innerHTML = "Tienes que introducir el nombre de un equipo";
    }*/

  for (let i = 0; i < partidos.length; i++) {
    if (
      select.value === partidos[i].homeTeam.name ||
      (select.value === partidos[i].awayTeam.name &&
        ganar.checked === false &&
        perder.checked === false &&
        empate.checked === false &&
        proximos.checked === false)
      //Partidos finalizados cada equipo
    ) {
      if (partidos[i].status === "FINISHED") {
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

        let celda3 = document.createElement("td");
        celda3.innerHTML = `${partidos[i].awayTeam.name}`;

        let celda4 = document.createElement("td");
        celda4.innerHTML = partidos[i].matchday;

        fila.append(celda1, celda2, celda3, celda4);
        tbody.append(fila);
      }
    }
    // Ganados por cada equipo
    else if (
      ganar.checked === true &&
      ((select.value === partidos[i].homeTeam.name &&
        partidos[i].score.winner === "HOME_TEAM") ||
        (select.value === partidos[i].awayTeam.name &&
          partidos[i].score.winner === "AWAY_TEAM"))
    ) {
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

      let celda3 = document.createElement("td");
      celda3.innerHTML = `${partidos[i].awayTeam.name}`;

      let celda4 = document.createElement("td");
      celda4.innerHTML = partidos[i].matchday;

      fila.append(celda1, celda2, celda3, celda4);
      tbody.append(fila);
    }
    //Perdidos por cada equipo
    else if (
      perder.checked === true &&
      ((select.value === partidos[i].homeTeam.name &&
        partidos[i].score.winner === "AWAY_TEAM") ||
        (select.value === partidos[i].awayTeam.name &&
          partidos[i].score.winner === "HOME_TEAM"))
    ) {
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

      let celda3 = document.createElement("td");
      celda3.innerHTML = `${partidos[i].awayTeam.name}`;

      let celda4 = document.createElement("td");
      celda4.innerHTML = partidos[i].matchday;

      fila.append(celda1, celda2, celda3, celda4);
      tbody.append(fila);
    }
    //Empates por cada equipo
    else if (
      empate.checked === true &&
      ((select.value === partidos[i].homeTeam.name &&
        partidos[i].score.winner === "DRAW") ||
        (select.value === partidos[i].awayTeam.name &&
          partidos[i].score.winner === "DRAW"))
    ) {
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
      let celda3 = document.createElement("td");
      celda3.innerHTML = `${partidos[i].awayTeam.name}`;

      let celda4 = document.createElement("td");
      celda4.innerHTML = partidos[i].matchday;

      fila.append(celda1, celda2, celda3, celda4);
      tbody.append(fila);
    }
    //Proximos partidos por cada equipo
    else if (
      proximos.checked === true &&
      ((select.value === partidos[i].homeTeam.name &&
        partidos[i].status !== "FINISHED") ||
        (select.value === partidos[i].awayTeam.name &&
          partidos[i].status !== "FINISHED"))
    ) {
      let fila = document.createElement("tr");
      let imgHome = document.createElement("img");
      imgHome.src = `https://crests.football-data.org/${partidos[i].homeTeam.id}.svg`;

      let imgAway = document.createElement("img");
      imgAway.src = `https://crests.football-data.org/${partidos[i].awayTeam.id}.svg`;
      let celda1 = document.createElement("td");
      celda1.innerHTML = `${partidos[i].homeTeam.name}`;

      let celda2 = document.createElement("td");
      celda2.append(imgHome, "Partido no jugado", imgAway);

      let celda3 = document.createElement("td");
      celda3.innerHTML = `${partidos[i].awayTeam.name}`;

      let celda4 = document.createElement("td");
      celda4.innerHTML = partidos[i].matchday;

      fila.append(celda1, celda2, celda3, celda4);
      tbody.append(fila);
      console.log(partidos[i]);
    }
  }
});
