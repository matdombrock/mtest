import React from 'react';
import TextInput from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { authenticate, checkToken } from '../../../services/api';
import s from './style.module.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: null,
            email: null
        }
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        checkToken(sessionStorage.getItem('moda_token'))
            .then((res) => {
                if (res.authenticated === true)
                    window.location.pathname = '/';
            })
    }

    login() {
        authenticate({
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                if (response.token) {
                    sessionStorage.setItem('moda_token', response.token);
                    sessionStorage.setItem('moda_admin', response.admin);
                    sessionStorage.setItem('moda_username', response.username);
                    window.location.pathname = '/';
                }
            })
    }

    render() {
        return (
            <div className={s.loginContainer}>
                <TextInput
                    id="email"
                    label="email"
                    className={s.email}
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    margin="normal"
                />
                <TextInput
                    id="password"
                    label="password"
                    className={s.password}
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    margin="normal"
                    type="password"
                />
                <Button onClick={this.login} variant="contained" color="primary" className={s.loginButton}>
                    Login
                </Button>
            </div>
        )
    }

}

export default Login;