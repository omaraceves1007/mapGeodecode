import { Component, OnInit } from '@angular/core';
import { GeodecodeService } from './geodecode.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  zoom: number = 15;
  lat: number = 19.380103;
  lng: number = -99.1790422;
  fo = {
    calle: '',
    ext: null,
    int: null,
    colonia: '',
    estado: '',
    cp: null,
    municipio: '',
    ref: '',
    lat: null,
    lng: null
  }
  forma: FormGroup;

  constructor( private fb: FormBuilder, private geodecode: GeodecodeService ) {
   }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.forma = this.fb.group({
      calle: new FormControl(this.fo.calle, []),
      ext: new FormControl(this.fo.ext, []),
      int: new FormControl(this.fo.int, []),
      colonia: new FormControl(this.fo.colonia, []),
      estado: new FormControl(this.fo.estado, []),
      cp: new FormControl(this.fo.cp, []),
      municipio: new FormControl(this.fo.municipio, []),
      ref: new FormControl(this.fo.ref, []),
      lat: new FormControl(this.fo.lat, []),
      lng: new FormControl(this.fo.lng, [])
    });
  }

  getLocation(){
    let data = this.forma.value;
    if(data.lat && data.lng) {
      this.lat = data.lat;
      this.lng = data.lng;
    } else {
      let address = `${data.calle} ${data.ext} ${data.int} ${data.colonia} ${data.estado} ${data.cp} ${data.municipio}`;
      this.geodecode.getLocation(address).subscribe((resp: [any]) => {
        if( resp.length === 1 ){
          this.lat = resp[0].geometry.location.lat;
          this.lng = resp[0].geometry.location.lng;
        }
      });
    }
  }

  getInfo(event: any){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    let latlng = `${this.lat},${this.lng}`;
    this.geodecode.getInfoLocation(latlng).subscribe((address: any) => {
      let adr = address.split(',');
      let cp = adr.length === 6 ? adr[3].slice(1,6) : adr[4].slice(1,6);
      let estado = adr.length === 6 ? adr[3].slice(7) : adr[4].slice(7);
      this.fo.calle = adr[0];
      this.fo.municipio = adr[2];
      this.fo.colonia = adr[1];
      this.fo.estado = estado;
      this.fo.cp = cp;
      this.fo.lat = this.lat;
      this.fo.lng = this.lng;
      this.createForm();
    });
  }


}

