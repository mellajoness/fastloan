import React, { Component } from 'react';
import { Text, View ,TouchableOpacity,Image,TextInput,StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import {CustomLoader} from "../shared/activityindicator"
import NumberFormat from 'react-number-format';
import { ScrollView } from 'react-native';
export default class PaydayApplicationScreen extends Component {
 state={
  totalEligibleAmount:20000
 }
  componentDidMount(){
  //   let pushedData= this.props.navigation.getParam('data').data
  //   console.log('pushed data compdid mount',pushedData)
   }

  render() {
    return (
      <View style={{flex:1,paddingHorizontal:20,backgroundColor:'white'}}>
        <StatusBar backgroundColor="#0E237E" barStyle="light-content" />
        
      <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Request')} > 
       <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
      </TouchableOpacity> 
      <View style={{flex:1}}>
      <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',textAlign:'center'}}>Loan Offer</Text>
      </View>
  
     
    </View>
  
      <View style={{alignItems:'center',paddingTop:20,paddingBottom:30}}>
          <Image style={{width:278,height:31}}
                  source={require('../assets/img/loanofferprogress1.png')}
                /> 
          </View> 
  
  
           <View   style={{height:100,backgroundColor:'#0E237E',marginHorizontal:0,borderRadius:5,marginTop:10,paddingHorizontal:10,marginBottom:0,alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>  
               
              <Text style={{paddingLeft:4,color:'#AAAAAA',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:14,paddingTop:30}}>Your total loan balance is</Text>
             </View>
             <NumberFormat renderText={text => <Text style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,paddingTop:10}}>{text}</Text>}value={20000} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
          </View> 


          <ScrollView style={{paddingTop:50 ,flex:1}}>
          <Text style={{color:'gray',fontSize:15,}}>Loan Amount</Text>
          <View style={{paddingTop:10}}>
                 <TextInput style={{color:'gray',borderBottomColor:'gray',borderWidth:0.8,borderRadius:5,}}  
                    onChangeText={(phonemail) => this.setState({phonemail: phonemail})}
                    placeholder=''
                    keyboardType='numeric'
                    placeholderTextColor='white'/>
              </View> 

            <TouchableOpacity style={{height:50,backgroundColor:'#0E237E',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:20}} >
              <Text style={{color:'white',fontSize:18}}>Proceed</Text>
            </TouchableOpacity>

            </ScrollView>

           
     
          </View>
    );
  }
}

