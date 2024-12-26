import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import { graphql } from "graphql";
import typedefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers.js";
dotenv.config();

const app = express();

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/quotes-project");
        console.log("Db connected  successfully.....");
    } catch (error) {
        console.log(error.message);
    }
}

dbConnection();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.json({message : "response  get successfully"})
});


const server = new ApolloServer({
    typeDefs : typedefs,
    resolvers : resolvers,
    context: ({ req }) => {
        // Extract the token from the Authorization header
        const token = req.headers.authorization || "";
        // Pass token in context
        return { token };
      },
});

const startApolloServer  =async()=>{
    await server.start();
    app.use('/graphql' , expressMiddleware(server) )
 }

 startApolloServer();


const port  = process.env.PORT || 5002
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
});

