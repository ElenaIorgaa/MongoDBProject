function afiseazaVarsteleFolosindCursori() {
  var cursors = db.grupe.find({});
  cursors.forEach((group) => {
    group.studenti.forEach((student) => {
      const birthdate = student.detalii_personale.data_nastere;
      if (birthdate) {
        const today = new Date();
        const age = Math.floor(
          (today - birthdate) / (365.25 * 24 * 60 * 60 * 1000)
        );
        console.log(`Student: ${student.nume} ${student.prenume}, Age: ${age}`);
      } else {
        console.log(
          `Student: ${student.nume} ${student.prenume}, Birthdate not available`
        );
      }
    });
  });
}
function getStudentsWithCertainAgesUsingCursor(min, max) {
  var cursor = db.grupe.find({});

  while (cursor.hasNext()) {
    var group = cursor.next();

    group.studenti.forEach((student) => {
      const birthdate = student.detalii_personale.data_nastere;
      if (birthdate) {
        const today = new Date();
        const age = Math.floor(
          (today - birthdate) / (1000 * 60 * 60 * 24 * 365)
        );

        if (age >= min && age <= max) {
          printjson({
            nume: student.nume,
            prenume: student.prenume,
            varsta: age,
          });
        }
      }
    });
  }
}
function getStudentsWithCertainAges(min, max) {
  db.grupe
    .aggregate([
      {
        $unwind: "$studenti",
      },
      {
        $addFields: {
          varsta: {
            $floor: {
              $divide: [
                {
                  $subtract: [
                    new Date(),
                    "$studenti.detalii_personale.data_nastere",
                  ],
                },
                1000 * 60 * 60 * 24 * 365,
              ],
            },
          },
        },
      },
      {
        $match: {
          varsta: { $gte: min, $lte: max },
        },
      },
      {
        $project: {
          _id: 0,
          nume: "$studenti.nume",
          prenume: "$studenti.prenume",
          varsta: 1,
        },
      },
    ])
    .forEach(printjson);
}

function sortareSpectacoleDupaData() {
  var cursors = db.spectacole.aggregate([
    {
      $sort: { data: 1 },
    },
  ]);
  cursors.forEach(printjson);
}
function sortateSpectacoleData() {
  var cursors = db.spectacole.aggregate([
    {
      $project: {
        nume: 1,
        grupe: 1,
        yearDifference: {
          $subtract: [{ $year: "$data" }, { $year: new Date() }],
        },
      },
    },
    { $sort: { yearDifference: 1 } },
  ]);

  cursors.forEach(function (doc) {
    print("Nume spectacol: " + doc.nume);
    print("Grupe asociate: " + doc.grupe);
    print("Ani pana la spectacol: " + doc.yearDifference);
    print("---------------------");
  });
}

//pentru fiecare grupa afiseaza numarul si capacitatea salii in care este repartizata
function cautaInCeSaliSuntRepartizateGrupele() {
  var cursors = db.grupe.aggregate([
    {
      $lookup: {
        from: "sali",
        localField: "_id",
        foreignField: "grupe",
        as: "sali_repartizate",
      },
    },
    {
      $unwind: "$sali_repartizate",
    },
    {
      $group: {
        _id: "$_id",
        sali_repartizate: { $push: "$sali_repartizate" },
      },
    },
    {
      $project: {
        sali_repartizate: {
          numar_sala: "$sali_repartizate.numar_sala",
          capacitate: "$sali_repartizate.capacitate",
        },
      },
    },
  ]);
  cursors.forEach(printjson);
}

function afisarePaginataTotiStudentii(page, items_on_page) {
  var skipping = (page - 1) * items_on_page;
  db.grupe
    .aggregate([
      { $unwind: "$studenti" },
      { $skip: skipping },
      { $limit: items_on_page },
      { $project: { _id: 0, studenti: 1 } },
    ])
    .forEach(function (doc) {
      printjson(doc.studenti);
    });
}

function outputSpectacolGrupe() {
  db.spectacole
    .aggregate([
      {
        $lookup: {
          from: "grupe",
          localField: "grupe",
          foreignField: "_id",
          as: "grupe",
        },
      },
      {
        $project: {
          _id: 0,
          nume: 1,
          "grupe._id": 1,
        },
      },
    ])
    .forEach(function (doc) {
      print("Spectacol: " + doc.nume);
      doc.grupe.forEach(function (grupa) {
        print("Grupa: " + grupa._id);
      });
      print("---------------------");
    });
}
// cautaInCeSaliSuntRepartizateGrupele();
// afisarePaginataTotiStudentii(2, 3);
// getStudentsWithCertainAges(10, 15);
// sortateSpectacoleData();
// outputSpectacolGrupe();
// afiseazaVarsteleFolosindCursori();
// getStudentsWithCertainAgesUsingCursor(10, 15);

function checkGroupFitIntoSala(groupName) {
  const group = db.grupe.findOne({ _id: groupName });

  if (!group) {
    console.log(`Group "${groupName}" does not exist.`);
    return false;
  }

  const groupSize = group.studenti.length;

  const sali = db.sali.aggregate([
    {
      $match: { grupe: groupName },
    },
    {
      $project: {
        _id: 1,
        capacitate: 1,
        assignedStudents: {
          $size: {
            $ifNull: [
              {
                $filter: {
                  input: "$grupe",
                  as: "g",
                  cond: { $eq: ["$$g", groupName] },
                },
              },
              [],
            ],
          },
        },
      },
    },
  ]);

  sali.forEach((sala) => {
    const availableCapacity = sala.capacitate;
    print(availableCapacity);

    if (groupSize <= availableCapacity) {
      console.log(
        `Group "${groupName}" fits into Sala "${sala._id}", Available Capacity: ${availableCapacity}`
      );
    } else {
      console.log(
        `Group "${groupName}" does not fit into Sala "${sala._id}", Available Capacity: ${availableCapacity}`
      );
    }
  });
}
checkGroupFitIntoSala("Mica");
