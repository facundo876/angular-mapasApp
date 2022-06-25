import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreemComponent } from './components/full-screem/full-screem.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fullscreen', component: FullScreemComponent },
      { path: 'zoom-range', component: ZoomRangeComponent },
      { path: 'marcadores', component: MarcadoresComponent },
      { path: 'propiedades', component: PropiedadesComponent },
      { path: '**', component: FullScreemComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
