const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

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

      const filteredAuthors = Author.find({ name: args.name }) // there is no n+1 problem

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

      pubsub.publish("BOOK_ADDED", { bookAdded: book })

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
      const user = new User({ ...args })

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
