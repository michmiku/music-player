import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthenticatedUser } from "../../contexts/AuthenticatedUser.js"
import Settings from "../../Settings.json"

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const { authUser, setAuthUser } = useContext(AuthenticatedUser)
    const handleSubmit = e => {
        e.preventDefault();

        const userData = {
            username: user.username,
            password: user.password
        }
        axios.post(Settings.server + 'users/login', userData)
            .then(res => {
                if (res.data === '') {
                    alert("Wrong username or password!")
                }
                else {
                    setAuthUser({ username: user.username, admin: res.data.admin })
                    localStorage.setItem('user', user.username)
                    localStorage.setItem('admin', res.data.admin)
                }
            })
            .catch(err => console.log(err));
        setUser({ username: '', password: '' })
    }
    return (
        authUser.username === "" || authUser.username === 'null' || authUser.username === null ?
            <div style={{ width: '100vw', height: 'calc(100vh - 49px)', backgroundColor: '#d6d6d6' }}>
                <div align="center" className="container-login" style={{ color: "grey" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                minLength="3"
                                required
                                className="form-control"
                                style={{ width: "250px" }}
                                value={user.username}
                                onChange={(e) => { setUser({ username: e.target.value, password: user.password }) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password"
                                minLength="6"
                                required
                                className="form-control"
                                style={{ width: "250px" }}
                                value={user.password}
                                onChange={(e) => { setUser({ username: user.username, password: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn btn-dark" />
                        </div>
                    </form>
                </div>
            </div>
            :
            <div style={{ width: '100vw', height: 'calc(100vh - 49px)', backgroundColor: '#d6d6d6' }}>
                <div className="jumbotron" style={{ backgroundColor: '#d6d6d6', color: '#5a5a5a' }}>
                    <h1 className="display-4">You are logged in!</h1>
                    <p className="lead">You have successfully logged in to your account!</p>
                    <hr className="my-4" />
                    <p>If you want to start listening to music press the button below!</p>
                    <Link className="btn btn-dark btn-lg" to="/music" role="button">Music library</Link>
                </div>
            </div>

    )
}
export default Login