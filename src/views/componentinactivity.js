import React, {Component} from 'react';
// import UserInactivity from 'react-native-user-inactivity';
import DrawerRoute from "../drawerroute";
// import {Alert} from "react-native";
// import {logoutUser} from "./store/actions";
// import {connect} from "react-redux";
// import BackgroundTimer from 'react-native-user-inactivity/lib/BackgroundTimer';

export default class ComponentInactivity extends Component {
    // state = {
    //     active: true,
    // };

    // onAction = (active) => {
    //     this.setState({
    //         active,
    //     });
    // };

    render() {
        // const {active} = this.state;
        // console.log('active', active)
        // if (this.state.active === false) {
        //     Alert.alert(
        //         "Session Timeout",
        //         "Your session has timed out due to inactivity.",
        //         [
        //             {text: 'OK', onPress: () => this.props.navigation.navigate("SignIn")},
        //         ],
        //         {cancelable: false},
        //     );
        // }

        // if (this.props.isLogout === true) {
        // //
        //     this.props.logoutUser(false);
        //     this.props.navigation.navigate("SignIn");
        // }

        return (
            <DrawerRoute/>
        );

        // return (
        //     <UserInactivity
        //         timeForInactivity={10000000}
        //         timeoutHandler={BackgroundTimer}
        //         onAction={this.onAction}
        //         isActive={active}
        //         style={{flex: 1}}>
        
        //         <DrawerRoute/>
        
        //     </UserInactivity>
        // );
    }
}
