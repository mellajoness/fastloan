import React, { Component } from 'react';
import {Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput,InteractionManager,ToastAndroid} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {CustomLoader} from "../shared/activityindicator"
import {lOGIN_POST_SERVICE} from "../shared/backend";
import NetInfo from "@react-native-community/netinfo";
import {SAVE_SESSION_ID, SAVE_FULL_NAME, SAVE_FIRST_NAME,SAVE_EMAIL,SAVE_PHONE, GET_PHONE, SAVE_LAST_NAME} from "../shared/storage";
export default class SignInScreen extends Component {
    state = {
        phonemail:'08032895804',
        password:'Password@123',
        secureTextEntry:true,
        loading: false,
        secureTextEntry:true,
        iconName:'eye',
        // isConnected:true
    };

  async componentDidMount(){
        await SAVE_SESSION_ID('')  
    }

    showPassword = () => {
        let iconName=(this.state.secureTextEntry ?  'eye-off':'eye')
          this.setState({
              secureTextEntry:!this.state.secureTextEntry,
              iconName:iconName
          });
      };
        

    login = async () => {
        const unsubscribe = NetInfo.addEventListener(state => {
         console.log("Connection type", state.type);
         console.log("Is connected?", state.isConnected);
          });
          // Unsubscribe
          unsubscribe();
        NetInfo.fetch().then(state => {
        if (!state.isConnected) {
            Alert.alert('Network Error',"Check internet connections !");
           } 
           })   
   
        if(this.state.phonemail ==''){
            Alert.alert('Alert','Phone Number cannot be empty')
         }
        else if(this.state.password == ''){
            Alert.alert('Alert','Password cannot be empty')
          } 
        
       else{
       this.setState({loading: true});
        const body = {
            phoneNumber: this.state.phonemail.replace(/^0+/, '234'),
            password: this.state.password,
            deviceId: '79b8f6b41479cde4',
            appVersion:'1'
           
        };
        console.log('my  body',body)
        const endpoint = '/v1/login-controller/login';
  
        try {
            const response = await lOGIN_POST_SERVICE(body, endpoint);
            console.log('signin Response', response);
            this.setState({loading: false});

            if(response.data.code === '00')
            {
               await this.saveUserDetail(response);
            }

            else  
            {
             InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                 Alert.alert('Login Error', response.data.message);
                 });
                });
            }
        } catch (e) {
           this.setState({loading: false});
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                     Alert.alert('Login Error', "Error occurred while trying to login. Try again later.");
                });
            }
            );
            return e.response;
        }}
    };

    async saveUserDetail(resp){
      this.props.navigation.navigate('Dashboard');
      await SAVE_EMAIL(resp.data.data.emailAddress);
      await SAVE_PHONE(resp.data.data.phoneNumber);
      await SAVE_SESSION_ID(resp.data.data.sessionKey);
      await SAVE_FIRST_NAME(resp.data.data.firstName);
      await SAVE_LAST_NAME(resp.data.data.lastName);
    //   await SAVE_FULL_NAME(`${resp.data.data.firstName} ${resp.data.data.lastName}`)
     
    }


    render(){
        return (
            <ImageBackground source={require('../assets/img/app.jpeg')}style={{width: '100%', height: '100%',}}>
             <StatusBar backgroundColor='#1D3461' barStyle="light-content" /> 
             <View style={{flex:1,justifyContent:'center'}}>
             <View style={{alignItems:'center',paddingTop:60}}>
             <Image style={{width:230,height:50}}
                source={require('../assets/img/ff.png')}
             /> 
             <Text style={{color:'white',fontSize:15,fontWeight:'bold',paddingTop:30}}>Powered by Fidelity Bank PLC.</Text>
             </View>
             <ScrollView style={{marginHorizontal:30}}>

              <View style={{paddingTop:50 ,flex:1}}>
                 <TextInput style={{color:'white',borderBottomColor:'white',borderBottomWidth:0.8}}
                    onChangeText={(phonemail) => this.setState({phonemail: phonemail})}
                    placeholder='Phone Number'
                    keyboardType='phone-pad'
                    placeholderTextColor='white'/>
              </View> 

           <View style={{flexDirection:'row'}}>
              <View style={{paddingTop:20 ,flex:1,flexDirection:'row',justifyContent:'space-between',borderBottomColor:'white',borderBottomWidth:0.8}}>
                 <TextInput style={{color:'white'}}
                    onChangeText={(password) => this.setState({password: password})}
                    placeholder='Password'
                    placeholderTextColor='white'
                    secureTextEntry={this.state.secureTextEntry}/>

                    <TouchableOpacity onPress={this.showPassword} >
                    <Feather name={this.state.iconName} size={25} color='white' style={{position:'relative',top:10}}/>
                   </TouchableOpacity> 

              </View> 
             </View>   
  
             <TouchableOpacity onPress={this.login} style={{height:60, width:100,borderRadius:3,borderWidth:0.9,borderColor:'white',justifyContent:'center',width:'100%',alignItems:'center',marginTop:40}}>
                <Text style={{fontSize:22,color:'white',fontWeight:'bold'}}>Sign In</Text>
              </TouchableOpacity>  
             <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignUp')} style={{flexDirection:'row',paddingTop:20,justifyContent:'center',alignItems:'center',}}>
               <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>i do not have an account</Text>
               <Text style={{color:'#3072CF',paddingLeft:10,fontSize:16}}>Create account</Text>
              </TouchableOpacity>
              <View style={{alignItems:'center'}}>
               <TouchableOpacity onPress= {() => this.props.navigation.navigate('ForgotPassword')}> 
               <Text style={{color:'#3072CF',paddingTop:20}}>Forgot Password</Text>
               </TouchableOpacity>  
               <TouchableOpacity onPress= {() => this.props.navigation.navigate('ChangeDevice')}>
               <Text style={{color:'#3072CF',paddingLeft:10,paddingTop:20}}>Change Device</Text>
              </TouchableOpacity>
              </View>
             </ScrollView>  
            <CustomLoader visible={this.state.loading}/>
             </View>
            </ImageBackground>
        );
    }
}
