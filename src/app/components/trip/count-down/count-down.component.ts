import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  public dateNow = new Date();
  @Input() startDate!: Date;
  milliSecondsInASecond = 1000;
  SecondsInAMinute = 60;
  minutesInAnHour = 60;
  hoursInADay = 24;
  showCounter: Boolean = true;

  public timeDifference: number | undefined;
  public secondsToDday: number | undefined;
  public minutesToDday: number | undefined;
  public hoursToDday: number | undefined;
  public daysToDday: number | undefined;

  private getTimeDifference() {
    this.timeDifference =
      new Date(this.startDate).getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
    if (this.timeDifference <= 0) {
      this.showCounter = false;
    }
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.SecondsInAMinute)) %
        this.minutesInAnHour
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.SecondsInAMinute *
          this.minutesInAnHour)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.SecondsInAMinute *
          this.minutesInAnHour *
          this.hoursInADay)
    );
  }

  ngOnInit() {
    this.getTimeDifference();
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
