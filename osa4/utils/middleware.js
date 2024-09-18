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
  }

  next(error)
}

module.exports = {
  morgan_logger,
  unknownEndpoint,
  errorHandler
}