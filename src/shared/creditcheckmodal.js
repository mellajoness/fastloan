import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { View, StyleSheet, Alert,Text,Image} from "react-native";
import Modal from 'react-native-modalbox';
import {POST_SERVICE} from "../shared/backend";
import {CustomLoader} from "../shared/activityindicator"
import {GET_PHONE, GET_BVN, GET_CUSTID, GET_ACCOUNT_NUMBER,} from "../shared/storage";
export default class CreditCheckComponent extends Component {
    state = {
        loading: false,
        creditData:{},
        loanType:'',
        // isConnected:true
    };

    showAddModal=(item)=>{
        this.setState({creditData:item})
        console.log('modal pushed data',item)
        console.log('credit check data',this.state.creditData)
        this.refs.myModals.open()
    }

    closeModal=()=>{
        this.props.navigation.navigate('PaydayApplication')
        // this.refs.myModals.close()
    }

     conductCreditCheck=async()=>{
         if(this.state.creditData.loan_Category=='Personal'){
             this.setState({loanType:0}) 
         }
         else if(this.state.creditData.loan_Category=='Car'){
            this.setState({loanType:1}) 
        }
        else if(this.state.creditData.loan_Category=='Payday'){
            this.setState({loanType:2}) 
        }
        else if(this.state.creditData.loan_Category=='Laptop'){
            this.setState({loanType:7}) 
        }
       
        const body = {
            phonenumber: await GET_PHONE(),
            accountNumber: await GET_ACCOUNT_NUMBER(),
            custId: await GET_CUSTID(),
            bvn: await GET_BVN(),
            loanType: this.state.loanType,
            isStaff: true,
            channelId: "FlashLendMobile"
          };
      console.log('my body ',body)
    //    if(this.state.creditData.isTopUp===true){
      const endpoint = `api/Eligibility/GetEligibilityByLoanType`;
      console.log('endpoint',endpoint)
      this.setState({loading: true});
      try {
          const response = await POST_SERVICE(body,endpoint);
          console.log('credit check response', response);
          this.setState({loading: false});
          if(response.data.account_Number !=='')
          {
            Alert.alert('triied', response.data.account_Number);
              this.props.navigation.navigate('PaydayApplication',{
                data:{
                    data:response.data
                }
              })
              
          }
          else
          {
              InteractionManager.runAfterInteractions(() => {
                  setTimeout(() => {
                      Alert.alert('Failed', response.data.message);
                  });
              });
          }
      } catch (e) {
        this.setState({loading: false});
          return e.response;
    //   }
}}

    render(){  
        return (
            
            <Modal
             ref={'myModals'}
             style={{borderRadius:20,shadowRadius:10,width:Dimensions.get('screen').width-80,height:370}}
                position='center'
                backdrop={true}
                onClosed={()=>{

                }}
                >
                <Text style={{color:'#0E237E',fontSize:18,textAlign:'center',paddingTop:20}}>Credit Check</Text>    
               
           <View style={{flex:1,paddingHorizontal:20,alignContent:'center',alignItems:'center'}}>
          <View style={{paddingTop:20}}>
           <Image style={{width:70,height:70}}
                source={require('../assets/img/creditcheck.png')}
              /> 
              </View >
                <Text style={{paddingTop:20,fontSize:14}}>In line with CBN policy,{this.state.creditData.doCreditCheckMessage} </Text>
                <TouchableOpacity onPress={this.conductCreditCheck} style={{height:50,width:'100%',backgroundColor:'#0E237E',borderRadius:5,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',textAlign:'center',fontSize:17}}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={this.closeModal}  style={{height:50, width:100,borderRadius:5,borderWidth:0.9,borderColor:'gray',justifyContent:'center',width:'100%',alignItems:'center',marginTop:20,marginBottom:20}}>
                    <Text style={{fontSize:17}}>Reject</Text>
                </TouchableOpacity>
                </View>
                <CustomLoader visible={this.state.loading}/>
            </Modal>
        )
        }
}
