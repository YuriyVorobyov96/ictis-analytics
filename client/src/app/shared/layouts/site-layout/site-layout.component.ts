import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  links = [
    {
      url: '/overview',
      name: 'Обзор',
    },
    {
      url: '/website-analytics',
      name: 'Анализ сайта',
    },
    {
      url: '/pages-analytics',
      name: 'Анализ страниц',
    },
    {
      url: '/pathfinder',
      name: 'Граф переходов',
    },
  ]

  linksVk = [
    {
      url: '/users-analytics',
      name: 'Анализ сообщества',
    },
    {
      url: '/posts-analytics',
      name: 'Анализ постов',
    },
    {
      url: '/interests-analytics',
      name: 'Анализ интересов',
    },
    {
      url: '/users-tree',
      name: 'Граф пользователей',
    },
  ]

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();

    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
