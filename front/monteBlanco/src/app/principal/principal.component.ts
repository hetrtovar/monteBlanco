import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
arrayNoticias:Array<{imgNew : string,
  titulo : string, 
  autor: string, 
  descripcion: string}> =[];



  constructor(private http: ServicesService, private _snackBar: MatSnackBar,private router: Router) { 
    this.getNews();

  }


  ngOnInit(): void {
  }


  getNews(){
    console.log("metodo");
    this.arrayNoticias = [];
    this.http.getNews("us").subscribe(
      datos => {
        console.log(JSON.stringify(datos));
        var jsonRespuesta = JSON.parse(JSON.stringify(datos));
        //status":"success
        var arrayJson = jsonRespuesta.articles;
        for(var i = 0 ; i < arrayJson.length; i++){
            this.arrayNoticias.push({imgNew: arrayJson[i].urlToImage,titulo : arrayJson[i].title, autor: arrayJson[i].author, descripcion:arrayJson[i].description });
        }
  });
  

  }

}
