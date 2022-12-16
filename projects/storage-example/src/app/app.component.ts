import { Component } from '@angular/core';
import { LocalStorage, SessionStorage } from 'storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'storage-example';

  constructor(
    private readonly session: SessionStorage,
    private readonly local: LocalStorage,
  ) {
    this.session.set('somekey2', 'somevalue');
    this.local.set('somekey1', 'somevalue');
    console.log(this.session.keys);
    console.log(this.local.keys);
    setTimeout(() => this.session.pop('somekey'), 5000);

    this.session.clear();
    this.local.clear();
  }
}
