import express, { type Request, type Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import { createApolloGraphQLServer } from "./graphql";

async function initBackend() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const PORT = Number(process.env.PORT) || 8000;

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server is up and running!" });
  });

  const graphQLServer = await createApolloGraphQLServer();

  app.use("/graphql", expressMiddleware(graphQLServer));

  app.listen(PORT, () =>
    console.log(`Server is listening at http://localhost:${PORT}`)
  );
}

initBackend();
