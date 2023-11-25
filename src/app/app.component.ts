import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    IonicModule, 
    RouterLink, 
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
