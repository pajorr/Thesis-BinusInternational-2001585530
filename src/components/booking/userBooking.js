import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paypal from './../payment/paypal';
import DateFnsUtils from '@date-io/date-fns';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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

class Booking extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            carList: [],
            carSelected: '',
            loading: true,
            userId: '',
            paid: "",
            date: "2019-01-01",
            duration: ""
        };

        this.getCar = this.getCar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.bookCar = this.bookCar.bind(this);
    }

    getCar() {
        fetch('http://159.65.129.126/api/cars', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(data => {
                const carData = JSON.stringify(data);
                const obj = JSON.parse(carData);
                this.setState({...this.state.carList, carList: obj}); //how to set a state value
                console.log(this.state.carList);
                this.setState({data, loading: false});
            })
            .catch(err => console.log(err));
    };

    renderCarList() {
        return this.state.carList.map(obj => (
            <MenuItem value={obj.id}>
                {obj.vehicle_name}
            </MenuItem>
        ));
    }

    bookCar() {
        fetch('http://159.65.129.126/api/books', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.userId,
                vehicle_id: this.state.carSelected + 1,
            })
        }).then(res => res.json())
            .catch(err => console.log(err));

        setTimeout(() => {
            this.setState({...this.state.carSelected, carSelected: ""});
            window.location.reload();
        }, 5000);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleDateChange(e, date) {
        console.log(date);
        this.setState({
            date: date
        });
    }

    // ButtonPaidCheck() {
    //     if(this.state.paid === "paid") {
    //         return(
    //
    //         )
    //     } else {
    //         return(
    //             <Button
    //                 type="button"
    //                 fullWidth
    //                 variant="contained"
    //                 className={useStyles.submit}
    //                 disabled
    //                 onClick={() => this.bookCar()}
    //             >
    //                 Book
    //             </Button>
    //         )
    //     }
    //}

    componentDidMount() {
        this.getCar();
        console.log(this.props.data);

        this.setState({...this.state.carSelected, carSelected: this.props.data});
        this.setState({...this.state.userId, userId: localStorage.getItem("userId")});
    }

    render() {
        if(this.state.loading) {
            return 'Loading...'
        }

        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Avatar className={useStyles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Booking
                    </Typography>
                    <form className={useStyles.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="userId"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="User ID"
                                    autoFocus
                                    disabled
                                    value={localStorage.getItem("userId")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="carSelected"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Car Selected"
                                    autoFocus
                                    disabled
                                    value={this.state.carList[this.props.data].vehicle_name}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                                    {/*<KeyboardDatePicker*/}
                                        {/*margin="normal"*/}
                                        {/*id="date-picker-dialog"*/}
                                        {/*label="Date picker dialog"*/}
                                        {/*format="yyyy-MM-dd"*/}
                                        {/*value={this.state.date}*/}
                                        {/*onChange={this.handleDateChange.bind(this)}*/}
                                        {/*KeyboardButtonProps={{*/}
                                            {/*'aria-label': 'change date',*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</MuiPickersUtilsProvider>*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={12}>*/}
                                {/*<TextField*/}
                                    {/*autoComplete="fname"*/}
                                    {/*name="duration"*/}
                                    {/*variant="outlined"*/}
                                    {/*required*/}
                                    {/*fullWidth*/}
                                    {/*label="Duration"*/}
                                    {/*autoFocus*/}
                                    {/*onChange={this.handleChange}*/}
                                {/*/>*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <div onClick={() => this.setState({...this.state.paid, paid: "paid"})}>
                                </div>
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                                {/*<PaypalExpressBtn client={client} currency={'AUD'} total={1.00} onSuccess={() => this.setState({...this.state.paid, paid: 'paid'})} />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <Link to="/">
                                    <Button
                                        id="bookingbutton"
                                        name="bookingbutton"
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        className={useStyles.submit}
                                        onClick={() => this.bookCar()}
                                    >
                                        Book
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Booking;