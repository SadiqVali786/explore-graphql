import { ApolloServer } from "@apollo/server";
import { UserQL } from "./user";

export async function createApolloGraphQLServer() {
  // Creating the Graph QL Server
  const graphQLServer = new ApolloServer({
    typeDefs: `
      ${UserQL.typeDef}
      type Query {
        ${UserQL.queries}
      }
      type Mutation {
        ${UserQL.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...UserQL.resolvers.queries,
      },
      Mutation: {
        ...UserQL.resolvers.mutations,
      },
    },
  });

  // Starting the GraphQL Server
  await graphQLServer.start();

  return graphQLServer;
}
