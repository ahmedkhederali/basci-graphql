// Importing the Express module
const express = require("express");
// Initialize the app
const app = express();

const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// Define a port
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON request bodies (optional)
app.use(express.json());
const users=[
    {
        id:'1',
        name:"ahmed"
    },
    {
        id:'2',
        name:"ali"
    }
]
const schema = buildSchema(`
    type User {
        id:String,
        name:String
    }
    type Query{
    getUser:[User]
    userById(id:String):User
    }
    `);

    const resolvers={
        hello:()=>'hello ahmed',
        getUser:()=>users,
        userById:(args)=>users.find(user=>user.id=args.id)
    }
app.use('/graphql',graphqlHTTP({schema,rootValue:resolvers,graphiql:true}))
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
