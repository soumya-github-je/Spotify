import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./Controllers/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


const dbConnect = async () => {
    await mongoose.connect("mongodb+srv://soumya:soumyasvr@cluster0.9qam6q4.mongodb.net/spotify")
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000},
    context: ({ req }) => {
    const token = req.headers.authorization || "";
    return { token };
  },
  });
  
  dbConnect()
  console.log(`🚀  Server ready at: ${url}`);