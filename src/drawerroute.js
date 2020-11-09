import 'react-native-gesture-handler'
import {createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import DrawerComponent from "./drawer";
import DashboardScreen from "./views/dashboard";   
import LandingScreen from './views/landing'  

const LandingRoute = createStackNavigator({
    Landing: LandingScreen,
    // TransferReq: TransferRequestScreen,
}, {
    initialRouteName:'Landing',
    headerMode: 'none'
});

const DrawerRoute = createDrawerNavigator({
    Landing: LandingRoute,
    // Account:AccountScreen
    // Profile: ProfileScreen,
    //  Message: MessageScreen,
    //  MessageComponent:MessageComponent,
    // Loan: LoanScreen,
    // Cheque: ChequeScreen,
}, {
    initialRouteName: 'Landing',
    contentComponent: DrawerComponent,
    navigationOptions: {
        gestureDirection: 'inverted'
    }
});

export default createAppContainer(DrawerRoute);
