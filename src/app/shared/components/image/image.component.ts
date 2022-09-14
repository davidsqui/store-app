import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() img = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = './../../../assets/images/books.jpg';

  constructor() {}

  ngOnInit(): void {}

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    this.loaded.emit(this.img);
  }
}
