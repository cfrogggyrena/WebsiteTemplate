import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatGridListModule, RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],


// animations for toolbar show/hide
  animations: [
    trigger('toolbarAnimation', [
      state('visible', style({
        transform: 'translateY(0)',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 1000
      })),
      state('hidden', style({
        transform: 'translateY(-100%)', // moves it out of view
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 1000
      })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('300ms ease-in'))
    ])
  ]
})


export class Header {

  toolbarState: 'visible' | 'hidden' = 'visible';
  private threshold = 700; // point where toolbar reappears
  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    // If user scrolls down past threshold, show toolbar
    if (scrollY > this.threshold) {
      this.toolbarState = 'visible';
    } else {
      // Hide toolbar only when scrolling down
      if (scrollY > this.lastScrollTop) {
        this.toolbarState = 'hidden';
      } else {
        this.toolbarState = 'visible';
      }
    }


  }
}

