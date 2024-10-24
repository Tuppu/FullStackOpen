const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")

require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(name: String): [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      return Book.collection.countDocuments()
    },
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      if (!Object.keys(args).length) {
        return Author.find({})
      }

      const filteredAuthors = Author.find({ name: args.name })

      return filteredAuthors
    },
    allBooks: async (root, args) => {
      if (!Object.keys(args).length) {
        return Book.find({}).populate("author")
      }

      const filteredBooks = Book.find({ $or: [({ "author.name": args.author }, { genres: [args.genre] })] })

      return filteredBooks
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root, args) => {
      return root.populate("author", { name: 1 })
    },
    id: (root) => root.id,
    genres: (root) => root.genres,
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root, args) => {
      return Book.find({ "author.id": root.id }).count()
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (!author) {
        author = await new Author({ name: args.author })
      }

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      const book = await new Book({ title: args.title, published: args.published, genres: args.genres, author: author.id })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError("Saving user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
