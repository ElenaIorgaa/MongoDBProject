//cautare in documente, simpla
function gasesteGrupa(idGrupa) {
  var cursors = db.grupe.find({ _id: idGrupa });
  var numDocs = cursors.count();
  if (numDocs === 0) {
    print("Grupa nu a fost gasita");
  } else {
    cursors.forEach(printjson);
  }
}
function gasesteSalaDupaNumar(numarSala) {
  var cursors = db.sali.find({ numar_sala: numarSala });
  var numDocs = cursors.count();
  if (numDocs === 0) {
    print("Sala nu a fost gasita");
  } else {
    cursors.forEach(printjson);
  }
}
function gasesteSpectacolDupaNume(numeSpectacol) {
  var cursors = db.spectacole.find({ nume: numeSpectacol });
  if (cursors.count() === 0) {
    print("Spectacolul nu exista");
  } else {
    cursors.forEach(printjson);
  }
}
function gasesteGrupeleDinAnumitaSala(numarSala) {
  var cursors = db.sali.find({ numar_sala: numarSala }, { grupe: 1, _id: 0 });
  if (cursors.count() === 0) {
    print("Nu sunt grupe repartizate in aceasta sala");
  } else {
    cursors.forEach(printjson);
  }
}
function gasestePianistulSiInstructorulUneiGrupe(idGrupa) {
  var cursors = db.grupe.find(
    { _id: idGrupa },
    { instructor: 1, pianist: 2, _id: 0 }
  );
  if (cursors.count() === 0) {
    print("Nu s-au gasit");
  } else {
    cursors.forEach(printjson);
  }
}
function GasesteSalaCuOAnumitaCapacitateSiDimensiune(
  capacitateSala,
  lungimeSala,
  latimeSala
) {
  var cursors = db.sali.find({
    capacitate: capacitateSala,
    "dimensiune.latime": latimeSala,
    "dimensiune.lungime": lungimeSala,
  });
  if (cursors.count() === 0) {
    print("Nu s-a gasit nicio astfel de sala");
  } else {
    cursors.forEach(printjson);
  }
}
function gasestePianistiiCertificati() {
  var cursors = db.grupe.find({ "pianist.certificat": true });
  if (cursors.count() === 0) {
    print("Nu avem piniasti certificati");
  } else {
    cursors.forEach(printjson);
    print("S-au gasit " + cursors.count() + " pianisti certificati.");
  }
}
function gasesteInstructoriiCertificati(page, items_on_page) {
  var skipping = (page - 1) * items_on_page;
  var cursors = db.grupe
    .find({ "instructor.certificat": true })
    .skip(skipping)
    .limit(items_on_page);
  if (cursors.count() === 0) {
    print("Nu avem instructori certificati");
  } else {
    cursors.forEach(printjson);
    print("S-au gasit " + cursors.count() + " instructori certificati.");
  }
}

function gasesteLaCeSpectacoleParticipaOGrupa(idGrupa) {
  var cursors = db.spectacole.find({ grupe: idGrupa });
  if (cursors.count() === 0) {
    print("Nu participa la niciun spectacol");
  } else {
    cursors.forEach(printjson);
    print("Participa la " + cursors.count() + " spectacole.");
  }
}
//studenti nascuti inainte de anul nrAn sau a caror nume incepe cu N
function gasireaStudentilorNascutiInainteDeUnAnumitAnSauCareIncepCuOAnumitaLitera(
  nrAn
) {
  var cursors = db.grupe.find(
    {
      $or: [
        {
          "studenti.detalii_personale.data_nastere": {
            $lt: new Date(nrAn, 0, 1),
          },
        },
        { "studenti.nume": /^N/ },
      ],
    },
    { studenti: 1, _id: 0 }
  );
  if (cursors.count() === 0) {
    print("Nu au fost gasiti studenti nascuti inainte de anul " + nrAn);
  } else {
    cursors.forEach(printjson);
  }
}
function afisareaNumerelorDeTelefonFixe() {
  var cursors = db.grupe.find(
    {
      studenti: {
        $elemMatch: { "detalii_personale.numar_telefon": /^02/ },
      },
    },
    { "studenti.$": 1, _id: 0 }
  );
  if (cursors.count() === 0) {
    print("Niciun student nu are numar de telefon fix");
  } else {
    cursors.forEach(printjson);
  }
}
function selectareaSpectacolelorLaCareParticipaMaiMultDeNGrupe(nrGrupe) {
  var cursors = db.spectacole
    .find(
      {
        $expr: {
          $gte: [{ $size: "$grupe" }, nrGrupe],
        },
      },
      { _id: 0, nume: 1 }
    )
    .sort({ nume: 1 });
  if (cursors.count() === 0) {
    print("Niciun spectacol nu cuprinde mai mult de " + nrGrupe + " grupe");
  } else {
    print("Spectacole la care participa mai mult de " + nrGrupe + " grupe.");
    cursors.forEach(printjson);
  }
}

function selectareaStudentilorCareNuAuIntrodusNumarulDeTelefon() {
  var cursors = db.grupe.find(
    {
      "studenti.detalii_personale.numar_telefon": null,
    },
    {
      _id: 0,
      studenti: 1,
    }
  );
  if (cursors.count() === 0) {
    print("Toti studentii si-au completat numerele de telefon");
  } else {
    print("studentii care trebuie sa isi completeze nr de telefon");
    cursors.forEach(printjson);
  }
}
//afisare paginata a grupelor
function grupeAfisarePaginata(page, items_on_page) {
  var skipping = (page - 1) * items_on_page;
  db.grupe.find({}).skip(skipping).limit(items_on_page).forEach(printjson);
  // db.grupe.find({}).forEach(printjson);
}

function countSpectacoleForGrupa(groupName) {
  const grupa = db.grupe.findOne({ _id: groupName });

  if (!grupa) {
    console.log(`Grupa "${groupName}" does not exist.`);
    return 0;
  }

  const numSpectacole = db.spectacole.countDocuments({ grupe: groupName });

  console.log(
    `Grupa "${groupName}" participates in ${numSpectacole} spectacole.`
  );
  return numSpectacole;
}
countSpectacoleForGrupa("Mica");
//se doreste gasirea studentilor din toate grupele cu varste cuprinse intre 10 si 15 ani
// gasesteGrupa("Mica");
// gasesteSalaDupaNumar("AA");
// gasesteSpectacolDupaNume("Lalelele");
// gasesteGrupeleDinAnumitaSala("AA");
// gasestePianistulSiInstructorulUneiGrupe("Mica");
// GasesteSalaCuOAnumitaCapacitateSiDimensiune(10, 12, 10);
// gasestePianistiiCertificati();
// gasesteInstructoriiCertificati(1, 2);
// gasesteLaCeSpectacoleParticipaOGrupa("Mica");
// gasireaStudentilorNascutiInainteDeUnAnumitAn(2015);
// afisareaNumerelorDeTelefonFixe();
// selectareaSpectacolelorLaCareParticipaMaiMultDeNGrupe(1);

// //valori null
// selectareaStudentilorCareNuAuIntrodusNumarulDeTelefon();
// grupeAfisarePaginata(2, 1);
// print("----------------");
// afisarePaginataTotiStudentii(1, 1);
