import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [],
})
export class CommentsComponent implements OnInit {
  //   @Input() :
  //   @Output()
  isModalOpen = false;
  constructor() {}

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
