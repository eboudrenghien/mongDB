const  MongoClient = require('mongodb').MongoClient
const assert = require ('assert')


const url = 'mongodb+srv://eboudrenghien:animauxDB@cluster0.dcu2m.mongodb.net/baseDeDonneesAnimaux?retryWrites=true&w=majority'

const dbName = 'animauxDB'

const client = new MongoClient(url, { useNewUrlParser: true})

client.connect((err) => {
    assert.equal(null, err)
    console.log("La connexion au serveur est un succès");

    const db = client.db(dbName)

    insertDocuments( db, function () {
        client.close()
    })
})

 const insertDocuments = (db, callback) => {

    const collection = db.collection('animaux')

    collection.insertMany ([
        {
            nom : "Panda Géant", 
            nombres : 1864,
            habitat: "Chine"
        },
        {
            nom : "Tigre, Roi de la jungle", 
            nombres : 3890,
            habitat: "Himalaya jusqu'au Sud-Est de l'Asie continentale, en Inde, sur l'île de Sumatra, en Chine et à l'Est de la Russie"
        },
        {
            nom : "L'ours polaire, Seigneur de la banquise", 
            nombres : 20000,
            habitat: "Dans la région Arctique"
        },
        {
            nom : "La Panthère des neiges, Fantôme des montagnes", 
            nombres : 4000,
            habitat: "Chine, Bhoutan, Népal, Inde, Pakistan, Afghanistan, Tadjikistan, Ouzbékistan, Kirghiszistan, Kazakhstan, Russie et Mongolie"
        }
    ], 
        (err, result) => {
        assert.equal(err, null)
        assert.equal(4, result.result.n)
        assert.equal(4, result.ops.lenght)
        console.log("Insertion 4 documents dans la collection");
        callback(result)
        }
    )
 }