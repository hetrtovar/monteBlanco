import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  jsonLogin = {
    "email" : "",
    "pass" : "" 
};

  constructor(private http: ServicesService,private router: Router, private _snackBar: MatSnackBar) { }




  logIn(){
    if(this.jsonLogin.email === "" || this.jsonLogin.pass === ""){
      this.openSnackBar("llena los campos");
    }else{
        
        this.http.login(this.jsonLogin).subscribe(
          datos => {
            console.log(JSON.stringify(datos));
            var jsonRespuesta = JSON.parse(JSON.stringify(datos));
            if(jsonRespuesta.status === "success"){
                
              this.openSnackBar("Bienvenido "+jsonRespuesta.nombre)
              this.router.navigate(["/home"]);

            }else{
              this.openSnackBar("Error: cuenta no encontrada");
            }
      });
    }


  }



  ngOnInit(): void {
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok', {
      duration: 1.5 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    }
}
