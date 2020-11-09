import React, {Component} from 'react';
import 'react-native-gesture-handler'
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerView } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import SwiperScreen from './views/swiper'
import SignInScreen from './views/signin'
import OtpScreen from './views/otp';
import PasswordScreen from './views/password'
import RegisterScreen from './views/register'
  
import SignUpScreen from './views/signup'
import ForgotPassword from './views/forgotpassword'
import IntroScreen from './views/intro'
import ChangeDeviceScreen from './views/changedevice'
import DashboardScreen from './views/dashboard'
import DrawerComponent from './drawer' 
import DrawerRoute from "./drawerroute";
import ActivityScreen from './views/activity' 
import HistoryScreen from './views/history'
import RequestLoanScreen from './views/requestloan'
import TopUpScreen from './views/topup'
import PayloanScreen from './views/payloan'
import TermsScreen from './views/terms'
import LoanPaymentTypeScreen from './views/loanpaymenttype'
import LoanPaymentWithFidelityScreen from './views/loanpaymentwithfidelity'
import HistoryDetailsScreen from './views/historydetails'
import SuccessRegisterScreen from './views/successregister'
import LandingScreen from './views/landing'
import ProfileScreen from './views/profile'
import PaydayApplicationScreen from './views/paydayapplication'
import ConfirmScreen from './views/confirm'
import LoanBalanceScreen from './views/loanbalance'
import ComponentInactivity from './views/componentinactivity';
const LandingRoute = createStackNavigator({
     Swiper: SwiperScreen,
     SignIn: SignInScreen,
     Otp:OtpScreen,
     Password:PasswordScreen,
     Register:RegisterScreen,
     SuccessRegister:SuccessRegisterScreen,
     Landing:LandingScreen,
     Profile:ProfileScreen ,             




     SignUp: SignUpScreen,
     ForgotPassword:ForgotPassword,
     Dashboard:DashboardScreen,
     Activity:ActivityScreen,
     History:HistoryScreen,
     Request:RequestLoanScreen,  
     TopUp:TopUpScreen,
     ChangeDevice:ChangeDeviceScreen,
     Intro:IntroScreen,
     Payloan:PayloanScreen,
     Terms:TermsScreen,
     LoanPaymentWithFidelity:LoanPaymentWithFidelityScreen,
     LoanPaymentType:LoanPaymentTypeScreen,
     HistoryDetails:HistoryDetailsScreen,
     PaydayApplication:PaydayApplicationScreen,
     Confirm:ConfirmScreen,
     LoanBalance:LoanBalanceScreen
       
}, {    
    initialRouteName:'LoanBalance', 
    headerMode: 'none'
});

// const DashboardTabnavigator = createBottomTabNavigator({
//     Dashboard:DashboardScreen,
//     Payment:PaymentScreen,
//     History:HistoryScreen,
// },
// {
    
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
      
//         if (routeName === 'Dashboard') {
//           iconName = `ios-home`;
         
//         }   
//         else if (routeName === 'Payment') {
//           iconName = `ios-calendar`;
//         }
//         else if (routeName === 'History') {
//           iconName = `ios-add-circle`;
//         }
      
//         return <Ionicons name={iconName} size={horizontal ? 23 : 27} color={tintColor} />;
               
       
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: '#2492D6',
//       inactiveTintColor: 'gray',
//       showLabel:false,
//       animationEnabled:true,
//       SwipeEnabled:true
//     },
//   }
// )

// const DashboardStackNavigator= createStackNavigator({
//     DashboardTabnavigator:DashboardTabnavigator
// },
// {
//     headerMode: 'none'
// }
// )

// const DrawerRoute = createDrawerNavigator({
//     Dashboard: DashboardStackNavigator, 
   
//   },
//   {
//     initialRouteName: 'Dashboard',
//     contentComponent: DrawerComponent,
//     navigationOptions: {
//         gestureDirection: 'inverted'
//     }}
//   );

const MainRoute = createSwitchNavigator({
    LandingRoute: LandingRoute,
    Drawer:DrawerRoute,
}, {
    initialRouteName: 'LandingRoute'
});

   
export default createAppContainer(MainRoute);