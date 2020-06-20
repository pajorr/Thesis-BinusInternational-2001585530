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

import useStyles from './staffCarAdd.css';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            car_name: {},
            car_type: {},
            plate_number: {},
            fuel: {},
            description: {},
            price: {},
            image: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.addCar = this.addCar.bind(this);
    }

    addCar() {
        return fetch('http://159.65.129.126/api/cars', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                car_name: this.state.car_name,
                car_type: this.state.car_type,
                plate_number: this.state.plate_number,
                fuel: this.state.fuel,
                description: this.state.description,
                price: this.state.price,
                image: this.state.image
            })
        }).then(function res(response) {
            return response.json();
        })
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
                        Add Car
                    </Typography>
                    <form className={useStyles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="car_name"
                            label="Car Name"
                            name="car_name"
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
                            name="car_type"
                            label="Car Type"
                            id="car_type"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="plate_number"
                            label="Plate Number"
                            id="car_type"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="fuel"
                            label="Fuel"
                            id="fuel"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            id="description"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            id="price"
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="image"
                            label="Image"
                            id="image"
                            onChange={this.handleChange}
                        />
                        <Button component={Link} to="/staff"
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={useStyles.submit}
                                onClick={this.addCar}
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}



export default Login;