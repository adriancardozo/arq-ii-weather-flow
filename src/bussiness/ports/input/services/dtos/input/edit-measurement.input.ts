import { EditIdInput } from './edit-id.input';

export class EditMeasurementInput {
  constructor(
    public pressure?: number,
    public temperature?: number,
    public humidity?: number,
    public station?: EditIdInput,
  ) {}
}
