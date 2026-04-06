export class ClientInfoDTO {
  clientId: string;
  name: string;
  phoneNumber: string;

  constructor(init: { clientId: string; name: string; phoneNumber: string }) {
    this.clientId = init.clientId;
    this.name = init.name;
    this.phoneNumber = init.phoneNumber;
  }
}
