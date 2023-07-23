const { group } = require("console");

function insertGrupe() {
  db.grupe.deleteMany({});
  db.grupe.insertMany([
    {
      _id: "Mica",
      instructor: {
        nume: "Popa",
        prenume: "Rodica",
        an_incepere: 2018,
        certificat: true,
      },
      pianist: {
        nume: "Radu",
        prenume: "Mirela",
        an_incepere: 2016,
        certificat: false,
      },
      studenti: [
        {
          nume: "Maria",
          prenume: "Elena",
          detalii_personale: {
            data_nastere: new Date("2015-03-15"),
            numar_telefon: "0745234345",
            cnp: "000",
          },
        },
      ],
    },
    {
      _id: "Mare",
      instructor: {
        nume: "Raducanu",
        prenume: "Maria",
        an_incepere: 2018,
        certificat: true,
      },
      pianist: {
        nume: "Ilie",
        prenume: "Marian",
        an_incepere: 2016,
        certificat: false,
      },
      studenti: [
        {
          nume: "Larisa",
          prenume: "Maria",
          detalii_personale: {
            data_nastere: new Date("2013-04-15"),
            numar_telefon: "0244444444",
            cnp: "111",
          },
        },
        {
          nume: "Capraru",
          prenume: "Ana",
          detalii_personale: {
            data_nastere: new Date("2012-08-11"),
            numar_telefon: "0722333234",
            cnp: "222",
          },
        },
      ],
    },
    {
      _id: "Mijlocie",
      instructor: {
        nume: "Ionescu",
        prenume: "Iralia",
        an_incepere: 2015,
        certificat: true,
      },
      pianist: {
        nume: "Morar",
        prenume: "Anca",
        an_incepere: 2014,
        certificat: false,
      },
      studenti: [
        {
          nume: "Pop",
          prenume: "Maria",
          detalii_personale: {
            data_nastere: new Date("2014-07-15"),
            numar_telefon: null,
            cnp: "555",
          },
        },
        {
          nume: "Cana",
          prenume: "Ana",
          detalii_personale: {
            data_nastere: new Date("2011-06-11"),
            numar_telefon: null,
            cnp: "666",
          },
        },
        {
          nume: "Mincu",
          prenume: "Larisa",
          detalii_personale: {
            data_nastere: new Date("2010-09-15"),
            numar_telefon: "0755555555",
            cnp: "777",
          },
        },
      ],
    },
  ]);
  var myCursor = db.grupe.find();
  myCursor.forEach(printjson);
}
function insertSali() {
  db.sali.deleteMany({});
  db.sali.insertMany([
    {
      dimensiune: { latime: 10, lungime: 12 },
      capacitate: 10,
      numar_sala: "AA",
      grupe: ["Mica", "Mare"],
    },
    {
      dimensiune: { latime: 20, lungime: 25 },
      capacitate: 15,
      numar_sala: "BB",
      grupe: ["Mijlocie"],
    },
    {
      dimensiune: { latime: 13, lungime: 13 },
      capacitate: 17,
      numar_sala: "CC",
      grupe: [],
    },
  ]);
  var myCursor = db.sali.find();
  myCursor.forEach(printjson);
}
function insertSpectacole() {
  const { Binary } = require("mongodb");
  var fs = require("fs");
  const thumbnail = fs.readFileSync(
    "C:\\Users\\eiorg\\Desktop\\ProiectECBD\\download.jpg"
  );
  db.spectacole.deleteMany({});
  db.spectacole.insertMany([
    {
      nume: "Dansand printre stele",
      grupe: ["Mare", "Mijlocie"],
      data: new Date("2023-09-15"),
    },
    {
      nume: "Primavara",
      grupe: ["Mare"],
      data: new Date("2024-09-8"),
    },
    {
      nume: "Ghioceii",
      grupe: ["Mica"],
      data: new Date("2023-02-14"),
    },
    {
      nume: "Vara",
      grupe: ["Mica", "Mijlocie"],
      data: new Date("2018-09-15"),
    },
  ]);
  var myCursor = db.spectacole.find();
  myCursor.forEach(printjson);
}
function updateDataSpectacol(numeSpectacol, noua_data) {
  db.spectacole.updateOne(
    { nume: numeSpectacol },
    { $set: { data: new Date(noua_data) } }
  );
  var myCursor = db.spectacole.find({ nume: numeSpectacol });
  myCursor.forEach(printjson);
}
function updateNumeInstructor(numeNow, idGrupa) {
  db.grupe.updateOne(
    { _id: idGrupa },
    {
      $set: { "instructor.nume": numeNow },
    }
  );
  var myCursor = db.grupe.find({ _id: idGrupa });
  myCursor.forEach(printjson);
}
function changeInstructor(newNume, newPrenume, newAn, certificare, idGrupa) {
  db.grupe.updateOne(
    { _id: idGrupa },
    {
      $set: {
        instructor: {
          nume: newNume,
          prenume: newPrenume,
          an_incepere: newAn,
          certificat: certificare,
        },
      },
    }
  );
  var myCursor = db.grupe.find({ _id: idGrupa });
  myCursor.forEach(printjson);
}
function changePianist(newNume, newPrenume, newAn, certificare, idGrupa) {
  db.grupe.updateOne(
    { _id: idGrupa },
    {
      $set: {
        pianist: {
          nume: newNume,
          prenume: newPrenume,
          an_incepere: newAn,
          certificat: certificare,
        },
      },
    }
  );
  var myCursor = db.grupe.find({ _id: idGrupa });
  myCursor.forEach(printjson);
}
function addStudent(
  numeStudent,
  prenume,
  dataNastere,
  numarTelefon,
  idGrupa,
  cnps
) {
  db.grupe.updateOne(
    { _id: idGrupa },
    {
      $push: {
        studenti: {
          nume: numeStudent,
          prenume: prenume,
          detalii_personale: {
            data_nastere: new Date(dataNastere),
            numar_telefon: numarTelefon,
            cnp: cnps,
          },
        },
      },
    }
  );
  var cursor = db.grupe.find({ _id: idGrupa });
  cursor.forEach(printjson);
}
function schimbaNumarTelefonStudent(numeStudent, idGrupa, newTelefon) {
  db.grupe.updateOne(
    { _id: idGrupa, "studenti.nume": numeStudent },
    {
      $set: {
        "studenti.$.detalii_personale.numar_telefon": newTelefon,
      },
    }
  );
  var myCursor = db.grupe.find({ _id: idGrupa, "studenti.nume": numeStudent });
  myCursor.forEach(printjson);
}
function asigneazaSalaUneiGrupe(idGrupa, numarSala) {
  db.sali.updateOne(
    { numar_sala: numarSala },
    {
      $push: {
        grupe: idGrupa,
      },
    }
  );
  var cursor = db.sali.find({ numar_sala: numarSala });
  cursor.forEach(printjson);
}
function schimbaNumeleSpectacolului(oldName, newName) {
  db.spectacole.updateOne(
    { nume: oldName },
    {
      $set: {
        nume: newName,
      },
    }
  );
  var cursor = db.spectacole.find({ nume: newName });
  cursor.forEach(printjson);
}
function schimbaDataSpectacolului(numeSpectacol, newDate) {
  db.spectacole.updateOne(
    { nume: numeSpectacol },
    {
      $set: {
        data: new Date(newDate),
      },
    }
  );
  var cursor = db.spectacole.find({ nume: numeSpectacol });
  cursor.forEach(printjson);
}
function adaugaGrupaLaSpectacol(idGrupa, numeSpectacol) {
  db.spectacole.updateOne(
    { nume: numeSpectacol },
    {
      $push: {
        grupe: idGrupa,
      },
    }
  );
  var cursor = db.spectacole.find({ nume: numeSpectacol });
  cursor.forEach(printjson);
}
function scoateGrupaDinSpectacol(idGrupa, numeSpectacol) {
  db.spectacole.updateOne(
    { nume: numeSpectacol },
    {
      $pull: {
        grupe: idGrupa,
      },
    }
  );
  var cursor = db.spectacole.find({ nume: numeSpectacol });
  cursor.forEach(printjson);
}
function scoateGrupaDinSala(idGrupa, numeSala) {
  db.sali.updateOne(
    { numar_sala: numeSala },
    {
      $pull: {
        grupe: idGrupa,
      },
    }
  );
  var cursor = db.sali.find({ numar_sala: numeSala });
  cursor.forEach(printjson);
}
function scoateStudent(cnps, idGrupa) {
  db.grupe.updateOne(
    { _id: idGrupa },
    {
      $pull: {
        studenti: { "detalii_personale.cnp": cnps },
      },
    }
  );
  var cursor = db.grupe.find({ _id: idGrupa });
  cursor.forEach(printjson);
}
//inserturi multiple
insertGrupe();
insertSali();
insertSpectacole();

//update-uri diferite campuri
updateDataSpectacol("Vara", "2017-08-05");
updateNumeInstructor("Nelu", "Mica");
changeInstructor("NNelu", "Rrodica", 2000, true, "Mica");
changePianist("NNNelu", "RRrodica", 2002, false, "Mica");
addStudent("N", "P", "2024-09-8", "0345222444", "Mica", "99999");
schimbaNumarTelefonStudent("N", "Mica", "0999999998");
asigneazaSalaUneiGrupe("Mica", "CC");
schimbaNumeleSpectacolului("Vara", "Iarna");
schimbaDataSpectacolului("Iarna", "2023-03-23");
adaugaGrupaLaSpectacol("Mare", "Iarna");

//stergere diferite campuri
scoateGrupaDinSpectacol("Mare", "Iarna");
scoateGrupaDinSala("Mica", "CC");
scoateStudent("99999", "Mica");

//operatii de tip bulk
//prin operatii de tip bulk vrem ca toti instructorii sa ii facem certificati
//si sa mai adaugam 2 grupe
function bulkActualizareCertificareSiAdaugareGrupe() {
  db.grupe.bulkWrite([
    {
      updateMany: {
        filter: { "instructor.certificat": false },
        update: { $set: { "instructor.certificat": true } },
      },
    },
    {
      updateMany: {
        filter: { "pianist.certificat": false },
        update: { $set: { "pianist.certificat": true } },
      },
    },
    {
      insertOne: {
        _id: "Avansati",
        instructor: {
          nume: "instructAvansat",
          prenume: "prenume",
          an_incepere: 2000,
          certificat: true,
        },
        pianist: {
          nume: "pianistAvansat",
          prenume: "prenume",
          an_incepere: 2000,
          certificat: true,
        },
        studenti: [],
      },
    },
    {
      insertOne: {
        _id: "SLABI",
        instructor: {
          nume: "SLABINSTR",
          prenume: "prenume",
          an_incepere: 2000,
          certificat: false,
        },
        pianist: {
          nume: "SLABPIAN",
          prenume: "prenume",
          an_incepere: 2000,
          certificat: false,
        },
        studenti: [
          {
            nume: "NewStud",
            prenume: "newPred",
            detalii_personale: {
              data_nastere: new Date("2018-06-22"),
              numar_telefon: "0766666666",
              cnp: "666",
            },
          },
        ],
      },
    },
  ]);
  var cursor = db.grupe.find({});
  cursor.forEach(printjson);
}

bulkActualizareCertificareSiAdaugareGrupe();

function bulkActualizareSpectacoleAdaugareSiStergereGrupe(
  numeSpectacolVechi,
  numeSpectacolNou,
  numeSpectacolDeSters,
  numeSpectacolDeInlocuit
) {
  db.spectacole.bulkWrite([
    {
      updateOne: {
        filter: { nume: numeSpectacolVechi },
        update: { $set: { nume: numeSpectacolNou } },
      },
    },
    {
      insertOne: {
        nume: "Noul spectacol",
        grupe: ["Mica", "Mijlocie"],
        data: new Date("2023-09-15"),
      },
    },
    {
      deleteOne: {
        filter: { nume: numeSpectacolDeSters },
      },
    },
    {
      replaceOne: {
        filter: { nume: numeSpectacolDeInlocuit },
        replacement: {
          nume: "NoulNumeInlocuit",
          data: new Date("2030-01-01"),
          grupe: [],
        },
      },
    },
  ]);
  var cursor = db.spectacole.find({});
  cursor.forEach(printjson);
}
bulkActualizareSpectacoleAdaugareSiStergereGrupe(
  "Ghioceii",
  "Lalelele",
  "Iarna",
  "Dansand printre stele"
);
