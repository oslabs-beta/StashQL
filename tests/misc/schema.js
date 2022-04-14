const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const { booksArray, authorsArray } = require('./db');
const db = require('./authorModelPG');

const allAuthorsQuery = 'SELECT * FROM public.authors';
const addAuthorQuery = (authorObj) => {
  const authorName = authorObj.name.replaceAll('"', '');
  const addString = `INSERT INTO public.authors (id, name) VALUES (${authorObj.id}, '${authorName}')`;
  return addString;
};
const findAuthorQuery = (authorID) => {
  const findString = `SELECT id, name FROM public.authors WHERE id = ${authorID}'`;
  return findString;
};

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This respresents an author of a book',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => booksArray.filter((book) => book.authorId === author.id),
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This respresents a book written by an author',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    authorId: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve: (book) => authorsArray.find((author) => author.id === book.authorId),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A single book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => booksArray.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => booksArray,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: async () => {
        const allAuthors = await db.query(allAuthorsQuery)
          .then((results) => {
            return results.rows;
          });
        
        return allAuthors;
      },
      author: {
        type: AuthorType,
        description: 'A single author',
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (parent, args) => findAuthorQuery(args.id),
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLString },
        authorId: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const newBook = {
          id: booksArray.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        booksArray.push(newBook);
        return newBook;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLString },
        // for deleting/updating - reruns all queries
        refillCache: { type: GraphQLString },
        // for creating/adding
        clearRelatedFields: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const authorLength = await db.query(allAuthorsQuery).then((results) => results.rows.length);
        const newAuthor = { id: authorLength + 1, name: args.name };
        await db.query(addAuthorQuery(newAuthor)).then((results) => results);
        return newAuthor;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = {
  schema,
  allAuthorsQuery,
};
