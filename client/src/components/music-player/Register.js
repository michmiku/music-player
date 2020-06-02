import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Settings from "../../Settings.json"

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '', success: false });
    const handleSubmit = e => {
        e.preventDefault();

        const userData = {
            username: user.username,
            password: user.password
        }
        axios.post(Settings.server + "users/add", userData)
            .then(res => setUser({ success: true }))
            .catch(err => {
                alert("Username is already taken!")
                setUser({ username: '', password: '', success: false })
            });
    }

    return (
        !user.success ?
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
                            <input type="submit" value="Register" className="btn btn-dark" />
                        </div>
                    </form>
                </div>
            </div>
            :
            <div style={{ width: '100vw', height: 'calc(100vh - 49px)', backgroundColor: '#d6d6d6' }}>
                <div className="jumbotron" style={{ backgroundColor: '#d6d6d6', color: '#5a5a5a' }}>
                    <h1 className="display-4">You are registered!</h1>
                    <p className="lead">You have successfully created your account!</p>
                    <hr className="my-4" />
                    <p>To start browsing and listening music press the button below to log in to your account!</p>
                    <Link to="/login" className="btn btn-dark btn-lg" href="#" role="button">Login</Link>
                </div>
            </div>
    )
}
export default Register