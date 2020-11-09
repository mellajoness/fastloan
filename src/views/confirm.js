import React, { Component } from 'react';
import { Text, View ,TouchableOpacity,Image,TextInput,StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import {CustomLoader} from "../shared/activityindicator"
import NumberFormat from 'react-number-format';
import { ScrollView } from 'react-native';
export default class ConfirmScreen extends Component {
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
      <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',textAlign:'center'}}>Confirm Loan</Text>
      </View>
  
     
    </View>
  
      <View style={{alignItems:'center',paddingTop:20,paddingBottom:30}}>
          <Image style={{width:278,height:31}}
                  source={require('../assets/img/loanprogessbar3.png')}
                /> 
          </View> 
  
  
           <View   style={{height:100,backgroundColor:'#0E237E',marginHorizontal:0,borderRadius:5,marginTop:10,paddingHorizontal:10,marginBottom:0,alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>  
               
              <Text style={{paddingLeft:4,color:'#AAAAAA',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:14,paddingTop:30}}>Your total loan balance is</Text>
             </View>
             <NumberFormat renderText={text => <Text style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,paddingTop:10}}>{text}</Text>}value={20000} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
          </View> 


          <ScrollView style={{marginTop:20 ,flex:1}}>
          <View style={{flexDirection:'row'}}>
              <View style={{width:'60%',paddingLeft:40}}>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Bank</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Account Number</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Loan Amount</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Loan Term</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Loan Interest</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Insurance Flat Fee</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Management Flat Fee</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Insurance Fee</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Interest + Fee</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Date Due</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Credit Check Charges</Text>
              </View>

              <View style={{width:'40%'}}>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>Fidelity Bank</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>636726736</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>4646</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>1 month</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>3%</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>46</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>1000</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>I70</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>1 + 499</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>3rd jan 2020</Text>
                  <Text style={{fontSize:14,color:'gray',paddingTop:12}}>500</Text>
             
              </View>
          </View>

          <Text style={{fontSize:14,color:'gray',paddingTop:20,textAlign:'center'}}>Convinence charge of xxxxxxxx will be deducted from your account,confirm you have read and agreed to T&C</Text>
    
    
          <TouchableOpacity style={{height:50,backgroundColor:'#0E237E',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:20,}} >
              <Text style={{color:'white',fontSize:18}}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:50,borderColor:'gray',borderWidth:1,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:20,marginBottom:30}} >
              <Text style={{color:'gray',fontSize:18}}>Reject</Text>
            </TouchableOpacity>


            </ScrollView>

           
     
          </View>
    );
  }
}

