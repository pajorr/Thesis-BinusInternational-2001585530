import React from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "../login/userLogin.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {history} from "../../_helpers/history";

class EditUser extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: localStorage.getItem("userName"),
            password: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    editUser() {
        if(Object.keys(this.state.name).length == 0 || Object.keys(this.state.password).length == 0) {
            window.alert("Invalid Username or Password")
        } else {
            return fetch('http://159.65.129.126/api/users/' + localStorage.getItem("userId"), {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    password: this.state.password
                })
            }).then(function res(response) {
                history.push('/');
                return response.json();
            })
        }
    }

    render() {
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Typography component="h1" variant="h5">
                        Edit Profile
                    </Typography>
                    <form className={useStyles.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User Name"
                            name="name"
                            autoFocus
                            style={{borderColor: "#00c853 !important"}}
                            value={this.state.name}
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
                                onClick={this.editUser}
                        >
                            Confirm Edit
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default EditUser;