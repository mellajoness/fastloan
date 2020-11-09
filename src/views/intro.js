import React, { Component } from 'react';
import { StyleSheet,Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput} from 'react-native';
import Entypo from "react-native-vector-icons/dist/Entypo";
import Swiper from 'react-native-swiper';

export default class IntroScreen extends Component {
    state = {
        phoneNumber:'',
        passWord:'',
        secureTextEntry:true,
        loading: false,
    };

    render(){
        return (
            <ImageBackground source={require('../assets/img/app.jpeg')}style={{width: '100%', height: '100%',}}>
             <StatusBar backgroundColor='#1D3461' barStyle="light-content" /> 
             <View style={{flex:1}}>
             <View style={{alignItems:'center',paddingTop:60,paddingHorizontal:30,}}>
             <Image style={{width:230,height:50}}
                source={require('../assets/img/ff.png')}
             /> 

             <View style={{paddingTop:110}}>
             <Text style={{color:'white',fontSize:16,paddingTop:20,textAlign:'center'}}>Hello Pal, welcome to FastLoan, powered by Fidelity Bank PLC.</Text>
             <Text style={{color:'white',fontSize:16,paddingTop:40,textAlign:'center'}}>FastLoan grants you quick loans in less than 2 minutes and repayments have never been easier</Text>
             </View>
             </View>
             <ScrollView style={{marginHorizontal:30}}>

             
        

             <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignUp')} style={{height:60, width:100,borderRadius:3,borderWidth:0.9,borderColor:'white',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>I need a loan !</Text>
              </TouchableOpacity>  
             <TouchableOpacity onPress= {()=> this.props.navigation.navigate('SignIn')} style={{flexDirection:'row',paddingTop:50,justifyContent:'center',alignItems:'center',}}>
               <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Sign In</Text>
              </TouchableOpacity>
             
             </ScrollView>  
             </View>
            </ImageBackground>
        );
    }
}
