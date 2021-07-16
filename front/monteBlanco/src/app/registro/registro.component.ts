import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  jsonUsuario = {
    "nombre" : "",
    "email" : "",
    "pass" : "" 
};

  constructor(private http: ServicesService, private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }


  registrarUsuario(){
    console.log("metodo");
  if(this.validarDatos()){

    console.log("metodoq "+JSON.stringify(this.jsonUsuario));
    this.http.setUser(this.jsonUsuario).subscribe(
      datos => {
        console.log(JSON.stringify(datos));
        var jsonRespuesta = JSON.parse(JSON.stringify(datos));
        //status":"success
        if(jsonRespuesta.status === "success"){
            let data = jsonRespuesta.data;
          this.openSnackBar("Inicia sesión")
          this.router.navigate([""]);

        }else{
          this.openSnackBar("Error: intenta de nuevo");
        }
  });
  }

  }





  validarDatos(){
    
    if(this.jsonUsuario.nombre === ""){

      this.openSnackBar("Ingresa nombre");
      return false;
    }else if(this.jsonUsuario.email === ""){
      this.openSnackBar("Ingresa email");
      return false;
    }else if(this.jsonUsuario.pass === ""){

      this.openSnackBar("Ingresa contraseña");
      return false;
    }else{

      return true;
    }
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok', {
      duration: 1.5 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    }
}
