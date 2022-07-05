import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface marcadorColor{
  color: string,
  marcador?: mapboxgl.Marker,
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-74.5, 40];
  marcadores: marcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.leerMarcadoresLocalStorage()
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marcador: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });
  }



  irMarcador( marcador: mapboxgl.Marker ){

    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr: marcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color
      const { lng, lat } = m.marcador!.getLngLat();

      lngLatArr.push({
        color,
        centro: [lng, lat]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

  }

  leerMarcadoresLocalStorage(){

    if( !localStorage.getItem('marcadores') ){
      return;
    }

    const lngLatArr: marcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {

      const nuevoMarcador = new mapboxgl.Marker({
        draggable: true,
        color: m.color
      })
        .setLngLat( m.centro! )
        .addTo(this.mapa);

      this.marcadores.push({
        marcador: nuevoMarcador,
        color: m.color
      });

      nuevoMarcador.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });

    });

  }

  borrarMarcado( i: number ){
    this.marcadores[i].marcador?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

}
