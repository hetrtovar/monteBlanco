import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  rutaApi = "http://localhost:3000";
  rutanews = "https://newsapi.org/v2/top-headlines?country=";
  token = "3da1b36bc1584e948ca8dd6b5169416c";
  constructor(private http: HttpClient) { }

  getSaludo() {
    return this.http.get(`${this.rutaApi}/saludo`);
  }
  setUser(json :any) {
    return this.http.post(`${this.rutaApi}/newUser`,json);
  }
  login(json :any) {
    return this.http.post(`${this.rutaApi}/login`,json);
  }

  getNews(country:string){
    let rutaFinal = this.rutanews+country+"&category=business&apiKey="+this.token;
    console.log(rutaFinal);
    return this.http.get(`${rutaFinal}`);
  }



}
