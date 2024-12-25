// import Quote from "../models/quote";
//  import User from "../models/user";

const Quote = [
    {
        name : "this is authores first name1",
        by : 1
    }, {
        name : "this is authores second name2",
        by : 1
    },
    {
        name : "this is authores thirdd name3",
        by : 1
    },
    {
        name : "author is second time2222",
        by : 2
    },{
        name : "author is second time but dublicate",
        by : 2
    },
    {
        name : "author is third time333333",
        by : 3
    },
]

const User = [
    {
        id:1,
        firstName:"yuvraj",
        lastName:"singh",
        email:"yuvraj@.com",
        quotes:[Quote]
    },
    {
        id:2,
        firstName:"kumar1",
        lastName:"kumar",
        email:"kumar@.com",
        quotes:[Quote]
    },
     {
        id:3,
        firstName:"kumkum",
        lastName:"k1",
        email:"ku@.com",
        quotes:[Quote]
    }
]

const resolvers = {
    Query: {
        quotes: async () => {
          const quotes = await Quote.map((quote) => quote);
          return quotes;
        },
        users: async (_ ,us) => {
            console.log("_parent",us);
            const qoutes = await Quote.map((quote) => quote);

          const users = await User.map((user) => user);
          return users;
        }
      },
      Mutation: {
        // addQuote: async (_, { quote, author }) => {
        //   const newQuote = new Quote({ quote, author });
        //   await newQuote.save();
        //   return newQuote;
        // },
      },
}

export default resolvers;