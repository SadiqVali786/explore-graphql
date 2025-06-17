import { mutations } from "./mutations";
import { queries } from "./queries";
import { resolvers } from "./resolvers";
import { typeDef } from "./typedef";

export const UserQL = { typeDef, queries, resolvers, mutations };
