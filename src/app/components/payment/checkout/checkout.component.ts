import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  protected payPalConfig?: IPayPalConfig;
  applicationId = this.route.snapshot.queryParams['applicationId'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.initConfig();
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
        this.applicationService.payApplication(this.applicationId);
        let message = $localize`Paid has been done. Thank you.`;
        alert(message);
        this.router.navigateByUrl('/trips');
      },
      onCancel: (data, actions) => {
        let message = $localize`Paid has been cancelled. Try again.`;
        alert(message);
        this.router.navigateByUrl('/trips');
      },
      onError: (err) => {
        let message = $localize`Something went wrong. The payment has not been made. Please try again.`;
        alert(message);
        this.router.navigateByUrl('/trips');
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
