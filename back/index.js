const express = require("express");
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
var mysql = require('mysql');
let jConexion = {
       host:"localhost",
       user:"root",
       password:"",
       database:"monteBlanco"
}

var conexion= mysql.createConnection(jConexion);
conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});



app.listen(3000, () => {
 console.log("API de prueba corriendo n el puerto 3000");
});


app.get('/', function (req, res) {
  res.send({"saludo" : 'Saludos desde API monte blanco'});
});


app.post('/login', function (req, res) {
    var email = req.body.email;
    var pass = req.body.pass;

        conexion.query("SELECT * FROM usuarios where email = '"+email+"';", function (err, result, fields) {
        if (err) {
          throw err;
        }
        else{
          console.log(result.length);
                    if(result.length == 0){
                          res.send({ "status" : "error user" });
                    }else{
                      if(result[0].passw == pass){
                          var json = {
                            "status" : "success",
                            "nombre": result[0].nombre,
                            "idUsuario": result[0].idUsuario
                          };
                        res.send(json);
                      }else{
                                res.send({ "status" : "error pass" });
                      }

                  }
        }
      });
});

app.post('/newUser', function (req, res) {
    var usuario = req.body.nombre;
    var pass = req.body.pass;
    var email = req.body.email;

    var sql = "INSERT INTO usuarios (nombre, email, passw) VALUES ?";
    var values = [
      [usuario, email,pass ]
    ];
    conexion.query(sql, [values], function (err, result) {
      if (err){
        console.log(err);
        var json = {
          "status" : "error"
        }
      res.send(json);
      }else{
        var json = {
          "status" : "success"
        }
      res.send(json);
      }
    });
});
