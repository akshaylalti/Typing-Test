import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdvancedTestComponent } from './advanced-test/advanced-test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SimpleTestComponent } from './simple-test/simple-test.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'simple', component: SimpleTestComponent },
  { path: 'advanced', component: AdvancedTestComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/simple', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
