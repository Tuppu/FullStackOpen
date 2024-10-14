import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/users'
import { updateUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    userService.getAll().then((users) => {
      dispatch(updateUsers(users))
    })
  }, [])

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
