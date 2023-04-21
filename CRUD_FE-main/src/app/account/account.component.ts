import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() public item: any; // cha truyền con
  public ngOnInit(): void {
    console.log(this.item);
  }
}
