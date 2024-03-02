import { CommonModule } from '@angular/common';
import { Component, OnInit ,Input, inject} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'btn',
  standalone: true,
  imports: [IconComponent,CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
 /* 
  ICONS
  arrowdown share link openlink copy downfile
  add print search image login logout
  
  COLOR
  pri wsp second f

  BUTTON
  btn btn-s btn-link

  exm:

  <app-button emoji="" label="ver más" icon="send" (click)="showMore(item)" [color]="'pri'" [button]="'btn'"></app-button>

  */

  @Input() label:string='';
  @Input() icon:string=''; 
  @Input() emoji:string=''; 
  @Input() color:string=''; 
  @Input() button:string=''; 
  @Input() disabled:boolean=false; 


}
