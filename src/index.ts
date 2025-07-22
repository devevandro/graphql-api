import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'; 
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user/UserResolver';

async function bootstrap() {
  const app = express();
  const httpServer = http.createServer(app); 

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`🚀 Servidor GraphQL rodando em http://localhost:${PORT}/graphql`);
  console.log(`🎮 Acesse o Apollo Sandbox em http://localhost:${PORT}/graphql`);
}

bootstrap().catch((error) => console.error(error));