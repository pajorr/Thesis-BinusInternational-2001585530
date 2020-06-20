import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
    buttonStyle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 320,
        width: 480,
        padding: '0 30px',
    },
    gridStyle: {
        textAlign: 'center',
    }
});

class StaffLanding extends React.Component {

    logoutUser() {
        localStorage.removeItem("stafftoken");
        localStorage.removeItem("staffid");
        localStorage.removeItem("staffname");
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Grid container spacing={2} className={classes.gridStyle}>
                    <Grid item xs={4}>
                        <Link to="/staffbooking">
                            <Button
                                className={classes.buttonStyle}
                            >
                                Booking List
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/staffuserlist">
                            <Button
                                className={classes.buttonStyle}
                            >
                                User List
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to={"/staffcarlist"}>
                            <Button
                                className={classes.buttonStyle}
                            >
                                Car List
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            className={classes.buttonStyle}
                        >
                            Edit Your Details
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            className={classes.buttonStyle}
                        >
                            Manual
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to={"/"}>
                            <Button
                                className={classes.buttonStyle}
                                onClick={() => this.logoutUser()}
                            >
                                Logout
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

StaffLanding.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaffLanding);