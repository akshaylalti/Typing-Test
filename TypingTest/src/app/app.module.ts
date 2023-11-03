import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SimpleTestComponent } from './simple-test/simple-test.component';
import { AdvancedTestComponent } from './advanced-test/advanced-test.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestDurationComponent } from './test-duration/test-duration.component';
import { TestBoxComponent } from './test-box/test-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from './pipes/time.pipe';
import { CalculateService } from './services/calculate.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SimpleTestComponent,
    AdvancedTestComponent,
    StatisticsComponent,
    AboutUsComponent,
    ProfileComponent,
    PageNotFoundComponent,
    TestDurationComponent,
    TestBoxComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CalculateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
