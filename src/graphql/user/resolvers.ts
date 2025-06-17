import { UserService, type CreateUserPayload } from "../../services/user";

const queries = {
  status: () => `GraphQL Server is Alive!`,
  createJWTToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const jwtToken = await UserService.createJWTToken(payload);
    // TODO: Handle error case
    return jwtToken;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const response = await UserService.createUser(payload);
    return response.id;
  },
};

export const resolvers = { queries, mutations };
