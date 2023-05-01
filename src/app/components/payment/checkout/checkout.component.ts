import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Actor } from 'src/app/models/actor.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  protected payPalConfig?: IPayPalConfig;
  protected currentActor: Actor | undefined;
  applicationId = this.route.snapshot.queryParams['applicationId'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initConfig();
    this.currentActor = this.authService.getCurrentActor();
  }

  private initConfig(): void {
    const price = this.route.snapshot.queryParams['price'];
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'Ad0YgVPlYvf0h46nENCxkWRVu0WBFyWZ4i_sznphPgrWwPRQ3oRnkZHSq_rnttVUKQltLMpYzkwbiYSa',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: price,
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(this.route.snapshot.queryParams['applicationId']);
        this.applicationService.payApplication(this.applicationId).subscribe();
        let message = $localize`Paid has been done. Thank you.`;
        alert(message);
        this.router.navigateByUrl(`applications/explorer/${this.currentActor!._id}`);
      },
      onCancel: (data, actions) => {
        let message = $localize`Paid has been cancelled. Try again.`;
        alert(message);
        this.router.navigateByUrl(`applications/explorer/${this.currentActor!._id}`);
      },
      onError: (err) => {
        let message = $localize`Something went wrong. The payment has not been made. Please try again.`;
        alert(message);
        this.router.navigateByUrl(`applications/explorer/${this.currentActor!._id}`);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
