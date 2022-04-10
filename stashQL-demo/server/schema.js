const db = require('./models/DemoModel');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

// const authorsArray = [
//   { id: 1, name: 'J. K. Rowling' },
//   { id: 2, name: 'J. R. R. Tolkien' },
//   { id: 3, name: 'Brent Weeks' },
// ];

// const booksArray = [
//   { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
//   { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
//   { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
//   { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
//   { id: 5, name: "The Two Towers", authorId: 2 },
//   { id: 6, name: "The Return of the King", authorId: 2 },
//   { id: 7, name: "The Way of Shadows", authorId: 3 },
//   { id: 8, name: "Beyond the Shadows", authorId: 3 },
// ];

// const AuthorType = new GraphQLObjectType({
//   name: "Author",
//   description: "This respresents an author of a book",
//   fields: () => ({
//     id: { type: GraphQLInt },
//     name: { type: GraphQLString },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve: (author) => {
//         return booksArray.filter((book) => book.authorId === author.id);
//       },
//     },
//   }),
// });

// const BookType = new GraphQLObjectType({
//   name: "Book",
//   description: "This respresents a book written by an author",
//   fields: () => ({
//     id: { type: GraphQLInt },
//     name: { type: GraphQLString },
//     authorId: { type: GraphQLInt },
//     author: {
//       type: AuthorType,
//       resolve: (book) => {
//         return authorsArray.find((author) => author.id === book.authorId);
//       },
//     },
//   }),
// });

// const RootQueryType = new GraphQLObjectType({
//   name: "Query",
//   description: "Root Query",
//   fields: () => ({
//     book: {
//       type: BookType,
//       description: "A single book",
//       args: {
//         id: { type: GraphQLInt },
//       },
//       resolve: (parent, args) => {
//         return booksArray.find((book) => book.id === args.id);
//       },
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       description: "List of All Books",
//       resolve: () => booksArray,
//     },
//     authors: {
//       type: new GraphQLList(AuthorType),
//       description: "List of All Authors",
//       resolve: () => authorsArray,
//     },
//     author: {
//       type: AuthorType,
//       description: "A single author",
//       args: {
//         id: { type: GraphQLInt },
//       },
//       resolve: (parent, args) => {
//         return authorsArray.find((author) => author.id === args.id);
//       },
//     },
//   }),
// });

// const RootMutationType = new GraphQLObjectType({
//   name: "Mutation",
//   description: "Root Mutation",
//   fields: () => ({
//     addBook: {
//       type: BookType,
//       description: "Add a book",
//       args: {
//         name: { type: GraphQLString },
//         authorId: { type: GraphQLInt },
//       },
//       resolve: (parent, args) => {
//         const newBook = {
//           id: booksArray.length + 1,
//           name: args.name,
//           authorId: args.authorId,
//         };
//         booksArray.push(newBook);
//         return newBook;
//       },
//     },
//     addAuthor: {
//       type: AuthorType,
//       description: "Add an author",
//       args: {
//         name: { type: GraphQLString },
//         //for deleting/updating - reruns all queries
//         refillCache: { type: GraphQLString },
//         //for creating/adding
//         clearRelatedFields: { type: GraphQLString },
//       },
//       resolve: (parent, args) => {
//         const newAuthor = { id: authorsArray.length + 1, name: args.name };
//         authorsArray.push(newAuthor);
//         return newAuthor;
//       },
//     },
//   }),
// });

//Type Definitions
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This respresents an author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: { 
      type: new GraphQLList(BookType),
      resolve: async (author) => {
        const sqlQuery = 'SELECT * FROM books WHERE authorid = $1;'
        const params = [author.id];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows);
          return response.rows;
        }
        catch (error) {
          console.log('errorrrrrr ', error);
        };
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This respresents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorid: { type: GraphQLNonNull(GraphQLInt) },
    author: { 
      type: AuthorType,
      resolve: async (book) => {
        const sqlQuery = 'SELECT * FROM authors WHERE id = $1;'
        const params = [book.authorid];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows[0]);
          return response.rows[0];
        }
        catch (error) {
          console.log('errorrrrrr: ', error);
        };
      }
    }
  })
})

//Queries
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: async () => {
        const sqlQuery = 'SELECT * FROM books;'
        try {
          const response = await db.query(sqlQuery);
          // console.log(response.rows);
          return response.rows;
        }
        catch (error) {
          console.log('errorrrrrr ', error);
        };
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: async () => {
        const sqlQuery = 'SELECT * FROM authors;'
        try {
          const response = await db.query(sqlQuery);
          // console.log(response.rows);
          return response.rows;
        }
        catch (error) {
          console.log('errorrrrrr ', error);
        };
      }
    },
    book: {
      type: BookType,
      description: 'A single book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const sqlQuery = 'SELECT * FROM books WHERE id = $1;'
        const params = [args.id];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows[0]);
          return response.rows[0];
        }
        catch (error) {
          console.log('errorrrrrr ', error);
        };
      }
    },
    author: {
      type: AuthorType,
      description: 'A single author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const sqlQuery = 'SELECT * FROM authors WHERE id = $1;'
        const params = [args.id];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows[0]);
          return response.rows[0];
        }
        catch (error) {
          console.log('errorrrrrr ', error);
        };
      }
    }
  })
})

//Mutations
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorid: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        const sqlQuery = `INSERT INTO books (name, authorid) VALUES ($1, $2) RETURNING *;`
        const params = [args.name, args.authorid];
        try {
          const response = await db.query(sqlQuery, params);
          return response.rows[0];
        }
        catch (error) {
          console.log('errorrrrrrrrr: ', error);
        };
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        refillCache: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const sqlQuery = `INSERT INTO authors (name) VALUES ($1) RETURNING *;`
        const params = [args.name];
        try {
          const response = await db.query(sqlQuery, params);
          return response.rows[0];
        }
        catch (error) {
          console.log('errorrrrrrrrr:', error);
        };
      }
    }
    // addAuthor: {
    //   type: AuthorType,
    //   description: 'Add an author',
    //   args: {
    //     name: { type: GraphQLNonNull(GraphQLString) },
    //     bookName: { type: GraphQLNonNull(GraphQLString) },
    //     refillCache: { type: GraphQLString }
    //   },
    //   resolve: async (parent, args) => {
    //     const sqlQuery1 = `INSERT INTO authors (name) VALUES ($1) RETURNING *;`
    //     const params1 = [args.name];
    //     try {
    //       const response1 = await db.query(sqlQuery1, params1);
    //       const id = response1.rows[0].id;
    //       params2.push(id);
    //       const response2 = await db.query(sqlQuery2, params2);
    //       return response1.rows[0];
    //     }
    //     catch (error) {
    //       console.log('errorrrrrrrrr: ', error);
    //     };
    //   }
    // }
  })
})


const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
