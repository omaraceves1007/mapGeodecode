import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeodecodeService {

  constructor(private http: HttpClient) {}

  getLocation(address: string){
    // address = 'Jorge Jiménez Cantú, Carlos Hank Gonzalez, 56510 Los Reyes Acaquilpan, Méx.';
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.map}`;
    return this.http.get(url).pipe( map ( (resp: any) => resp.results ) );
  }
}
