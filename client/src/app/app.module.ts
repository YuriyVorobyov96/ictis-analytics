import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SexComponent } from './vk-users-page/sex/sex.component';
import { UniversitiesComponent } from './vk-users-page/universities/universities.component';
import { CityComponent } from './vk-users-page/city/city.component';
import { CountryComponent } from './vk-users-page/country/country.component';
import { FacultyComponent } from './vk-users-page/faculty/faculty.component';
import { ChairComponent } from './vk-users-page/chair/chair.component';
import { GraduationComponent } from './vk-users-page/graduation/graduation.component';
import { EducationFormComponent } from './vk-users-page/education-form/education-form.component';
import { EducationStatusComponent } from './vk-users-page/education-status/education-status.component';
import { UsersFilterComponent } from './vk-users-page/users-filter/users-filter.component';
import { VkUsersPageComponent } from './vk-users-page/vk-users-page.component';
import { VkPostsPageComponent } from './vk-posts-page/vk-posts-page.component';
import { PostsFilterComponent } from './vk-posts-page/posts-filter/posts-filter.component';
import { PostsTableComponent } from './vk-posts-page/posts-table/posts-table.component';
import { TableFilterComponent } from './vk-posts-page/table-filter/table-filter.component';
import { WebsiteAnalyticsPageComponent } from './website-analytics-page/website-analytics-page.component';
import { UsersChartComponent } from './website-analytics-page/users-chart/users-chart.component';
import { NewUsersChartComponent } from './website-analytics-page/new-users-chart/new-users-chart.component';
import { SessionsChartComponent } from './website-analytics-page/sessions-chart/sessions-chart.component';
import { PagesChartComponent } from './website-analytics-page/pages-chart/pages-chart.component';
import { NumbersFilterComponent } from './website-analytics-page/numbers-filter/numbers-filter.component';
import { CountriesChartComponent } from './website-analytics-page/countries-chart/countries-chart.component';
import { MapsFilterComponent } from './website-analytics-page/maps-filter/maps-filter.component';
import { CitiesChartComponent } from './website-analytics-page/cities-chart/cities-chart.component';
import { RegionsChartComponent } from './website-analytics-page/regions-chart/regions-chart.component';
import { InterestsAnalyticsPageComponent } from './interests-analytics-page/interests-analytics-page.component';
import { InterestsFilterComponent } from './interests-analytics-page/interests-filter/interests-filter.component';
import { PathfinderComponent } from './pathfinder/pathfinder.component';
import { PagesNumbersComponent } from './pages-numbers/pages-numbers.component';
import { PagesFilterComponent } from './pages-numbers/pages-filter/pages-filter.component';
import { UsersTreeComponent } from './users-tree/users-tree.component';
import { UsersTreeFilterComponent } from './users-tree/users-tree-filter/users-tree-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    SignupPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    LoaderComponent,
    SexComponent,
    UniversitiesComponent,
    CityComponent,
    CountryComponent,
    FacultyComponent,
    ChairComponent,
    GraduationComponent,
    EducationFormComponent,
    EducationStatusComponent,
    UsersFilterComponent,
    VkUsersPageComponent,
    VkPostsPageComponent,
    PostsFilterComponent,
    PostsTableComponent,
    TableFilterComponent,
    WebsiteAnalyticsPageComponent,
    UsersChartComponent,
    NewUsersChartComponent,
    SessionsChartComponent,
    PagesChartComponent,
    NumbersFilterComponent,
    CountriesChartComponent,
    MapsFilterComponent,
    CitiesChartComponent,
    RegionsChartComponent,
    InterestsAnalyticsPageComponent,
    InterestsFilterComponent,
    PathfinderComponent,
    PagesNumbersComponent,
    PagesFilterComponent,
    UsersTreeComponent,
    UsersTreeFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
