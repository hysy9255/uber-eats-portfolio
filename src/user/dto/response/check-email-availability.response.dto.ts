export class CheckEmailAvailabilityResponseDTO {
  available: boolean;

  constructor(init: { available: boolean }) {
    this.available = init.available;
  }
}
