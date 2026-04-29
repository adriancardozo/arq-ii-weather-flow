import { EditMeasurementInput } from '../ports/input/services/dtos/input/edit-measurement.input';
import { IEntity } from './i.entity';
import { Station } from './station.entity';

export class Measurement extends IEntity<EditMeasurementInput> {
  datetime: Date = new Date();
  alert: boolean;
  alertType: 'Ninguna' | 'Calor extremo' | 'Helada' | 'Tormenta';
  pressure: number;
  temperature: number;
  humidity: number;
  station: Station;

  constructor(id: string);
  constructor(
    id: string,
    pressure: number,
    temperature: number,
    humidity: number,
    station: Station,
    datetime: Date,
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
    if (pressure && temperature && humidity && station) {
      this.pressure = pressure;
      this.temperature = temperature;
      this.humidity = humidity;
      this.station = station;
      this.datetime = datetime;
    }
  }

  edit({ humidity, pressure, temperature, station }: EditMeasurementInput): void {
    this.humidity = humidity ?? this.humidity;
    this.pressure = pressure ?? this.pressure;
    this.temperature = temperature ?? this.temperature;
    if (station?.id) this.station = new Station(station.id);
  }
}
