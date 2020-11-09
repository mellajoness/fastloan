import React, { Component } from 'react'
import {Text,View,StatusBar,TouchableOpacity,Image,FlatList,ImageBackground,Dimensions,StyleSheet} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import {GET_PHONE,GET_SESSION_ID, GET_FIRST_NAME,GET_LAST_NAME,GET_EMAIL, GET_CUSTID, GET_ACCOUNT_NUMBER, GET_IS_STAFF, GET_BVN} from "../shared/storage";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {CustomLoader} from "../shared/activityindicator"
import NumberFormat from 'react-number-format';
import moment from 'moment';
  

const numColumns=3
export default class PayloanScreen extends Component {
state={
  allOffers:[],
  totalEligibleAmount:'',
  loading: false,
}

  async componentDidMount(){
   await this.getLoan()
  }

  
  async getLoan () {
      const phoneNumber =await GET_PHONE()
      const customerId= await GET_CUSTID()
      console.log('phone no',phoneNumber)
      console.log('custid no',customerId)
      const endpoint = `Loan/LoanBalance?custId=${customerId}&Phonenumber=${phoneNumber}`;
      console.log('endpoint',endpoint)
      this.setState({loading: true});
      try {
          const response = await GET_SERVICE(endpoint);
          console.log('payloan offers', response);
          this.setState({loading: false});
          if(response.status ===200)
          {
              this.setState({allOffers: response.data})
              
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
      }
  };


  goToPayment(item){
    console.log('yesssss',item)
    this.props.navigation.navigate('LoanPaymentType',{
          loanData:{
            dayLeft:item.dayLeft,
            disbursedDate:item.disbursedDate,
            dueDate:item.dueDate,
            hoursLeft:item.hoursLeft,
            interest:item.interest,
            loanId:item.loanId,
            loanType:item.loanType,
            minuteLeft:item.minuteLeft,
            operativeAcct:item.operativeAcct,
            principal:item.principal,
            recordId:item.recordId,
            tenor:item.tenor,
            totalExpectedRepayment:item.totalExpectedRepayment,
            totalOutstanding:item.totalOutstanding,
            totalPaid:item.totalPaid
          }}
        );    
  }

  

formatData=(allOffers,numColumns)=>{
  const numberOfFullRows=Math.floor(this.state.allOffers.length/numColumns);
  console.log('no of rows',numberOfFullRows)
  let numberOfElementLastRow =this.state.allOffers.length -(numberOfFullRows)*numColumns
  while (numberOfElementLastRow !== numColumns && numberOfElementLastRow !== 0) {
   this.state.allOffers.push({ key: `blank-${numberOfElementLastRow}`, empty: true })
   numberOfElementLastRow++;
  }
  return this.state.allOffers
  
}

  header= () => {
    return(
      <View style={{height: 60, width: Dimensions.get('screen').width,backgroundColor:'white',justifyContent:'center' }} >
      <View style={{flex:1}}>
        <StatusBar backgroundColor="#1D3461" barStyle="light-content" />

        <View >
          <View style={{ flexDirection:'row',paddingTop:15, }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} >
             <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/> 
          </TouchableOpacity>
          <View style={{flex:1}}> 
           <Text style={{color:'white',fontSize:20,fontWeight:'bold',color:'#0E237E',fontFamily:'Gilroy-Medium',textAlign:'center'}}>Pay A Loan</Text>  
           </View>
      </View>
    
    </View>
     </View> 
     <CustomLoader visible={this.state.loading}/>
     
    
  </View>)
  }



   
  
   


    _renderItem(item, index) {
       let a=this.state.allOffers.length
       console.log('lengtht',a)
      if(this.state.allOffers.length===0){
        return(
          <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignContent:'center'}}>
          <StatusBar backgroundColor='#1D3461' barStyle="light-content" /> 
     {this.header}
          {/* <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
            <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Dashboard')} > 
             <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
            </TouchableOpacity> 
            <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold'}}>Pay Your Loan</Text>
             <Entypo name='' size={24} color='#0E237E' style={{}}/>
          </View> */}
            
            <Text style={{paddingHorizontal:20,fontFamily:'Gilroy-Medium',fontSize:29,fontWeight:'bold',lineHeight:22,textAlign:'center'}}>You have no loan offer</Text>
            <CustomLoader visible={this.state.loading}/>
          </View>
        )
      }

     if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
      } 


    return (
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:7}}>
        <StatusBar backgroundColor="#0E237E" barStyle="light-content" />

        <View style={{marginHorizontal:0,flex:1,marginTop:20,justifyContent:'space-between',backgroundColor:'white',shadowColor: '#000',
                     shadowOffset: { width: 0, height: 19 },
                     shadowOpacity: 2.25,
                     shadowRadius: 6.84,  
                     elevation: 9}}>
         <TouchableOpacity  onPress= {()=>this.goToPayment(item)} style={{height:100,borderRadius:7,borderColor:'gray',backgroundColor:'white',borderWidth:1,paddingHorizontal:5}}>
          <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:11,paddingTop:12}}>{item.loanType}</Text>
          <NumberFormat renderText={text => <Text style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:15,paddingTop:12,fontWeight:'bold'}}>{text}</Text>} value={item.principal} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:11,paddingTop:12,fontWeight:'bold'}}>Due date</Text>
          <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:9,paddingTop:14,paddingLeft:3}}>{moment(item.dueDate).format('D MMM YYYY')}</Text>
          </View>
         </TouchableOpacity> 
         </View>  
        <CustomLoader visible={this.state.loading}/>
        
      </View>
    
    ) 
}
render() {
  if(this.state.allOffers.length===0){
    return(
      <View style={{flex:1,backgroundColor:'white'}}>
      <StatusBar backgroundColor='#1D3461' barStyle="light-content" /> 
      <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
        <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Dashboard')} > 
         <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
        </TouchableOpacity> 
        <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold'}}>Pay Your Loan</Text>
         <Entypo name='' size={24} color='#0E237E' style={{}}/>
      </View>
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <Text style={{paddingHorizontal:20,fontFamily:'Gilroy-Medium',fontSize:18,lineHeight:22,textAlign:'center'}}>You have no loan offer</Text>
        </View>
        <CustomLoader visible={this.state.loading}/>
      </View>
    )
  }
  return (
    
      <View style={{flex:1,backgroundColor:'white',paddingHorizontal:15}}>
        
          <FlatList
              data={this.formatData(this.state.allOffers,numColumns)}
              ListHeaderComponent={this.header}
              stickyHeaderIndices={[0]}
              numColumns={numColumns}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => this._renderItem(item, index)}
             
          />
         
      </View>
      
  );
}
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height:100
    // height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    paddingHorizontal:7
  },
  itemText: {
    color: '#fff',
  },
});