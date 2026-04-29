import { EditMeasurementInput } from '../ports/input/services/dtos/input/edit-measurement.input';
import { IEntity } from './i.entity';
import { Station } from './station.entity';

export class Measurement extends IEntity<EditMeasurementInput> {
  datetime: Date = new Date();
  alert: boolean;
  alertType: 'Ninguna' | 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica' = 'Ninguna';
  pressure: number;
  temperature: number;
  humidity: number;
  station: Station;

  constructor(id: string);
  constructor(
    id: string | undefined,
    pressure: number,
    temperature: number,
    humidity: number,
    station: Station,
    datetime?: Date,
  );
  constructor(
    id: string,
    pressure?: number,
    temperature?: number,
    humidity?: number,
    station?: Station,
    datetime: Date = new Date(),
  ) {
    super();
    this.id = id;
    if (pressure !== undefined && temperature !== undefined && humidity !== undefined && station) {
      this.pressure = pressure;
      this.temperature = temperature;
      this.humidity = humidity;
      this.station = station;
      this.datetime = datetime;
      this.evalAlert();
    }
  }

  edit({ humidity, pressure, temperature, station }: EditMeasurementInput): void {
    this.humidity = humidity ?? this.humidity;
    this.pressure = pressure ?? this.pressure;
    this.temperature = temperature ?? this.temperature;
    if (station?.id) this.station = new Station(station.id);
    this.evalAlert();
  }

  private evalAlert() {
    this.alertType = 'Ninguna';
    if (this.humidity > 90) this.alertType = 'Humedad crítica';
    if (this.temperature > 40) this.alertType = 'Calor extremo';
    if (this.temperature < 0) this.alertType = 'Helada';
    if (this.pressure < 980) this.alertType = 'Tormenta';
    this.alert = this.alertType !== 'Ninguna';
  }
}
