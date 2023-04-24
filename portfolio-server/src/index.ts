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
import https from 'https';
import fs from 'fs';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const entityManager = orm.em.fork();
  await orm.getMigrator().up();

  const app = express();

  const redisClient = createClient();
  await redisClient.connect().catch(console.error);

  const privateKey = fs.readFileSync('key.pem', 'utf8');
  const certificate = fs.readFileSync('cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'https://www.cafeprogramming.com',
        'http://localhost:4000',
        'http://192.168.2.22:3000',
        'https://localhost:3001',
        'http://localhost',
      ],
      credentials: false,
    }),
  );

  app.use(
    session({
      name: 'qid',
      secret: __secret__,
      store: new RedisStore({
        client: redisClient,
        prefix: 'cafeprogramming:',
        disableTouch: true,
      }),
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'none', // csrf
        secure: false, // cookie only works in https
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

  const httpsServer = https.createServer(credentials, app);
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  httpsServer.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
};

main();
