export class RestaurantInfoDTO {
  dba: string;
  eta: string;

  constructor(init: { dba: string; eta: string }) {
    this.dba = init.dba;
    this.eta = init.eta;
  }
}
