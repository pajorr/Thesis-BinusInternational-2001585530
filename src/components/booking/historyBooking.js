import React from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";



const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: '#ffffff',
    },
    listStyle: {
        textAlign: 'center'
    }
});

class historyBooking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookingList: []
        }
    }

    getBookingList() {
        fetch('http://159.65.129.126/api/carbookhistory/' + localStorage.getItem("userId"), {
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

    componentDidMount() {
        this.getBookingList();
    }

    render() {
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
                            <ListItemText secondary={"Description: " + obj.description} />
                            <ListItemText secondary={"Plate No.: " + obj.plate_number} />
                            <ListItemText secondary={"Booking date: " + obj.book_date} />
                            <ListItemText><Link to="/trackvehicle" style={{textDecorationLine: 'none'}}><Button>Track Car</Button></Link></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            )
        )
    }
}

historyBooking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(historyBooking);