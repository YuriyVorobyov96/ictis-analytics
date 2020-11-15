import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { VkUsersPageComponent } from './vk-users-page/vk-users-page.component';
import { VkPostsPageComponent } from './vk-posts-page/vk-posts-page.component';
import { WebsiteAnalyticsPageComponent } from './website-analytics-page/website-analytics-page.component';
import { InterestsAnalyticsPageComponent } from './interests-analytics-page/interests-analytics-page.component';
import { PathfinderComponent } from './pathfinder/pathfinder.component';
import { PagesNumbersComponent } from './pages-numbers/pages-numbers.component';
import { UsersTreeComponent } from './users-tree/users-tree.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'signup',
        component: SignupPageComponent,
      }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: OverviewPageComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsPageComponent,
      },
      {
        path: 'website-analytics',
        component: WebsiteAnalyticsPageComponent,
      },
      {
        path: 'users-analytics',
        component: VkUsersPageComponent,
      },
      {
        path: 'posts-analytics',
        component: VkPostsPageComponent,
      },
      {
        path: 'interests-analytics',
        component: InterestsAnalyticsPageComponent,
      },
      {
        path: 'pathfinder',
        component: PathfinderComponent,
      },
      {
        path: 'users-tree',
        component: UsersTreeComponent,
      },
      {
        path: 'pages-analytics',
        component: PagesNumbersComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
