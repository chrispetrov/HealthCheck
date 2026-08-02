import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';               // or HomeComponent
import { FetchData } from './fetch-data/fetch-data';
const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'fetch-data', component: FetchData }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
