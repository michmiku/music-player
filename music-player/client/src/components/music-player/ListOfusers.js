import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Settings from "../../Settings.json"

const ListOfUsers = () => {
    const [users, setUsers] = useState({ listOfUsers: [] })
    const [password, setPassword] = useState('')
    useEffect(() => {
        axios.get(Settings.server + 'users')
            .then(res => {
                setUsers({ listOfUsers: res.data })
            })
            .catch(err => console.log(err));
    })
    const handleAdmin = (user) => {
        axios.post(Settings.server + 'users/updateAdmin', user)
            .then(res => {
            })
            .catch(err => console.log(err));
    }
    const handleDelete = (user) => {
        axios.delete(Settings.server + 'users/delete/' + user._id)
            .then(res => {
            })
            .catch(err => console.log(err));
    }
    const handlePassword = (user, password) => {
        const newData = { user, password }
        axios.post(Settings.server + 'users/updatePassword', newData)
            .then(res => {
                alert("Password changed!")
                setPassword({ password: '' })
            })
            .catch(err => alert("Password is too short!"));
    }
    return (
        <div style={{ width: '100vw', height: 'calc(100vh - 49px)', backgroundColor: '#d6d6d6' }}>
            <div className="userlist-container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col" colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>{
                        users.listOfUsers.map((user, key) => (
                            <tr key={key} style={{ color: '#5a5a5a' }}>
                                <th scope="row" style={{ paddingTop: '22px' }}>{key}</th>
                                <td style={{ paddingTop: '18px' }}><button type="button" className="btn btn-secondary btn-sm " onClick={() => { handleAdmin(user) }}>{String(user.admin)}</button></td>
                                <td style={{ paddingTop: '20px' }}>{user.username}</td>
                                <td style={{ paddingTop: '15px' }}><input type="text"
                                    minLength="6"
                                    min="6"
                                    className="form-control w-25"
                                    onChange={(e) => { { setPassword(e.target.value) } }}
                                /></td>
                                <td style={{ paddingTop: '15px' }}><button type="button" className="btn btn-secondary btn-sm mr-5" onClick={() => { handlePassword(user, password) }}>Change password</button></td>
                                <td style={{ paddingTop: '15px' }}><button type="button" className="btn btn-secondary btn-sm " onClick={() => { handleDelete(user) }}>Delete user</button></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListOfUsers