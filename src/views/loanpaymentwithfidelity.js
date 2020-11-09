import React, { Component } from "react";
import { Text, View,TouchableOpacity,StatusBar,Picker,Alert,InteractionManager } from "react-native";
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import {GET_PHONE,GET_SESSION_ID, GET_FIRST_NAME,GET_LAST_NAME,GET_EMAIL, GET_CUSTID, GET_ACCOUNT_NUMBER, GET_IS_STAFF, GET_BVN} from "../shared/storage";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {CustomLoader} from "../shared/activityindicator"
import NumberFormat from 'react-number-format';
import moment from 'moment';   
import { ScrollView } from "react-native-gesture-handler";
import {RNPickerSelect} from '@react-native-community/picker';
import NetInfo from "@react-native-community/netinfo";

export default class LoanPaymentWithFidelityScreen extends Component {
  state = {  
    loading: false,
  };
    componentDidMount(){
        let xx= this.props.navigation.getParam('data').totalOutstanding
        console.log('item data compdid mount',xx)
       }
      
    payWithFidelityAcc = async () =>{
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
   
       this.setState({loading: true});
        const body = {
          loanAccount: this.props.navigation.getParam('data').loanId,
          amount: this.props.navigation.getParam('data').totalOutstanding,
          operativeAccount: this.props.navigation.getParam('data').operativeAcct,   
        };
        console.log('my  body',body)
        const endpoint = 'Loan/Crash';
        console.log('endpoint',endpoint)
        try {
            const response = await POST_SERVICE(body, endpoint);
            console.log('payment Response', response);
            this.setState({loading: false});

            if(response.responseCode === '00')
            {
              Alert.alert('Successful', response.data.message);
              this.props.navigation.navigate('Dashboard');
            }

            else  
            {
             InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                 Alert.alert('Error', response.data.message);
                 this.props.navigation.navigate('Dashboard');
                 });
                });
            }
        } catch (e) {
           this.setState({loading: false});
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                     Alert.alert('Payment Error', "Error occurred while trying to pay loan. Try again later.");
                });
            }
            );
            return e.response;
        }
    };
     

  render() {
    let totalOutstanding= this.props.navigation.getParam('data').totalOutstanding
   let operativeAcct=this.props.navigation.getParam('data').operativeAcct
    return (
      <View>
       <StatusBar backgroundColor="#1D3461" barStyle="light-content" />
       <ScrollView style={{backgroundColor:'white',height:'100%'}}> 
        <View style={{height:50,backgroundColor:'white',flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
          <TouchableOpacity  onPress= {() => this.props.navigation.navigate('LoanPaymentType')} > 
           <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
          </TouchableOpacity> 
          <View style={{display:'flex',alignContent:'center',justifyContent:'center',alignSelf:'center',flex:1}}> 
          <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',textAlign:'center'}}>Pay A Loan</Text>
          </View>
        </View>  

        <Text style={{paddingHorizontal:20,fontFamily:'Gilroy',fontSize:17,lineHeight:22,color:'#9C9E9B',paddingTop:50}}>Please select an active loan to payback</Text>
        <View style={{height:100,backgroundColor:'#0E237E',marginHorizontal:0,borderRadius:5,marginTop:20,paddingHorizontal:10,marginBottom:20,marginLeft:20,marginRight:20,alignItems:'center'}}>
         <View style={{flexDirection:'row'}}>   
         <Text style={{paddingLeft:4,color:'#AAAAAA',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:14,paddingTop:30}}>Your total loan balance is</Text>
         </View>
         <NumberFormat renderText={text => <Text  style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,paddingTop:10}}>{text}</Text>} value={totalOutstanding} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
       </View> 
   
      <View style={{backgroundColor:'white',borderColor:'gray',borderRadius:5,marginTop:25,marginHorizontal:20,borderWidth:1}}>    
       <Picker
          placeholder="Start Year"   
          selectedValue={operativeAcct}
          style={{height: 50, width:'100%'}}
          onValueChange={(itemValue, itemIndex) =>  
          this.setState({operativeAcct: itemValue})}>

          <Picker.Item label={operativeAcct} value={operativeAcct} />
          {/* <Picker.Item label="JavaScript" value="js" />   */}
       </Picker>
     </View> 
    
     <TouchableOpacity  onPress= {this.payWithFidelityAcc} style={{backgroundColor:'#0E237E',borderColor:'gray',borderRadius:5,marginTop:65,marginHorizontal:20,height:50,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:17,fontWeight:'bold',lineHeight:22}}>Pay</Text>
     </TouchableOpacity>
       </ScrollView>
       <CustomLoader visible={this.state.loading}/>
      </View>
    );
  }
}   
