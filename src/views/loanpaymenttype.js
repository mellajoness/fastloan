import React, { Component } from "react";
import {Text,View,StatusBar,TouchableOpacity,Image,FlatList,ImageBackground,Dimensions,StyleSheet, Alert} from 'react-native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
export default class LoanPaymentTypeScreen extends Component {
    state = {
      details:{}
       };
   
       componentDidMount(){
        // this.state.details = this.props.navigation.getParam('loanData')
        // console.log('item data',this.state.details)
       }

       payWithFidelity=()=>{
        let data = this.props.navigation.getParam('loanData')
        console.log('item data',data)
         if(data.loanType==='Migo'){
           Alert.alert('migo coming soon')
         }
         else{
          this.props.navigation.navigate('LoanPaymentWithFidelity',{
            data:{
              dayLeft:data.dayLeft,
              disbursedDate:data.disbursedDate,
              dueDate:data.dueDate,
              hoursLeft:data.hoursLeft,
              interest:data.interest,
              loanId:data.loanId,
              loanType:data.loanType,
              minuteLeft:data.minuteLeft,
              operativeAcct:data.operativeAcct,
              principal:data.principal,
              recordId:data.recordId,
              tenor:data.tenor,
              totalExpectedRepayment:data.totalExpectedRepayment,
              totalOutstanding:data.totalOutstanding,
              totalPaid:data.totalPaid
            }}
           );    
     }
         }
       
  
  render() {  
    return (
      <View  style={{flex:1,paddingHorizontal:20}}>
         <TouchableOpacity style={{paddingTop:15}} onPress= {() => this.props.navigation.navigate('Payloan')} > 
            <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
         </TouchableOpacity>
         <Text style={{fontFamily:'Gilroy-Medium',fontSize:17,lineHeight:15,paddingTop:30,color:'#9C9E9B'}}>Choose a convinient channel to pay your loan</Text>

       <View style={{marginTop:60}}>
         <TouchableOpacity  onPress= {()=>this.payWithFidelity()} style={{height:60, width:100,borderRadius:5,borderWidth:0.9,borderColor:'#9C9E9B',justifyContent:'center',width:'100%',alignItems:'center',marginTop:40}}>
             <Text style={{color:'#9C9E9B',justifyContent:'center',fontFamily:'Gilroy-Medium',fontSize:16,lineHeight:15,textAlign:'center'}}>Pay with Fidelity Bank</Text>
         </TouchableOpacity>
         </View>
      </View>
    );
  }
}
