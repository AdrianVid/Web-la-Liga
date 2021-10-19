let tbody = document.getElementById("tbody");
console.log(data.matches);
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
        partido: 1,
      };
      arrEquipos.push(crearEquipo1);
    } else {
      equipoLocal.goles += partidos[i].score.fullTime.homeTeam;
      equipoLocal.partido++;
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
        partido: 1,
      };
      arrEquipos.push(crearEquipo2);
    } else {
      equipoVisitante.goles += partidos[i].score.fullTime.awayTeam;
      equipoVisitante.partido++;
    }
  }
  for (let j = 0; j < arrEquipos.length; j++) {
    arrEquipos[j].avg = arrEquipos[j].goles / arrEquipos[j].partido;
  }
  console.log(arrEquipos);
}

estadPartidos(data.matches);
