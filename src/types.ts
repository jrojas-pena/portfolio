import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';

export type MyContext = {
  em: EntityManager<any> & EntityManager<PostgreSqlDriver>;
};
