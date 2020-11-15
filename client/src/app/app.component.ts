import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor (private auth:AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('auth-token');

    if (token !== null) {
      this.auth.setToken(token);
    }
  }

}
