import {Entity, model, property} from '@loopback/repository';

@model()
export class DatumCache extends Entity {
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

  constructor(data?: Partial<DatumCache>) {
    super(data);
  }
}

export interface DatumCacheRelations {
  // describe navigational properties here
}

export type DatumCacheWithRelations = DatumCache & DatumCacheRelations;
