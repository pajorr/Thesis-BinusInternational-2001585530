import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {history} from "../../_helpers/history";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



class StaffRegister extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: {},
            email: {},
            password: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {
        if(Object.keys(this.state.name).length == 0 || Object.keys(this.state.password).length == 0 || Object.keys(this.state.email).length == 0) {
            window.alert("Invalid Username or Password")
        } else {
            fetch('http://159.65.129.126/api/staffregister', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(function res(response) {
                history.push('/');
                window.location.reload();
                return response.json();
            })
                .catch(err => console.log(err));
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Typography component="h1" variant="h5">
                        Staff Sign up
                    </Typography>
                    <form className={useStyles.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Name"
                                    autoFocus
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*<TextField*/}
                            {/*variant="outlined"*/}
                            {/*required*/}
                            {/*fullWidth*/}
                            {/*id="lastName"*/}
                            {/*label="Last Name"*/}
                            {/*name="lastName"*/}
                            {/*autoComplete="lname"*/}
                            {/*/>*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*<FormControlLabel*/}
                            {/*control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                            {/*label="I want to receive inspiration, marketing promotions and updates via email."*/}
                            {/*/>*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={useStyles.submit}
                                        onClick={this.registerUser}
                                    >
                                        Sign Up
                                    </Button>
                            </Grid>

                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" to="/stafflogin">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default StaffRegister;