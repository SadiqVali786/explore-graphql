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
  getCurrentLoggedinUser: async (_: any, parameter: any, context: any) => {
    if (context && context.user) {
      // return context.user;
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I don't know, Who are you?");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const response = await UserService.createUser(payload);
    return response.id;
  },
};

export const resolvers = { queries, mutations };
