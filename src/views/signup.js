import React, { Component } from 'react';
import { StyleSheet,Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput} from 'react-native';
import Entypo from "react-native-vector-icons/dist/Entypo";
import Swiper from 'react-native-swiper';

export default class SignUpScreen extends Component {
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
             <View style={{alignItems:'center',paddingTop:60}}>
             <Image style={{width:230,height:50}}
                source={require('../assets/img/ff.png')}
             /> 
             <Text style={{color:'white',fontSize:21,fontWeight:'bold',paddingTop:50}}>What's your mobile number ?</Text>
             </View>
             <ScrollView style={{marginHorizontal:30}}>

              <View style={{paddingTop:130 ,flex:1}}>
                 <TextInput style={{color:'white',borderBottomColor:'white',borderBottomWidth:0.8}}
                    onChangeText={(phoneNumber) => this.setState({phoneNumber: phoneNumber})}
                    placeholder='Mobile Number'
                    keyboardType='phone-pad'
                    placeholderTextColor='white'/>
              </View> 

        

             <TouchableOpacity style={{height:60, width:100,borderRadius:3,borderWidth:0.9,borderColor:'white',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
                <Text style={{fontSize:22,color:'white',fontWeight:'bold'}}>Proceed</Text>
              </TouchableOpacity>  
             <TouchableOpacity onPress= {()=> this.props.navigation.navigate('Intro')} style={{flexDirection:'row',paddingTop:50,justifyContent:'center',alignItems:'center',}}>
               <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>I'm no longer interested</Text>
              </TouchableOpacity>
             
             </ScrollView>  
             </View>
            </ImageBackground>
        );
    }
}
