
import { gql } from "apollo-server-core"

const typeDefs=gql`
type Query{
    users:[User]
    user(_id:ID!):User
    quotes:[QuoteWithName]
    iquote(by:ID!):[Quotes]
    myProfile:User
}
type User{
    _id:ID
    firstName:String
    lastName:String
    email:String
    password:String
    quotes:[Quotes]
}
type QuoteWithName{
    _id:String
    name:String
    by:IdName
}
type IdName{
    _id:String
    firstName:String
}
type Quotes{
    _id:String
    name:String
    by:String
}
type Token{
    token:String
}
type Mutation{
    signUpUser(userNew:userInput!):User
    signInUser(signInUser:userLogin!):Token
    createQuote(name:String!):String
    deleteQuote(_id:String!):String
}
input userLogin{
    email:String!
    password:String!
}
input userInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
`
export default typeDefs