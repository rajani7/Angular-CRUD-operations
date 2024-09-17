import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private _http: HttpClient) { }

  addHero(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/data', data);
  }

  updateHero(id: number, data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/data/${id}`, data);
  }

  getHeroes(): Observable<any>{
    return this._http.get('http://localhost:3000/data');
  }

  deleteHero(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/data/${id}`);
  }
}
