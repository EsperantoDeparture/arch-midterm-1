import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {DatumCache} from '../models';
import {RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatumCacheRepository extends DefaultKeyValueRepository<
  DatumCache
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(DatumCache, dataSource);
  }
}
