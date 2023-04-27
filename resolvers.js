import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()
const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    user: async (_, { _id }) => await User.findOne({ _id: _id }),
    iquote: async (_, { by }) => await Quote.find({ by: by }),
    myProfile: async (_, args, { userId }) => {
      if (userId) {
       return await User.findOne({_id:userId})
      } else {
        throw new Error("You Must Login.");
      }
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const userExist = await User.findOne({ email: userNew.email });
      if (userExist) {
        console.log("UserExist");
        throw new Error("User Already Exist");
      } else {
        const hashedPassword = await bcryptjs.hash(userNew.password, 12);
        const newUser = new User({ ...userNew, password: hashedPassword });
        return await newUser.save();
      }
    },
    signInUser: async (_, { signInUser }) => {
      const userExist = await User.findOne({ email: signInUser.email });
      if (userExist) {
        const checkPassword = await bcryptjs.compare(
          signInUser.password,
          userExist.password
        );
        if (checkPassword) {
          const token = jwt.sign({ userId: userExist._id }, process.env.jwt_SECRET);
          return { token };
        } else {
          throw new Error("Invalid Email and Password.");
        }
      } else {
        throw new Error("User Not Exist");
      }
    },
    createQuote: async (_, { name }, { userId }) => {
      if (userId) {
        const newQuote = new Quote({
          name,
          by: userId,
        });
        await newQuote.save();
        return "Quote Saved Successfully.";
      } else {
        throw new Error("You Must Login.");
      }
    },
    deleteQuote:async(_,{_id},{userId})=>{
      if(userId){
        const quoteExist=await Quote.findOne({_id:_id})
        if(quoteExist){
          await Quote.deleteOne({_id:_id})
          return "Quote Deleted Successfully."
        }else{
          throw new Error("No Quote Found.");
        }

      }
    }
  },
};

export default resolvers;
