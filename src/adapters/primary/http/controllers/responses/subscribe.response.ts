import { Station } from 'src/bussiness/entities/station.entity';

export class SubscribeResponse {
  message = 'subscribed' as const;

  constructor(station: Station) {}
}
