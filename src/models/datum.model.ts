import {Entity, model, property} from '@loopback/repository';

@model()
export class Datum extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  timestamp: number;

  @property({
    type: 'number',
    required: true,
  })
  temperature: number;

  @property({
    type: 'string',
  })
  createdAt?: string;


  constructor(data?: Partial<Datum>) {
    super(data);
  }
}

export interface DatumRelations {
  // describe navigational properties here
}

export type DatumWithRelations = Datum & DatumRelations;
