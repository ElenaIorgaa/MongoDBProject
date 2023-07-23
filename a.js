function createSchemaGrupe() {
  //   var collectionName = "grupe";
  //   if (!db.getCollectionNames().include(collectionName)) {
  db.createCollection("grupe", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "instructor", "pianist", "studenti"],
        properties: {
          _id: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          instructor: {
            bsonType: "object",
            required: ["nume", "prenume", "an_incepere", "certificat"],
            properties: {
              nume: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              prenume: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              an_incepere: {
                bsonType: "int",
                description: "must be an integer and is required",
              },
              certificat: {
                bsonType: "bool",
                description: "must be a boolean and is required",
              },
            },
          },
          pianist: {
            bsonType: "object",
            required: ["nume", "prenume", "an_incepere"],
            properties: {
              nume: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              prenume: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              an_incepere: {
                bsonType: "int",
                description: "must be an integer and is required",
              },
              certificat: {
                bsonType: ["bool", null],
                description: "must be a boolean or null",
              },
            },
          },
          studenti: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["nume", "prenume", "detalii_personale"],
              properties: {
                nume: {
                  bsonType: "string",
                  description: "must be a string and is required",
                },
                prenume: {
                  bsonType: "string",
                  description: "must be a string and is required",
                },
                detalii_personale: {
                  bsonType: "object",
                  required: ["data_nastere", "cnp"],
                  properties: {
                    data_nastere: {
                      bsonType: "date",
                      description: "must be a date and is required",
                    },
                    numar_telefon: {
                      bsonType: ["string", "null"],
                      description: "must be a string or null",
                      pattern: "^0[0-9]{9}$",
                    },
                    cnp: {
                      bsonType: "string",
                      description: "must be a string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
// }
function createSchemaSali() {
  //   var collectionName = "sali";
  //   if (!db.getCollectionNames().include(collectionName)) {
  db.createCollection("sali", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["dimensiune", "capacitate", "grupe", "numar_sala"],
        properties: {
          dimensiune: {
            bsonType: "object",
            required: ["latime", "lungime"],
            properties: {
              latime: {
                bsonType: "int",
                description: "must be an integer and is required",
              },
              lungime: {
                bsonType: "int",
                description: "must be an integer and is required",
              },
            },
          },
          capacitate: {
            bsonType: "int",
            description: "must be an integer and is required",
          },
          grupe: {
            bsonType: "array",
            items: {
              bsonType: "string",
              description: "must be a string",
            },
          },
          numar_sala: {
            bsonType: "string",
            description: "must be a string",
          },
        },
      },
    },
  });
}
// }
function createSchemaSpectacole() {
  //   var collectionName = "spectacole";
  //   if (!db.getCollectionNames().include(collectionName)) {
  db.createCollection("spectacole", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nume", "grupe", "data"],
        properties: {
          nume: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          grupe: {
            bsonType: "array",
            items: {
              bsonType: "string",
              description: "must be a string",
            },
          },
          data: {
            bsonType: "date",
            description: "must be a date and is required",
          },
        },
      },
    },
  });
}
// }
createSchemaGrupe();
createSchemaSali();
createSchemaSpectacole();
