import { ApolloServer,gql } from "apollo-server";
import './DbConnector.js'
import './Models/Quotes.js'
import './Models/User.js'
import  typeDefs from './schema.js'
import resolvers from "./resolvers.js";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config()

const context=({req})=>{
    const {authorization}=req.headers
    if(authorization){
        const {userId}=jwt.verify(authorization,process.env.jwt_SECRET)
        return {userId}
    }
}


const server=new ApolloServer({
    typeDefs,
    resolvers,
    context
})

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})
