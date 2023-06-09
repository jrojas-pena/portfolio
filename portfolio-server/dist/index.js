"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const redis_1 = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const entityManager = orm.em.fork();
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const redisClient = (0, redis_1.createClient)();
    await redisClient.connect().catch(console.error);
    const privateKey = fs_1.default.readFileSync('key.pem', 'utf8');
    const certificate = fs_1.default.readFileSync('cert.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    app.set('trust proxy', 1);
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:3000',
            'https://studio.apollographql.com',
            'https://www.cafeprogramming.com',
            'http://localhost:4000',
            'http://192.168.2.22:3000',
            'https://localhost:3001',
            'http://localhost',
        ],
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: 'qid',
        secret: constants_1.__secret__,
        store: new connect_redis_1.default({
            client: redisClient,
            prefix: 'cafeprogramming:',
            disableTouch: true,
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'none',
            secure: false,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: entityManager, req, res }),
    });
    const httpsServer = https_1.default.createServer(credentials, app);
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
//# sourceMappingURL=index.js.map