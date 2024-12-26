import User from "../models/user.js";
import Quote from "../models/qoute.js";
import bycrpt from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

// const Quote = [
//     {
//         name : "this is authores first name1",
//         by : 1
//     }, {
//         name : "this is authores second name2",
//         by : 1
//     },
//     {
//         name : "this is authores thirdd name3",
//         by : 1
//     },
//     {
//         name : "author is second time2222",
//         by : 2
//     },{
//         name : "author is second time but dublicate",
//         by : 2
//     },
//     {
//         name : "author is third time333333",
//         by : 3
//     },
// ]

// const User = [
//     {
//         id:1,
//         firstName:"yuvraj",
//         lastName:"singh",
//         email:"yuvraj@.com",
//         quotes:[Quote]
//     },
//     {
//         id:2,
//         firstName:"kumar1",
//         lastName:"kumar",
//         email:"kumar@.com",
//         quotes:[Quote]
//     },
//      {
//         id:3,
//         firstName:"kumkum",
//         lastName:"k1",
//         email:"ku@.com",
//         quotes:[Quote]
//     }
// ]

const resolvers = {
    Query: {
        quotes: async () => {
           return await Quote.find();

        },
        users: async () => {
           return await User.find();
        }
      },
    User :{
        // quotes : (parent)=>Quote.filter(quote => quote.by === parent.id)
        quotes : async (parent) => {
           return  await Quote.find({by : parent.id}); 
        }
      },

      Mutation : {
        
        addQuote : async (parent ,{name ,by})=> {
            try {
               const quote = await Quote.create({
                   name,
                   by
               })
               return quote
            } catch (error) {
                throw new Error(error.message);
            }
      },
        registerUser : async (parent , args)=>{
             const {firstName , lastName , email ,password} = args;
            try {
                const existingUser = await User.findOne({email});
                if(existingUser){
                    throw new Error("User already exist");
                }
                const saltRound = 10;
                const passwordHash = await bycrpt.hash(password , saltRound);
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password :passwordHash
                });
                return user
            } catch (error) {
                 throw new Error(error.message);
            }
        } ,

        loginUser : async(parent , {email , password})=> {
             try {
                const checkUser = await User.findOne({email});
                if(!checkUser){
                    throw new Error("User not found  please register userself..!!")
                }
                const comparePassword = await bycrpt.compare(password , checkUser.password );
                if(!comparePassword){
                    throw new Error('Invalid Credentials !!')
                }

                const token = sign({id:checkUser.id , email:checkUser.email} , process.env.JWT_SECRET || "thisissecret" , {expiresIn : "1d"});

                return {user : checkUser , token};

             } catch (error) {
                throw new Error(error.message)
             }
        }
      }
}

export default resolvers;