let api = "46626f00e951432da448118605114abb";
let url = "https://api.football-data.org/v2/competitions/2014/matches";

window.onload = function load() {
  loader.style.display = "none";
};

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
  estadPartidos(data.matches);
  partidosVisitantes(data.matches);
  load();
}

function estadPartidos(partidos) {
  let arrEquipos = [];

  for (let i = 0; i < partidos.length; i++) {
    if (partidos[i].status !== "FINISHED") {
      continue;
    }
    let equipoLocal = arrEquipos.find(function (equipo) {
      if (partidos[i].homeTeam.id === equipo.id) {
        return true;
      } else {
        return false;
      }
    });
    if (equipoLocal == undefined) {
      let crearEquipo1 = {
        id: partidos[i].homeTeam.id,
        nombre: partidos[i].homeTeam.name,
        goles: partidos[i].score.fullTime.homeTeam,
        partidos: 1,
      };
      arrEquipos.push(crearEquipo1);
    } else {
      equipoLocal.goles += partidos[i].score.fullTime.homeTeam;
      equipoLocal.partidos++;
    }

    let equipoVisitante = arrEquipos.find(function (equipo) {
      if (partidos[i].awayTeam.id === equipo.id) {
        return true;
      } else {
        return false;
      }
    });
    if (equipoVisitante == undefined) {
      let crearEquipo2 = {
        id: partidos[i].awayTeam.id,
        nombre: partidos[i].awayTeam.name,
        goles: partidos[i].score.fullTime.awayTeam,
        partidos: 1,
      };
      arrEquipos.push(crearEquipo2);
    } else {
      equipoVisitante.goles += partidos[i].score.fullTime.awayTeam;
      equipoVisitante.partidos++;
    }

    for (let j = 0; j < arrEquipos.length; j++) {
      arrEquipos[j].avg = arrEquipos[j].goles / arrEquipos[j].partidos;
    }
  }
  ordenaravg(arrEquipos);
  crearTablaAvg(arrEquipos);
}

function ordenaravg(arrEquipos) {
  arrEquipos.sort(function (b, a) {
    if (a.avg > b.avg) {
      return 1;
    }
    if (a.avg < b.avg) {
      return -1;
    }
    return 0;
  });
}

function crearTablaAvg(array) {
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < array.length; i++) {
    if (i == 5) {
      break;
    }
    let fila = document.createElement("tr");
    let escudo = document.createElement("img");
    escudo.src = `https://crests.football-data.org/${array[i].id}.svg`;

    let celda1 = document.createElement("td");
    celda1.append(escudo, `${array[i].nombre}`);
    let celda2 = document.createElement("td");
    celda2.innerHTML = array[i].goles;
    let celda3 = document.createElement("td");
    celda3.innerHTML = array[i].partidos;
    let celda4 = document.createElement("td");
    celda4.innerHTML = array[i].avg.toFixed(2);

    fila.append(celda1, celda2, celda3, celda4);
    tbody.append(fila);
  }
}

function partidosVisitantes(partidos) {
  let visitantes = [];

  for (let i = 0; i < partidos.length; i++) {
    if (partidos[i].status !== "FINISHED") {
      continue;
    }
    let equipoAway = visitantes.find(function (awayTeam) {
      if (partidos[i].awayTeam.id === awayTeam.id) {
        return true;
      } else {
        return false;
      }
    });
    if (equipoAway === undefined) {
      let crearEquipo3 = {
        id: partidos[i].awayTeam.id,
        nombre: partidos[i].awayTeam.name,
        golesEnContra: partidos[i].score.fullTime.homeTeam,
        partidosVis: 1,
      };
      visitantes.push(crearEquipo3);
    } else {
      equipoAway.golesEnContra += partidos[i].score.fullTime.homeTeam;
      equipoAway.partidosVis++;
    }
  }
  ordenarVis(visitantes);
  crearTablaVis(visitantes);
}

function ordenarVis(visitantes) {
  visitantes.sort(function (a, b) {
    if (a.golesEnContra > b.golesEnContra) {
      return 1;
    }
    if (a.golesEnContra < b.golesEnContra) {
      return -1;
    }
    return 0;
  });
}

function crearTablaVis(array2) {
  let tbody2 = document.getElementById("tbody2");
  for (let i = 0; i < array2.length; i++) {
    if (i == 5) {
      break;
    }
    let fila = document.createElement("tr");
    let escudo = document.createElement("img");
    escudo.src = `https://crests.football-data.org/${array2[i].id}.svg`;

    let celda1 = document.createElement("td");
    celda1.append(escudo, `${array2[i].nombre}`);
    let celda2 = document.createElement("td");
    celda2.innerHTML = array2[i].golesEnContra;
    let celda3 = document.createElement("td");
    celda3.innerHTML = array2[i].partidosVis;

    fila.append(celda1, celda2, celda3);
    tbody2.append(fila);
  }
}
