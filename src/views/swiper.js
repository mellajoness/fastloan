import React, { Component } from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,StatusBar} from 'react-native'
import Swiper from 'react-native-swiper'
import { GET_COOP_ID, GET_PHONE, GET_SESSION_ID} from '../shared/storage'

export default class SwiperScreen extends Component {

 async componentDidMount() {
  //  this.navUser().done();   
  }  

navUser=async ()=>{
  let coopID=await GET_COOP_ID()
  console.log('swiper COOP ID',coopID)
  if(coopID ===''){
    this.props.navigation.navigate('Password');
  }
  else{
    this.props.navigation.navigate('Swiper');
  }
}





  render() {
    return (    
        <View style={{flex:1,alignItems:'center'}}>
         <StatusBar backgroundColor="#1D3461" barStyle="light-content" />  
        <Swiper style={styles.wrapper} showsButtons={false} 
          //  bounces={true}
           autoplay={true}
           autoplayTimeout={7}
           activeDot={<View style={{backgroundColor: '#1D3461', width: 10, height: 10, borderRadius: 5, marginLeft: 5, marginRight:5}} />}>

        <View style={styles.slide1}>

      
          <Image  
          style={{ resizeMode: 'contain',   
          height: 150}}
          source={require('../assets/img/slide1.png')}
          />  
          <Text style={styles.text}>Instant Loan</Text>
          <Text style={{color:'#4E6083',fontSize:15,paddingTop:20,textAlign:'center'}}>Have your money credited into your account in less than 2 minutes</Text>
          <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignIn')} style={{height:50, width:100,borderRadius:3,borderWidth:1,borderColor:'#1D3461',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
              <Text style={{fontSize:18,color:'#1D3461'}}>Get Started</Text>
          </TouchableOpacity> 
        </View>


  <View style={styles.slide1}> 
          <Image  
          style={{ resizeMode: 'contain',
          height: 150}}
          source={require('../assets/img/slide2.png')}
          />  
        <Text style={styles.text}>Get To Clients</Text>
          <Text style={{color:'#4E6083',fontSize:15,paddingTop:20,textAlign:'center'}}>From the comfort of your home ,do what you want on the go</Text>
          <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignIn')} style={{height:50, width:100,borderRadius:3,borderWidth:1,borderColor:'#1D3461',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
              <Text style={{fontSize:18,color:'#1D3461'}}>Get Started</Text>
          </TouchableOpacity> 
        </View> 


        <View style={styles.slide1}> 
           <Image  
          style={{ resizeMode: 'contain',
          height: 150}}
          source={require('../assets/img/slide3.png')}
          />  
          <Text style={styles.text}>One Click Away</Text>
          <Text style={{color:'#4E6083',fontSize:15,paddingTop:20,textAlign:'center'}}>We deliver services to you,sure place to trust for your business </Text>
          <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignIn')} style={{height:50, width:100,borderRadius:3,borderWidth:1,borderColor:'#1D3461',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
              <Text style={{fontSize:18,color:'#1D3461'}}>Get Started</Text>
          </TouchableOpacity> 
        </View> 
        
      </Swiper>
      </View>
    )  
    
  }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      // paddingTop:50,
      paddingHorizontal:40,
      alignItems: 'center',
      alignContent:'center',
      backgroundColor: 'white',
      justifyContent:'center',

    },
   
    text: {
      color: '#384D74',
      fontSize:25,
      fontWeight: 'bold',
      paddingTop:40
    }
  })
  

