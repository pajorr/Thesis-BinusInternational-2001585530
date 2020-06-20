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
                            <ListItemText primary={"Car Id: " + obj.id} />
                            <ListItemText secondary={"Car Name: " + obj.car_name} />
                            <ListItemText secondary={"Car Type: " + obj.car_type} />
                            <ListItemText secondary={"Car Plate: " + obj.plate_number} />
                            <ListItemText secondary={"Fuel: " + obj.fuel} />
                            <ListItemText secondary={"Car Description: " + obj.description} />
                            <ListItemText secondary={"Price: " + obj.price} />
                            <ListItemText secondary={"Car Image: " + obj.image} />
                            <ListItemText secondary={"Car Status: " + obj.taken} />
                            <Button>Edit</Button>
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

//3. declare as proptype
StaffCarList.propTypes = {
    classes: PropTypes.object.isRequired,
};

//4. use this export statement
export default withStyles(styles)(StaffCarList);