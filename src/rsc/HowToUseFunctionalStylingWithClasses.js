import React from 'react';
//0. import propTypes
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

//1. declare style as function var
const styles = theme => ({
    buttonStyle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px'
    },
});

class StaffLandingExample extends React.Component {
    render() {
        //2. declare prop constant
        const { classes } = this.props;
        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Button
                            className={classes.buttonStyle}
                        >
                            Button 1
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

//3. declare as proptype
StaffLandingExample.propTypes = {
    classes: PropTypes.object.isRequired,
};

//4. use this export statement
export default withStyles(styles)(StaffLandingExample);