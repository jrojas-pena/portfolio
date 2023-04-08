import { MikroORM } from '@mikro-orm/core';
import { __dbpassword__, __dbuser__, __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const entityManager = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();

  app.get('/', (_, res) => {
    res.send('Hello world');
  });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });

  const postData = {
    title: 'My Post Title',
    body: 'Lorem ipsum dolor sit amet.',
  };

  const post = new Post(postData.title, postData.body);
  await entityManager.persistAndFlush(post);
};

main();
