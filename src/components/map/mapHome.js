import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import carIcon from './../../rsc/topcar.png';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import style from './mapHome.css';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";


import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Booking from "./../booking/userBooking";

export class mapHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            carList: [],
            loading: true,
            selectedCar: ""
        };

        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleSelectCar = this.handleSelectCar.bind(this);
    }

    handleExpandClick() {
        if(this.state.expanded === false) {
            this.setState({...this.state.expanded, expanded: true});
        } else {
            this.setState({...this.state.expanded, expanded: false});
        }
    }

    handleSelectCar(car) {
        this.setState({...this.state.selectedCar, selectedCar: this.state.carList.findIndex(obj => obj.car_name === car)});
        this.renderBookingForm();
    }

    onMarkerClick(obj) {
        this.handleSelectCar(obj.car_name);
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
                //const resp =  axios.get(`http://159.65.129.126/api/cars/1`);
                this.setState({...this.state.carList, carList: obj}); //how to set a state value
                // this.setState({...this.state.carList, selectedCar: obj})
                console.log(this.state.carList);
                this.setState({data, loading: false});
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getCar();
        console.log(this.state.selectedCar);
    }

    renderCarList() {
        return this.state.carList.map(obj =>
            (
                <Card className={style.card} style={{width: '100%', marginBottom: '16px'}}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Car" className={style.avatar}>
                                {obj.id}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title = {obj.car_name}
                        subheader={obj.car_type}
                    />
                    <CardMedia
                        className={style.media}
                        image="./component/images/car.jpg"
                        title={style.car_name}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            price: {obj.price}
                            <br/>
                            fuel: {obj.fuel}
                            <br/>
                            plate_number: {obj.plate_number}
                            <br/>
                        </Typography>
                        <Button onClick={() => this.handleSelectCar(obj.car_name) /*this is how you properly fire a button method*/}>Book</Button>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Card Content</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ));
    }

    renderCarMarkers() {
        return this.state.carList.map(obj => (
            <Marker
                position={{ lat: obj.latitude, lng: obj.longitude}}
                icon={{
                    url: carIcon,
                    anchor: new this.props.google.maps.Point(9,19),
                    scaledSize: new this.props.google.maps.Size(18,38)
                }}
                onClick={() => this.onMarkerClick(obj)}
            />
        ))
    }

    renderBookingForm() {
        if(this.state.selectedCar !== "") {
            return (<Booking data={this.state.selectedCar}/>)
        } else {
            return (
                <div>
                    <Grid container spacing={2} styling={{width: '100vh'}}>
                        <Grid item md={4} xs={12}>
                            <div style={{maxHeight: 680, overflow: 'auto', maxWidth: 600}}>
                                {this.renderCarList()}
                            </div>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Map
                                google={this.props.google}
                                zoom={8}
                                style={mapStyles}
                                initialCenter={{lat: -37.8083605, lng: 144.9646012}}
                            >
                                {this.renderCarMarkers()}
                            </Map>
                        </Grid>
                    </Grid>
                    {/*<div className={style.root} style={{background: "linear-gradient(45deg, #00c853 10%, #69f0ae 30%, #b9f6ca 90%)", color: "#fdfdfd", marginTop: "20px"}}>*/}
                        {/*<Container component="main" className={style.main} maxWidth="sm">*/}
                            {/*<Typography variant="h2" component="h1" gutterBottom style={{paddingTop: 20}}>*/}
                                {/*GoCar*/}
                            {/*</Typography>*/}
                            {/*<Typography variant="h5" component="h2" gutterBottom>*/}
                                {/*{'We are your number one solution to ride sharing.'}*/}
                            {/*</Typography>*/}
                            {/*<Typography variant="body1">Ride with us now.</Typography>*/}
                        {/*</Container>*/}
                        {/*<footer className={style.footer} style={{paddingBottom: 20}}>*/}
                            {/*<Container maxWidth="sm">*/}
                                {/*<Typography variant="body1">RMITⒸ Adrian, Ayrton, Dylan, Yonas</Typography>*/}
                            {/*</Container>*/}
                        {/*</footer>*/}
                    {/*</div>*/}
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderBookingForm()}
            </div>
        )
    }
}


const mapStyles = {
    width: '65vw',
    height: '88%',
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBMvbu73pJlnSlCobcEH9MgOVwXrv8dyKc'
})(mapHome);
