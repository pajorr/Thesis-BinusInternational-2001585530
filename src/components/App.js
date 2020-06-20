import React from 'react';
import './App.css';
import MenuAppBar from "./menuappbar/MenuAppBar";
import { Router, Route } from 'react-router-dom';
import Login from "./login/userLogin";
import Register from "./register/userRegister";
import mapHome from "./map/mapHome";
import {history} from "../_helpers/history";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import Booking from "./booking/userBooking";
import paypal from "./payment/paypal";
import StaffRegister from "./register/staffRegister";
import StaffLogin from "./login/staffLogin";
import StaffLanding from "./landing/staffLanding";
import StaffBooking from "./staff/staffBooking";
import StaffUserList from "./staff/staffUserList";
import StaffCarList from "./staff/staffCarList";
import MyBooking from "./booking/userMyBookings";
import StaffCarAdd from "./staff/staffCarAdd";
import Redirect from "react-router-dom/es/Redirect";

export class App extends React.Component {

    checkLoggedIn() {
        if(localStorage.getItem("token") != null) {
            return(
                <div>
                    <Router history={history}>
                        <MenuAppBar/>
                    </Router>
                    <Router history={history}>
                        <div className="App-body">
                            <Route exact path="/" component={mapHome}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/staffregister" component={StaffRegister}/>
                            <Route path="/stafflogin" component={StaffLogin}/>
                            <Route path="/staff" component={StaffLanding}/>
                            <Route path="/staffbooking" component={StaffBooking}/>
                            <Route path="/staffuserlist" component={StaffUserList}/>
                            <Route path="/staffcarlist" component={StaffCarList}/>
                            <Route path="/mybookings" component={MyBooking}/>
                            <Route path="/staffaddcar" component={StaffCarAdd}/>
                            {/*<Route render={() => <Redirect to="/" />} />*/}
                        </div>
                    </Router>
                </div>
            )
        } else {
            return(
                <div>
                    <Router history={history}>
                        <MenuAppBar/>
                    </Router>
                    <Router history={history}>
                        <div className="App-body">
                            <Route exact path="/" component={mapHome}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/staffregister" component={StaffRegister}/>
                            <Route path="/stafflogin" component={StaffLogin}/>
                            <Route path="/staff" component={StaffLanding}/>
                            <Route path="/staffbooking" component={StaffBooking}/>
                            <Route path="/staffuserlist" component={StaffUserList}/>
                            <Route path="/staffcarlist" component={StaffCarList}/>
                            <Route path="/staffaddcar" component={StaffCarAdd}/>
                            {/*<Route render={() => <Redirect to="/" />} />*/}
                        </div>
                    </Router>
                </div>
            )
        }
    }

  render() {
        return(
            <div>
                {this.checkLoggedIn()}
            </div>
        )
  }
}

const mapStyles = {
    width: '100%',
    height: '100%',
};


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBMvbu73pJlnSlCobcEH9MgOVwXrv8dyKc'
})(App);
