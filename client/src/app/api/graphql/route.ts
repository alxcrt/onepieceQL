import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { NextRequest } from "next/server";

import db from "@/db";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

// let plugins = [];
// if (process.env.NODE_ENV === "production") {
//   plugins = [
//     ApolloServerPluginLandingPageProductionDefault({
//       graphRef: "my-graph-id@my-graph-variant",
//       embed: true,
//     }),
//   ];
// } else {
//   plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
// }
const plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins,
  introspection: true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
