import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  protected payPalConfig?: IPayPalConfig;

  constructor(private route: ActivatedRoute, private router: Router) {}

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
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        let message = $localize`Paid has been done. Thank you.`;
        alert(message);
        this.router.navigateByUrl('/trips');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
