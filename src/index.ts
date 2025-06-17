import express, { type Request, type Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";

async function initBackend() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const PORT = Number(process.env.PORT) || 8000;

  // Creating the Graph QL Server
  const graphQLServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        greeting(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hey there, I am a GraphQL Server",
        greeting: (_, { name }: { name: String }) => `Hi there! ${name}`,
      },
    },
  });

  // Starting the GraphQL Server
  await graphQLServer.start();

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server is up and running!" });
  });

  app.use("/graphql", expressMiddleware(graphQLServer));

  app.listen(PORT, () =>
    console.log(`Server is listening at http://localhost:${PORT}`)
  );
}

initBackend();
