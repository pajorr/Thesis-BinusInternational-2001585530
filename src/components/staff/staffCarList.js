import React from 'react';
//0. import propTypes
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import InboxIcon from '@material-ui/icons/Inbox';
import { Link } from 'react-router-dom';
import EditVehicle from "./staffEditVehicle";

//1. declare style as function var
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: '#ffffff',
    },
    listStyle: {
        textAlign: 'center'
    }
});

class StaffCarList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            carList: [],
            editVehicle: false,
            selectedVehicle: {}
        }
    }

    getBookingList() {
        fetch('http://159.65.129.126/api/cars', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(data => {
                const bookData = JSON.stringify(data);
                const obj = JSON.parse(bookData);
                this.setState({...this.state.carList, carList: obj});
                console.log(this.state.carList);
            })
            .catch(err => console.log(err));
    }

    deleteVehicle(id) {
        fetch('http://159.65.129.126/api/cars/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).catch(err => console.log(err));
    }

    editVehicle(obj) {
        this.setState({...this.state.editVehicle, editVehicle: true});
        this.setState({...this.state.selectedVehicle, selectedVehicle: obj});
    }

    renderVehicleList() {
        if(this.state.editVehicle === true) {
            return(<EditVehicle data={this.state.selectedVehicle}/>)
        } else {
            return(
                <div>
                    <List component="nav" aria-label="main mailbox folders">
                        <Link to="/staff">
                            <Button>◀ Back</Button>
                        </Link>
                        <Link to="/staffaddcar">
                            <Button>Add</Button>
                        </Link>
                    </List>
                    {this.renderCarList()}
                </div>
            )
        }
    }

    componentDidMount() {
        this.getBookingList();
    }

    renderCarList() {

        //2. declare prop constant
        const { classes } = this.props;
        return this.state.carList.map(obj =>
            (
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Vehicle Id: " + obj.id} />
                            <ListItemText secondary={"Staff Id: " + obj.staff_id} />
                            <ListItemText secondary={"Vehicle3 Name: " + obj.vehicle_name} />
                            <ListItemText secondary={"Vehicle Category: " + obj.vehicle_category} />
                            <ListItemText secondary={"Vehicle Type: " + obj.vehicle_type} />
                            <ListItemText secondary={"Vehicle Plate: " + obj.plate_number} />
                            <ListItemText secondary={"Fuel: " + obj.fuel} />
                            <ListItemText secondary={"Vehicle Description: " + obj.description} />
                            <ListItemText secondary={"Price: " + obj.price} />
                            <ListItemText secondary={"Longitude: " + obj.longitude} />
                            <ListItemText secondary={"Latitude: " + obj.latitude} />
                            <ListItemText secondary={"Status: " + obj.taken} />
                            <Button onClick={() => this.editVehicle(obj)}>Edit</Button>
                            <Button onClick={() => this.deleteVehicle(obj.id)}>Delete</Button>
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            )
        )
    }

    render() {
        return(
            <div>
                {this.renderVehicleList()}
            </div>
        )
    }
}

//3. declare as proptype
StaffCarList.propTypes = {
    classes: PropTypes.object.isRequired,
};

//4. use this export statement
export default withStyles(styles)(StaffCarList);