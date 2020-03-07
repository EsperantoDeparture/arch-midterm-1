import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Datum} from '../models';
import {DatumCacheRepository, DatumRepository} from '../repositories';

export class DatumController {
  constructor(
    @repository(DatumRepository)
    public datumRepository : DatumRepository,
    @repository(DatumCacheRepository)
    public datumCacheRepository : DatumCacheRepository,
  ) {}

  @post('/data', {
    responses: {
      '200': {
        description: 'Datum model instance',
        content: {'application/json': {schema: getModelSchemaRef(Datum)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datum, {
            title: 'NewDatum',
            exclude: ['id'],
          }),
        },
      },
    })
    datum: Omit<Datum, 'id'>,
  ): Promise<Datum> {
    const newDatum: Datum = await this.datumRepository.create(datum);
    await this.datumCacheRepository.set(newDatum.id!.toString(), newDatum);
    return newDatum;
  }

  @get('/data/count', {
    responses: {
      '200': {
        description: 'Datum model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Datum)) where?: Where<Datum>,
  ): Promise<Count> {
    return this.datumRepository.count(where);
  }

  @get('/data', {
    responses: {
      '200': {
        description: 'Array of Datum model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Datum, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Datum)) filter?: Filter<Datum>,
  ): Promise<Datum[]> {
    return this.datumRepository.find(filter);
  }

  @patch('/data', {
    responses: {
      '200': {
        description: 'Datum PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datum, {partial: true}),
        },
      },
    })
    datum: Datum,
    @param.query.object('where', getWhereSchemaFor(Datum)) where?: Where<Datum>,
  ): Promise<Count> {
    return this.datumRepository.updateAll(datum, where);
  }

  @get('/data/{id}', {
    responses: {
      '200': {
        description: 'Datum model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Datum, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Datum)) filter?: Filter<Datum>
  ): Promise<Datum> {
    const datumInCache = await this.datumCacheRepository.get(id.toString());
    if (typeof datumInCache === 'object') {
      return datumInCache;
    }
    return this.datumRepository.findById(id, filter);
  }

  @patch('/data/{id}', {
    responses: {
      '204': {
        description: 'Datum PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datum, {partial: true}),
        },
      },
    })
    datum: Datum,
  ): Promise<void> {
    await this.datumRepository.updateById(id, datum);
  }

  @put('/data/{id}', {
    responses: {
      '204': {
        description: 'Datum PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() datum: Datum,
  ): Promise<void> {
    await this.datumRepository.replaceById(id, datum);
  }

  @del('/data/{id}', {
    responses: {
      '204': {
        description: 'Datum DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.datumRepository.deleteById(id);
  }
}
