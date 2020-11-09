import React, { Component } from 'react'
import {Text,View,StatusBar,TouchableOpacity,Image,FlatList,ImageBackground,StyleSheet} from 'react-native'
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
export default class HistoryScreen extends Component {
  state={
    history:[],
    totalEligibleAmount:'',
    loading: false,
  }
    async componentDidMount(){
      await this.history()
    }
    
  async history () {
    const phoneNumber =await GET_PHONE()
    const customerId= await GET_CUSTID()
    console.log('phone no',phoneNumber)
    console.log('custid no',customerId)
    const endpoint = `Mobile/GetAllLoanHistory?custId=${customerId}&Phonenumber=${phoneNumber}`;
    console.log('endpoint',endpoint)
    this.setState({loading: true});
    try {
        const response = await GET_SERVICE(endpoint);
        console.log('payloan offers', response);
        this.setState({loading: false});
        if(response.status ===200)
        {
            this.setState({history: response.data})
            
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

goHistoryDetails(item){
  console.log('my items index',item)
  this.props.navigation.navigate('HistoryDetails',{
    historyData:{
      loanInstances:[item]
    }
})
}
formatData=(history,numColumns)=>{
  const numberOfFullRows=Math.floor(this.state.history.length/numColumns);
  console.log('no of rows',numberOfFullRows)
  let numberOfElementLastRow =this.state.history.length -(numberOfFullRows)*numColumns
  while (numberOfElementLastRow !== numColumns && numberOfElementLastRow !== 0) {
   this.state.history.push({ key: `blank-${numberOfElementLastRow}`, empty: true })
   numberOfElementLastRow++;
  }
  return this.state.history
  
}

header= () => {
  return(
  <View style={{height:50,backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
     <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Dashboard')} > 
      <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/>  
     </TouchableOpacity> 
     <View style={{flex:1}}>
      <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',textAlign:'center'}}>Transaction History</Text>
     </View>
     <CustomLoader visible={this.state.loading}/>
   </View>)
}


    _renderItem(item, index) {
    if(this.state.history.length===0){
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
          
          <Text style={{paddingHorizontal:20,fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,textAlign:'center'}}>You have no loan offer</Text>
          <CustomLoader visible={this.state.loading}/>
        </View>
      )
    }

    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
        <View style={{flex:1,backgroundColor:'white',marginTop:20,paddingHorizontal:7}}>
        {/* <Text style={{paddingHorizontal:20,color:'gray',fontFamily:'Gilroy-Medium',fontSize:17,paddingTop:30}}>Please select an active loan to view detailed history</Text> */} 
          <TouchableOpacity onPress= {()=>this.goHistoryDetails(item)} style={{height:55,borderRadius:7,borderColor:'gray',backgroundColor:'white',borderWidth:1,paddingHorizontal:10,width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
         <Text style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:14,textAlign:'center',justifyContent:'center'}}>{item.loanType}</Text>
         </TouchableOpacity>  
        <CustomLoader visible={this.state.loading}/>  
      </View>
    ) 
}
render() {
  return (
    
      <View style={{flex:1,backgroundColor:'white',paddingHorizontal:20}}>
        
          <FlatList
              data={this.formatData(this.state.history,numColumns)}
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
    height:55
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











