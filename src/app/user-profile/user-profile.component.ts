import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent implements OnInit {
  
  title = window.innerWidth;
  role;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
   var name = window.innerWidth;
   console.log(name)

   this.auth.user$.subscribe( user$ => {
    if (user$) {this.role = user$.role}
  })
  }
}
