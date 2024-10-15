import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/users'
import { updateUsers } from '../reducers/usersReducer'
import User from './User'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()

  const id = useParams().id

  const users = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    userService.getAll().then((users) => {
      dispatch(updateUsers(users))
    })
  }, [])

  if (!users) {
    return <div></div>
  }

  if (id) {
    const user = users.find((u) => u.id == id)

    return <User user={user} />
  }

  return (
    <div>
      {' '}
      <h2>Users</h2>{' '}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
