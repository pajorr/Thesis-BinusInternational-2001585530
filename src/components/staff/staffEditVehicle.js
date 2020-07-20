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

class EditVehicle extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            vehicle_name: {},
            vehicle_type: {},
            vehicle_category: {},
            plate_number: {},
            fuel: {},
            description: {},
            price: {},
            image: {},
            latitude: {},
            longitude: {},
            staff_id: {},
            selectedVehicle: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.addCar = this.addCar.bind(this);
    }

    addCar() {
        return fetch('http://159.65.129.126/api/cars', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vehicle_name: this.state.vehicle_name,
                vehicle_type: this.state.vehicle_type,
                vehicle_category: this.state.vehicle_category,
                plate_number: this.state.plate_number,
                fuel: this.state.fuel,
                description: this.state.description,
                price: this.state.price,
                image: this.state.image,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                staff_id: this.state.staff_id
            })
        }).then(function res(response) {
            console.log("car add");
            return response.json();
        })
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        this.setState({...this.state.selectedVehicle, selectedVehicle: this.props.data});
        console.log(this.state.selectedVehicle);
    }

    render() {
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Typography component="h1" variant="h5">
                        Edit Vehicle
                    </Typography>
                    <form className={useStyles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="vehicle_name"
                            label="Vehicle Name"
                            name="vehicle_name"
                            autoComplete="email"
                            autoFocus
                            style={{borderColor: "#00c853 !important"}}
                            onChange={this.handleChange}
                            value={this.state.selectedVehicle.vehicle_name}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="vehicle_type"
                            label="Vehicle Type"
                            id="vehicle_type"
                            onChange={this.handleChange}
                            value={this.state.selectedVehicle.vehicle_type}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="vehicle_category"
                            label="Vehicle Category"
                            id="vehicle_category"
                            onChange={this.handleChange}
                            value={this.state.selectedVehicle.vehicle_category}
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
                            value={this.state.selectedVehicle.plate_number}
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
                            value={this.state.selectedVehicle.fuel}
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
                            value={this.state.selectedVehicle.description}
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
                            value={this.state.selectedVehicle.price}
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
                            value={this.state.selectedVehicle.image}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="latitude"
                            label="Latitude"
                            id="latitude"
                            onChange={this.handleChange}
                            value={this.state.selectedVehicle.latitude}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="longitude"
                            label="Longitude"
                            id="longitude"
                            onChange={this.handleChange}
                            value={this.state.selectedVehicle.longitude}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="staff_id"
                            label="Staff Id"
                            id="staff_id"
                            onChange={this.handleChange}
                            value={this.state.selectedVehicle.staff_id}
                        />
                        <Button
                            type="button"
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



export default EditVehicle;