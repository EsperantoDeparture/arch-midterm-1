import {DefaultCrudRepository} from '@loopback/repository';
import {Datum, DatumRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatumRepository extends DefaultCrudRepository<
  Datum,
  typeof Datum.prototype.id,
  DatumRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Datum, dataSource);
  }
}
