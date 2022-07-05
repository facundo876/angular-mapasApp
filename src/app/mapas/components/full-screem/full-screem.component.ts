import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screem',
  templateUrl: './full-screem.component.html',
  styles: [
    `
    #mapa {
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class FullScreemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    const map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });
  }

}
