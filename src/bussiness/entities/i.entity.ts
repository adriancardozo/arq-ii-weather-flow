export abstract class IEntity<EditInput> {
  id: string;

  abstract edit(input: EditInput): void;
}
