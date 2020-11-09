import React, { Component } from 'react';
import { StyleSheet,Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput} from 'react-native';
import Entypo from "react-native-vector-icons/dist/Entypo";
import Swiper from 'react-native-swiper';

export default class ChangeDeviceScreen extends Component {
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
             <Text style={{color:'white',fontSize:22,fontWeight:'bold',paddingTop:30}}>Change Device</Text>
             </View>
             <ScrollView style={{marginHorizontal:30}}>

              <View style={{paddingTop:50 ,flex:1}}>
                 <TextInput style={{color:'white',borderBottomColor:'white',borderBottomWidth:0.8}}
                    onChangeText={(phoneNumber) => this.setState({phoneNumber: phoneNumber})}
                    placeholder='Mobile Number'
                    keyboardType='phone-pad'
                    placeholderTextColor='white'/>
              </View> 

              <View style={{paddingTop:20 ,flex:1}}>
                 <TextInput style={{color:'white',borderBottomColor:'white',borderBottomWidth:0.8}}
                    onChangeText={(password) => this.setState({password: password})}
                    placeholder='Password'
                    placeholderTextColor='white'
                    secureTextEntry={this.state.secureTextEntry}/>
              </View> 

             <TouchableOpacity style={{height:60, width:100,borderRadius:3,borderWidth:0.8,borderColor:'white',justifyContent:'center',width:'100%',alignItems:'center',marginTop:40}}>
                <Text style={{fontSize:22,color:'white',fontWeight:'bold'}}>Sign In</Text>
              </TouchableOpacity>  
             <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')} style={{flexDirection:'row',paddingTop:30,justifyContent:'center',alignItems:'center',}}>
               <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>i do not want to continue</Text>
               <Text style={{color:'#3072CF',paddingLeft:10,fontSize:16}}>log in</Text>
              </TouchableOpacity>
              <View style={{alignItems:'center'}}>
             
              </View>
             </ScrollView>  
             </View>
            </ImageBackground>
        );
    }
}
