const people = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 4) {
  console.log('give number as argument')
  process.exit(1)
}
else if (process.argv.length > 5) {
  console.log('too many arguments')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tuppu88:${password}@cluster0.d0qjp.mongodb.net/noteApp?
  retryWrites=true&w=majority`

people.set('strictQuery', false)
people.connect(url)

const personSchema = new people.Schema({
  name: String,
  number: String,
})

const Person = people.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    people.connection.close()
    process.exit(0)
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    people.connection.close()
  })
}