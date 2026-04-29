export class RegisterMeasurementInput {
  constructor(
    public datetime: Date,
    public pressure: number,
    public temperature: number,
    public humidity: number,
    public station: string,
  ) {}
}
