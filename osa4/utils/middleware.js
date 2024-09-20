const logger = require('./logger')

const morgan = require('morgan')
morgan('tiny')
morgan.token('res-body', function (req, res)
{
  if (req.body && res.statusCode < 400) {
    return JSON.stringify(req.body)
  }
})
const morgan_logger = morgan(':method :url :status :res[content-length] - :response-time ms - :res-body')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(403).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

module.exports = {
  morgan_logger,
  unknownEndpoint,
  errorHandler
}