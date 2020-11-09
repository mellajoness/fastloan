import React, { Component } from 'react'
import {Text,View,StatusBar,TouchableOpacity,Image,FlatList,ImageBackground,InteractionManager,StyleSheet} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import {GET_PHONE,GET_SESSION_ID, GET_FIRST_NAME,GET_LAST_NAME,GET_EMAIL, GET_CUSTID, GET_ACCOUNT_NUMBER, GET_IS_STAFF, GET_BVN} from "../shared/storage";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {CustomLoader} from "../shared/activityindicator"
import NumberFormat from 'react-number-format';

const numColumns=3
export default class TopUpScreen extends Component {
state={
  allOffers:[],
  total_eligible_amount:'',
  loading: false,
  mella:''
}
  async componentDidMount(){
   await this.getTopUpOffers()
  }
  
  async getTopUpOffers () {
      const accountNumber= await GET_ACCOUNT_NUMBER()
      console.log('acc no',accountNumber)
      const endpoint = `api/Eligibility/TopupOfferByAccount?accountNumber=${accountNumber}`;
      console.log('endpoint',endpoint)
      this.setState({loading: true});
      try {
          const response = await GET_SERVICE(endpoint);
          console.log('top up offers', response);
          this.setState({loading: false});
          if(response.status ===200)
          {
              this.setState({allOffers: response.data,total_eligible_amount:response.data[0].total_Eligible_Amount})
              
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
      <View style={{flex:1}}>
    <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Dashboard')} > 
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
           <NumberFormat renderText={text => <Text style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,paddingTop:10}}>{text}</Text>}value={this.state.total_eligible_amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
        </View> 
   
        <CustomLoader visible={this.state.loading}/>
        </View>
  )
  }
  

  _renderItem(item, index) {
    this.state.total_eligible_amount =this.state.allOffers[0].total_Eligible_Amount
    console.log('total eligible amountooo',this.state.total_eligible_amount)   

    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:0}}>
        <StatusBar backgroundColor="#0E237E" barStyle="light-content" />
        
        <View style={{marginHorizontal:0,flex:1,marginTop:20,justifyContent:'space-between',backgroundColor:'white',shadowColor: '#000',
                     shadowOffset: { width: 0, height: 19 },
                     shadowOpacity: 2.25,
                     shadowRadius: 6.84,  
                     elevation: 9}}>
        <TouchableOpacity  onPress= {()=>this.goToPayment(item)} style={{height:100,borderRadius:7,borderColor:'gray',backgroundColor:'white',borderWidth:1,paddingHorizontal:5}}>
      <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:11,paddingTop:12}}>{item.loan_Category}</Text>
            <NumberFormat renderText={text => <Text style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:15,paddingTop:12,fontWeight:'bold'}}>{text}</Text>}value={item.eligible_Amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
            <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:9,paddingTop:12,}}>{item.interestRate}% {item.rateDuration}</Text>
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
        <View style={{flex:1}}>
        <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',textAlign:'center'}}>Loan Offer</Text>
        </View>
      </View>

     <View style={{alignItems:'center',paddingTop:20,paddingBottom:30}}>
      <Image style={{width:278,height:31}}
              source={require('../assets/img/loanofferprogress1.png')}
            /> 
      </View>
   
        <Text style={{paddingHorizontal:20,fontFamily:'Gilroy-Medium',fontSize:19,lineHeight:22,textAlign:'center'}}>You have no loan offer</Text>
        <CustomLoader visible={this.state.loading}/>
      </View>
    )
  }
  return (
    
      <View style={{flex:1,backgroundColor:'white',paddingHorizontal:20}}>
        
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

