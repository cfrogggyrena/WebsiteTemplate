import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatGridListModule, RouterLink, MatButton],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],

  animations: [
    trigger('textAnimation', [
      state('hidden', style({
        opacity: 0,
        // animation for the slide text
        transform: 'translateX(-50px)' // start off-screen to the left
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)' // slide into position
      })),
      transition('hidden => visible', animate('800ms ease-out'))
    ])
  ]
})
export class Home implements OnInit, AfterViewInit {
  animationState: 'hidden' | 'visible' = 'hidden';

  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'visible';
    }, 200);
  }

  // counter functions
  @ViewChild('counterElement') counterElement!: ElementRef;
  displayNumberOne = 0;
  displayNumberTwo = 0;
  displayNumberThree = 0;
  finalNumberOne = 35;
  finalNumberTwo = 12;
  finalNumberThree = 200;
  speedOne = 300;
  speedTwo = 300;
  speedThree = 100;
  private observer!: IntersectionObserver;
  private subscriptionOne!: Subscription;
  private subscriptionTwo!: Subscription;
  private subscriptionThree!: Subscription;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounterOne();
          this.startCounterTwo();
          this.startCounterThree();
          this.observer.disconnect();
        }
      });
    });

    this.observer.observe(this.counterElement.nativeElement);
  }
// counter one
  startCounterOne() {
    const source = interval(this.speedOne);
    this.subscriptionOne = source.subscribe(() => {
      if (this.displayNumberOne < this.finalNumberOne) {
        this.displayNumberOne += Math.ceil(this.finalNumberOne / 100);
        if (this.displayNumberOne > this.finalNumberOne) {
          this.displayNumberOne = this.finalNumberOne;
        }
      } else {
        this.displayNumberOne = this.finalNumberOne;
        this.subscriptionOne.unsubscribe();
      }
    });
  }
// counter two
  startCounterTwo() {
    const source = interval(this.speedTwo);
    this.subscriptionTwo = source.subscribe(() => {
      if (this.displayNumberTwo < this.finalNumberTwo) {
        this.displayNumberTwo += Math.ceil(this.finalNumberTwo / 100);
        if (this.displayNumberTwo > this.finalNumberTwo) {
          this.displayNumberTwo = this.finalNumberTwo;
        }
      } else {
        this.displayNumberTwo = this.finalNumberTwo;
        this.subscriptionTwo.unsubscribe();
      }
    });
  }
// counter three
  startCounterThree() {
    const source = interval(this.speedThree);
    this.subscriptionThree = source.subscribe(() => {
      if (this.displayNumberThree < this.finalNumberThree) {
        this.displayNumberThree += Math.ceil(this.finalNumberThree / 100);
        if (this.displayNumberThree > this.finalNumberThree) {
          this.displayNumberThree = this.finalNumberThree;
        }
      } else {
        this.displayNumberThree = this.finalNumberThree;
        this.subscriptionThree.unsubscribe();
      }
    });
  }
}