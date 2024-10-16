import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/users'
import { updateUsers } from '../reducers/usersReducer'
import User from './User'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

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

  if (id) {
    const user = users.find((u) => u.id === id)
    return <User user={user} />
  }

  return (
    <div>
      {' '}
      <h2>Users</h2>{' '}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <b>blogs created</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Users
