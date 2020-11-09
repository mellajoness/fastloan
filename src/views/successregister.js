import React, { Component } from 'react';
import {Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput,InteractionManager,ToastAndroid,Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {CustomLoader} from "../shared/activityindicator"
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {lOGIN_POST_SERVICE} from "../shared/backend";
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from "react-native-linear-gradient";
import {SAVE_SESSION_ID, SAVE_FULL_NAME, SAVE_FIRST_NAME,SAVE_EMAIL,SAVE_PHONE, GET_PHONE, SAVE_LAST_NAME} from "../shared/storage";
export default class SuccessRegisterScreen extends Component {

    render(){
        return (
            <View style={{flex:1}}>
              <StatusBar backgroundColor="#480909" barStyle="light-content" />

              <LinearGradient colors={['#851616','#B5311F', '#F51F1F' ]} style={{backgroundColor:'#851616',display:'flex',height: Dimensions.get('screen').height}}>
              <View style={{alignItems:'center',display:'flex',flex:1,justifyContent:'center',marginHorizontal:20}}>

           <View style={{height:150,width:150,borderRadius:150,backgroundColor:'white',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
             <FontAwesome name='check' size={100} color='#851616' style={{}}/>  
           </View>
              

               <Text style={{color:'white',fontSize:27,fontWeight:'bold',paddingTop:20}}>Successful</Text>
               <TouchableOpacity onPress= {() => this.props.navigation.navigate('Password')} style={{height:60, width:100,borderRadius:3,borderWidth:1,borderColor:'white',justifyContent:'center',width:'100%',alignItems:'center',marginTop:90}}>
                <Text style={{fontSize:18,color:'white'}}>Proceed</Text>
                </TouchableOpacity> 
               </View>
              </LinearGradient>
           
            </View>    
        );
    }
}
