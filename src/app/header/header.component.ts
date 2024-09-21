import { Component } from '@angular/core';
import {SearchBoxComponent} from "../search-box/search-box.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBoxComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
