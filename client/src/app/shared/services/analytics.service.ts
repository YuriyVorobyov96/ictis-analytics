import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OverviewPage, AnalyticsPage, AnalyticsPageVk, AnalyticsPageVkPosts, AnalyticsWebsiteData, AnalyticsInterestsVk, AnalyticsPathTreeData, AnalyticsPagesData, AnalyticsUsersTreeData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {


  constructor(private http: HttpClient) {
  }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>(`${environment.apiUrl}/api/analytics/overview/data`);
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>(`${environment.apiUrl}/api/analytics/graph/data`);
  }

  getAnalyticsVK(): Observable<AnalyticsPageVk> {
    return this.http.get<AnalyticsPageVk>(`${environment.apiUrl}/api/analytics/vk/data/users/analytics`);
  }

  getAnalyticsVKType(type: string): Observable<AnalyticsPageVk> {
    return this.http.get<AnalyticsPageVk>(`${environment.apiUrl}/api/analytics/vk/data/users/analytics/${type}`);
  }

  getAnalyticsVKInterests(): Observable<AnalyticsInterestsVk> {
    return this.http.get<AnalyticsInterestsVk>(`${environment.apiUrl}/api/analytics/vk/data/users/interests`);
  }

  getAnalyticsVKPosts(params: any = {}): Observable<AnalyticsPageVkPosts[]> {
    return this.http.get<AnalyticsPageVkPosts[]>(`${environment.apiUrl}/api/analytics/vk/data/posts`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getWebsiteDataSimple(params: any = {}): Observable<AnalyticsWebsiteData> {
    return this.http.get<AnalyticsWebsiteData>(`${environment.apiUrl}/api/analytics/google/data/simple`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getWebsiteData(params: any = {}): Observable<AnalyticsWebsiteData> {
    return this.http.get<AnalyticsWebsiteData>(`${environment.apiUrl}/api/analytics/google/data`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getPathTreeData(): Observable<AnalyticsPathTreeData> {
    return this.http.get<AnalyticsPathTreeData>(`${environment.apiUrl}/api/analytics/google/data/pages-path`);
  }

  getUsersTreeData(params: any = {}): Observable<AnalyticsUsersTreeData> {
    return this.http.get<AnalyticsUsersTreeData>(`${environment.apiUrl}/api/analytics/vk/data/users/friends/tree`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getPagesNumbersData(params: any = {}): Observable<AnalyticsPagesData[]> {
    return this.http.get<AnalyticsPagesData[]>(`${environment.apiUrl}/api/analytics/google/data/pages`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

}