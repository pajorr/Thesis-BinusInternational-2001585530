import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
//0. import propTypes
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import InboxIcon from '@material-ui/icons/Inbox';
import {Link} from 'react-router-dom';

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

class MyBooking extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bookingList: [],
            returnedBookingList: [],
            priceIndex: ""
        }
    }

    getBookingList() {
        fetch('http://159.65.129.126/api/books/' + localStorage.getItem("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(data => {
                const bookData = JSON.stringify(data);
                const obj = JSON.parse(bookData);
                this.setState({...this.state.bookingList, bookingList: obj});
                console.log(this.state.bookingList);
            })
            .catch(err => console.log(err));
    }

    getTotalPrice() {
        fetch('http://159.65.129.126/api/returncars/' + localStorage.getItem("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(data => {
                const bookData = JSON.stringify(data);
                const obj = JSON.parse(bookData);
                this.setState({...this.state.returnedBookingList, returnedBookingList: obj});
                console.log(this.state.bookingList);
            })
            .catch(err => console.log(err));
    }

    returnCar(id) {
        // let today = new Date();
        // let date = today.getFullYear()+"-"+("0" + (today.getMonth() + 1)).slice(-2)+"-"+("0" + today.getDate()).slice(-2);

        return fetch('http://159.65.129.126/api/returncars/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                book_id: id,
                // date_return: date
            })
        }).then(function res(response) {
            return response.json();
        }).then(() => {
            window.location.reload();
        })
    }

    setPaid(obj) {
        fetch('http://159.65.129.126/api/paypal/'+ obj.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => console.log(res))
            .then(() => {
                window.location.reload();
            });
    }

    checkPrice(obj) {
        const vehicleId = obj.vehicle_id;
        return this.state.returnedBookingList.findIndex(obj => obj.vehicle_id === vehicleId);
    }


    checkPaid(obj) {
        if (obj.taken === 1) {
            return (
                <div>
                    <Button onClick={() => this.returnCar(obj.id)}>Return</Button>
                </div>
            )
        }

        if (obj.taken === 0 && obj.paid === true) {
            return (
                <div>
                    Paid
                </div>
            )
        } else {
            const client = {
                sandbox: 'AaqYUsLV0UAleQ_TnpmOLdYT_NKeuZqdsu1lgUh-3k4sLxrERKsXRNuTMYkwDWhy8lyV2r1LsIaavup7',
                production: 'YOUR-PRODUCTION-APP-ID',
            };
            return (
                <div>
                    <PaypalExpressBtn client={client} currency={'AUD'} total={
                        this.state.returnedBookingList[this.checkPrice(obj)].price} onSuccess={() => this.setPaid(obj)}/>
                </div>
            )
        }
    }

    componentDidMount() {
        this.getTotalPrice();
        this.getBookingList();
    }

    renderBookingList() {

        //2. declare prop constant
        const { classes } = this.props;
        return this.state.bookingList.map(obj =>
            (
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Car Name: " + obj.vehicle_name} />
                            <ListItemText secondary={"Car Plate: " + obj.plate_number} />
                            <ListItemText secondary={"Car Image: " + obj.image} />
                            <ListItemText secondary={"Booked By: " + obj.name} />
                            {this.checkPaid(obj)}
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            )
        )
    }

    render() {
        if(this.state.returnedBookingList != null) {
            return (
                <div>
                    <List component="nav" aria-label="main mailbox folders">
                        <Link to="/">
                            <Button>◀ Back</Button>
                        </Link>
                    </List>
                    {this.renderBookingList()}
                </div>
            )
        }
    }
}

//3. declare as proptype
MyBooking.propTypes = {
    classes: PropTypes.object.isRequired,
};

//4. use this export statement
export default withStyles(styles)(MyBooking);