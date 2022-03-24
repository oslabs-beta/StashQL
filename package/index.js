const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const express = require('express');
const app = express();

//a schema is basically a set of instructions that tell you what you need to return to their queries
//client will pass in their schema into our function so we know what to return
function stashql(clientSchema) {
  this.schema = clientSchema;
  this.query = '';
  // console.log('the clientSchema: ', clientSchema);
  console.log('this.schema: ', this.schema);
}

//creates a function called queryHandler on stashql's prototype chain in order to resolve queries
stashql.prototype.queryHandler = async function(req, res, next) {
  //handle a query
  // console.log('handling the query');
  // req.body = "This is in request body";
  // req.body.query = "This is in request body query";
  // console.log(req.body.query);
  // console.log('the clientSchema: ', this.clientSchema)
  console.log('the wonky schema: ', this.schema);
  //console.log('req.body: ', JSON.stringify(req.body));

  // console.log("req.params.paramTest: ", req.params.paramTest);

  this.query = req.body.query;
  //console.log('this.query: ', this.query);
  // res.locals.query = this.query;
  res.locals.data = await graphql({schema: this.schema, source: this.query});
  // const result = graphql({
  //   schema: this.schema
  // })
  return next();
}

module.exports = stashql;

// My Schema:
// books: Get All books

// stashql

// Get Me all the books
// npm install stashql

// app.use('/graphql', stashql.queryHandler(), (req, res) => {
//   res.status(200).
// })

// function graphql(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver) {
//   var _arguments = arguments;

//   /* eslint-enable no-redeclare */
//   // Always return a Promise for a consistent API.
//   return new Promise(function (resolve) {
//     return resolve( // Extract arguments from object args if provided.
//     _arguments.length === 1 ? graphqlImpl(argsOrSchema) : graphqlImpl({
//       schema: argsOrSchema,
//       source: source,
//       rootValue: rootValue,
//       contextValue: contextValue,
//       variableValues: variableValues,
//       operationName: operationName,
//       fieldResolver: fieldResolver,
//       typeResolver: typeResolver
//     }));
//   });
// }

// function graphqlImpl(args) {
//   var schema = args.schema,
//       source = args.source,
//       rootValue = args.rootValue,
//       contextValue = args.contextValue,
//       variableValues = args.variableValues,
//       operationName = args.operationName,
//       fieldResolver = args.fieldResolver,
//       typeResolver = args.typeResolver; // Validate Schema

//   var schemaValidationErrors = (0, _validate2.validateSchema)(schema);

//   if (schemaValidationErrors.length > 0) {
//     return {
//       errors: schemaValidationErrors
//     };
//   } // Parse


//   var document;

//   try {
//     document = (0, _parser.parse)(source);
//   } catch (syntaxError) {
//     return {
//       errors: [syntaxError]
//     };
//   } // Validate


//   var validationErrors = (0, _validate.validate)(schema, document);

//   if (validationErrors.length > 0) {
//     return {
//       errors: validationErrors
//     };
//   } // Execute


//   return (0, _execute.execute)({
//     schema: schema,
//     document: document,
//     rootValue: rootValue,
//     contextValue: contextValue,
//     variableValues: variableValues,
//     operationName: operationName,
//     fieldResolver: fieldResolver,
//     typeResolver: typeResolver
//   });
// }

// //////////////////////
// var schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return 'world';
//         },
//       },
//     },
//   }),
// });
// ```

// This defines a simple schema, with one type and one field, that resolves
// to a fixed value. The `resolve` function can return a value, a promise,
// or an array of promises. A more complex example is included in the top-level [tests](src/__tests__) directory.

// Then, serve the result of a query against that type schema.

// ```js
// var source = '{ hello }';

// graphql({ schema, source }).then((result) => {
//   // Prints
//   // {
//   //   data: { hello: "world" }
//   // }
//   console.log(result);
// });
// ```