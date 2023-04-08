import { MikroORM } from '@mikro-orm/core';
import { __dbpassword__, __dbuser__, __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const entityManager = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

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
