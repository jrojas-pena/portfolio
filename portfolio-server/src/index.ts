import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __dbpassword__, __dbuser__, __prod__, __secret__ } from './constants';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { createClient } from 'redis';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { MyContext } from './types';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const entityManager = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();

  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'cafeprogramming:',
    disableTouch: true,
  });

  // app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.use(
    session({
      name: 'qid',
      secret: __secret__,
      store: redisStore,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: entityManager, req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    // cors: false,
  });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
};

main();
