import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectTeamsComponent } from './pages/select-teams/select-teams.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TossComponent } from './toss/toss.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'home', component:SelectTeamsComponent},
  {path:'toss', component:TossComponent},
  {path:'play/:id', component: PlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
