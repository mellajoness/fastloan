import React, { Component } from 'react'
import {Text,View,StatusBar,FlatList,Dimensions,TouchableOpacity} from 'react-native'
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import {GET_SERVICE} from "../shared/backend";
import {GET_PHONE,GET_SESSION_ID, GET_FIRST_NAME,GET_LAST_NAME,GET_EMAIL, SAVE_BVN, SAVE_CUSTID, SAVE_ACCOUNT_NUMBER, SAVE_IS_STAFF,} from "../shared/storage";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {CustomLoader} from "../shared/activityindicator"
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
const NumberFormat = require('react-number-format');
export default class HistoryDetailsScreen extends Component {
    constructor(props){
    super(props);
    this.state={
        myHist:[]
    }
}
    componentDidMount(){
        // this.setState({myHist:this.props.navigation.getParam('historyData').loanInstances[0].loanInstances})
        // console.log('item data compdid mount',this.state.myHist)
        // let loanType= this.props.navigation.getParam('historyData').loanInstances[0].loanType
        // console.log('item data loantype mount',loanType)  
       }  
     
  render() {
    const { navigation } = this.props;
  let myHist= navigation.getParam('historyData').loanInstances[0].loanInstances
   console.log('my render',myHist)
    return (
         
      <View style={{flex:1}}>
     <View style={{height:50,backgroundColor:'red',alignItems:'center',flexDirection:'row'}}>
       <TouchableOpacity  onPress= {() => this.props.navigation.navigate('History')} > 
         <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
        </TouchableOpacity> 
        <Text style={{fontSize:22}} >History Details</Text>
     </View>

        <ScrollView>
        {myHist.map((hist,index)=>   
       <View key={index} style={{paddingLeft:20,paddingTop:20,paddingRight:20,backgroundColor:'white',height:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontFamily:'Gilroy-Medium',fontSize:14,color:'#9C9E9B'}}>{hist.loanType}</Text>
        <Text style={{fontFamily:'Gilroy-Medium',fontSize:14,color:'#9C9E9B',paddingRight:30}}>{hist.loanAccount}</Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',borderColor:'red',}}>
         <Text style={{fontFamily:'Gilroy-Medium',fontSize:14,color:'#000000'}}>Loan Disbursement</Text>

       <View style={{flexDirection:'row'}}>
       {/* <NumberFormat renderText={text => <Text  style={{fontFamily:'Gilroy-Medium',fontSize:17,color:'#34AA44'}}>{text}</Text>} value={hist.outstandingAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} />  */}
    {/* <Text style={{fontFamily:'Gilroy-Medium',fontSize:17,color:'#34AA44'  }}>&#8358;{hist.outstandingAmount}</Text> */}
      
       <View style={{position:'relative',bottom:7}}>
       <AntDesign name='arrowup' size={25} color='#34AA44'  style={{}}/>  
       </View>
       </View>
      </View>
   </View>
     )}  
      </ScrollView>
      </View>
    );
  }
}