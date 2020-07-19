import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {history} from './../../_helpers/history';


import useStyles from './userLogin.css';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: {},
            password: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        if(Object.keys(this.state.email).length == 0 || Object.keys(this.state.password).length == 0) {
            window.alert("Invalid Username or Password")
        } else {
            return fetch('http://159.65.129.126/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(function res(response) {
                return response.json();
            }).then(token => {
                const tokenString = JSON.stringify(token);
                localStorage.setItem("token", JSON.parse(tokenString).data.token);
                localStorage.setItem("userId", JSON.parse(tokenString).data.user.id);
                localStorage.setItem("userName", JSON.parse(tokenString).data.user.name);
                history.push('/');
                window.location.reload();
            })
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <Container className="main" component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={useStyles.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            style={{borderColor: "#00c853 !important"}}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                        />
                        <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                className={useStyles.submit}
                                onClick={this.loginUser}
                        >
                                Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}



export default Login;