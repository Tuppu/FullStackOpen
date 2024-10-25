const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")

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
    books: [Book!]!
    bookCount: Int!
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(name: String): [Author!]!
    me: User
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

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
    me: (root, args, context) => {
      return context.currentUser
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
      return root?.books?.length ?? 0
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) return

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = await new Author({ name: args.author })
      }

      let book = await new Book({ title: args.title, published: args.published, genres: args.genres })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      author.books = author.books.concat(book)
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

      return book
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) return

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

    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
