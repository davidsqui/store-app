import { Component, OnInit } from '@angular/core';
import { onExit } from './../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, onExit {
  constructor() {}
  onExit() {
    const resp = confirm('estas seguro de salir?');
    return resp;
  }

  ngOnInit(): void {}
}
