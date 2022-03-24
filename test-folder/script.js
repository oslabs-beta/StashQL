const stashql = require('stashql');
const {graphqlHTTP} = require('express-graphql')
const express = require('express');
const cors = require('cors');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
  } = require('graphql');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authorsArray = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' },
  ];
  
const booksArray = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 },
];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This respresents an author of a book',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: { 
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return booksArray.filter(book => book.authorId === author.id)
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This respresents a book written by an author',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    authorId: { type: GraphQLInt },
    author: { 
      type: AuthorType,
      resolve: (book) => {
        return authorsArray.find(author => author.id === book.authorId)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    // book: {
    //   type: BookType,
    //   description: 'A single book',
    //   args: {
    //     id: { type: GraphQLInt }
    //   },
    //   resolve: (parent, args) => {
    //     return booksArray.find(book => book.id === args.id)
    //   }
    // },
    // books: {
    //   type: new GraphQLList(BookType),
    //   description: 'List of All Books',
    //   resolve: () => booksArray
    // },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authorsArray
    },
    // author: {
    //   type: AuthorType,
    //   description: 'A single author',
    //   args: {
    //     id: { type: GraphQLInt }
    //   },
    //   resolve: (parent, args) => {
    //     return authorsArray.find(author => author.id === args.id)
    //   }
    // }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLString },
        authorId: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        const newBook = { id: booksArray.length + 1, name: args.name, authorId: args.authorId }
        booksArray.push(newBook);
        return newBook;
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        const newAuthor = { id: authorsArray.length + 1, name: args.name }
        authorsArray.push(newAuthor);
        return newAuthor;
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

const StashQL = new stashql(schema);
console.log('THIS IS THE SCHEMA: ', StashQL.schema);

app.use("/graphql", StashQL.queryHandler, (req, res) => {
  console.log(res.locals.data);
})

// app.use('/', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }))

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
})