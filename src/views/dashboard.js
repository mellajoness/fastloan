import React, { Component } from 'react'
import {Text,View,StatusBar,TouchableOpacity,Image,FlatList,ImageBackground, Alert} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import {GET_SERVICE} from "../shared/backend";
import {GET_PHONE,GET_SESSION_ID, GET_FIRST_NAME,GET_LAST_NAME,GET_EMAIL, SAVE_BVN, SAVE_CUSTID, SAVE_ACCOUNT_NUMBER, SAVE_IS_STAFF,} from "../shared/storage";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {CustomLoader} from "../shared/activityindicator"
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
// import NumberFormat from 'react-number-format';
const NumberFormat = require('react-number-format');
export default class DashboardScreen extends Component {
  
   constructor(props){
      super(props);
      this.state = {
        dasboardData: [],
        activities:[],
        phoneNumber:'',
        greetings: '',
        totalLoanBal:'',
        loading: false,
      }
    }

    
  
    async componentDidMount()
    {
     
      let phoneNumber =await GET_PHONE()
      console.log('First phone',phoneNumber)
        await this.getDashboard();
        const today = new Date();
        const currentHour = today.getHours();
        console.log('Hour', currentHour);
        if (currentHour < 12) {
           this.state.greeting = 'Morning';
         } else if (currentHour < 18) {
           this.state.greeting = 'Afternoon';
         } else {
           this.state.greeting = 'Evening';
         }
         await this.getActivities()
    }

   
   async getDashboard () {
    let phoneNumber =await GET_PHONE()
      console.log('First phone',phoneNumber)
     const token = await GET_SESSION_ID()
     const firstName = await GET_FIRST_NAME()
     const lastName =await GET_LAST_NAME()
     const email =await GET_EMAIL()
     console.log('token',token)  
     console.log('First NAME',firstName)
     console.log('last NAME',lastName)
     console.log('email',email)
     console.log('First phone',phoneNumber)
      const endpoint = `GetMiniDashboard?phoneNumber=${phoneNumber}`;
      console.log('endpoint',endpoint)
      this.setState({loading: true});
      try {
          const response = await GET_SERVICE(endpoint);
          console.log('Dashboard', response);
          this.setState({loading: false});
          if(response.status=== 200)
          {
            await SAVE_CUSTID(response.data.custId)
            await SAVE_ACCOUNT_NUMBER(response.data.accountNumber)
            await SAVE_IS_STAFF(response.data.isStaff)
            await SAVE_BVN(response.data.bvn);
            this.setState({dasboardData: response.data.loanBalances,
                           totalLoanBal:response.data.totalLoanBal
            })
          }
          else
          {
              InteractionManager.runAfterInteractions(() => {
                  setTimeout(() => {
                      Alert.alert('Failed', response.message);
                  });
              });
          }
      } catch (e) {
        this.setState({loading: false});
          return e.response;
      }
  };


  async getActivities () {
    const phoneNumber =await GET_PHONE()
     console.log('First phone',phoneNumber)
      const endpoint = `GetRecentActivities?Phonenumber=${phoneNumber}`;
      console.log('endpoint',endpoint)
      try {
          const response = await GET_SERVICE(endpoint);
          console.log('Activities', response);

          if(response.status===200)
          {
            this.setState({activities: response.data})   
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
          return e.response;
      }
  };

  async saveUserDetail(resp){
    await SAVE_BVN(resp.data.bvn);
    await SAVE_CUSTID(resp.data.custId)
    await SAVE_ACCOUNT_NUMBER(resp.data.account_Number)
    await SAVE_IS_STAFF(resp.data.isStaff)
  //   await SAVE_FULL_NAME(`${resp.data.data.firstName} ${resp.data.data.lastName}`)
   
  }

  loanBalCard(){
    if (this.state.loanBalances < 1){
     return(
      <View style={{height:100,backgroundColor:'#0E237E',marginHorizontal:0,borderRadius:5,marginTop:10,paddingHorizontal:10,marginBottom:20,marginLeft:20,marginRight:20,alignItems:'center',
      shadowOffset: { width: 0, height: 19 },
      shadowOpacity: 0.25,
      shadowRadius: 4.84,  
      elevation:20
      }}>
        <View style={{flexDirection:'row'}}>   
         <Text style={{paddingLeft:4,color:'#AAAAAA',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:14,paddingTop:30}}>Your total loan balance is</Text>
        </View>
        <NumberFormat renderText={text => <Text  style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,paddingTop:10}}>{text}</Text>} value={this.state.totalLoanBal} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
     </View> 
     )
  }}

   render() { 
   
    console.log('loan balannces',this.state.totalLoanBal)
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <StatusBar backgroundColor='#1D3461' barStyle="light-content" /> 

        <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
          <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}> 
          
           <Entypo name='menu' size={30} color='#0E237E' style={{}}/>  
          </TouchableOpacity> 
          <Text  style={{color:'#0E237E',fontFamily:'Gilroy-Medium',fontSize:21,fontWeight:'bold'}}>Loans</Text>
           <Entypo name='dots-three-vertical' size={24} color='#0E237E' style={{}}/>
        </View>

     

     
{this.loanBalCard()}




   
    
   <View style={{marginBottom:10,marginRight:20,marginLeft:20}}>
      <ScrollView style={{}} horizontal={true} >
       
       {this.state.dasboardData.map(dash=>
         <View  key={dash.loanId} style={{height:70,width:130,backgroundColor:'#0E237E',borderRadius:5,marginTop:0,paddingHorizontal:10,marginBottom:15,alignItems:'center',marginRight:20}}>
          <View style={{flexDirection:'row',paddingTop:10}}>
            <View style={{borderWidth:2,borderColor:'white',height:12,position:'relative',top:3}}/>
           <Text style={{paddingLeft:2,color:'#AAAAAA',fontFamily:'Gilroy-Medium',fontSize:13,lineHeight:16,paddingTop:2}}>{dash.loanType}</Text>
           </View>
           <NumberFormat renderText={text => <Text style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:14,lineHeight:17,paddingTop:10}}>{text}</Text>} value={dash.totalOutstanding} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
        </View>
       )}
      
     </ScrollView>
    </View>

        <ScrollView style={{flex:1,marginHorizontal:20}}>
         <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <TouchableOpacity   onPress= {() => this.props.navigation.navigate('Request')} style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:6,
               shadowOffset: { width: 0, height: 19 },
               shadowOpacity: 0.25,
               shadowRadius: 4.84,  
               elevation: 10
          }}>
              <View style={{paddingTop:10}}>
              <Image style={{height:22,width:40}}
                source={require('../assets/img/requestforloan.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:6,fontWeight:'bold',lineHeight:16,textAlign:'center'}}>Request For Loan</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:6, textAlign: 'center'}}>Request for a Loan within your global limit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress= {() => this.props.navigation.navigate('TopUp')} style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,
             shadowOffset: { width: 0, height: 19 },
             shadowOpacity: 0.25,
             shadowRadius: 4.84,  
             elevation: 10
          }}>
              <View style={{paddingTop:5}}>
              <Image style={{}}
                source={require('../assets/img/topup.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:6,fontWeight:'bold',lineHeight:16,textAlign:'center'}}>Loan Top Up</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:6, textAlign: 'center'}}>Request for a Loan TopUp</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,
             shadowOffset: { width: 0, height: 19 },
             shadowOpacity: 0.25,
             shadowRadius: 4.84,  
             elevation: 10
          }}>
              <View style={{paddingTop:5}}>
              <Image style={{width:30}}
                source={require('../assets/img/extendicon.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:6,fontWeight:'bold',lineHeight:16,textAlign:'center'}}>Extend Loan</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:6, textAlign: 'center'}}>Extend a running Loan</Text>
            </TouchableOpacity>

         </View>



         <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
         

           <TouchableOpacity style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,
            shadowOffset: { width: 0, height: 19 },
            shadowOpacity: 0.25,
            shadowRadius: 4.84,  
            elevation: 10
          }}>
              <View style={{paddingTop:10}}>
              <Image style={{width:20}}
                source={require('../assets/img/balance.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:6,fontWeight:'bold',lineHeight:16,textAlign:'center'}}>Balance</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:6, textAlign: 'center'}}>Check all loan balances</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Payloan')} style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,
             shadowOffset: { width: 0, height: 19 },
             shadowOpacity: 0.25,
             shadowRadius: 4.84,  
             elevation: 10
          }}>
              <View style={{paddingTop:8}}>
              <Image style={{}}
                source={require('../assets/img/payloan.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:6,fontWeight:'bold',lineHeight:16,textAlign:'center'}}>Pay A Loan</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:6, textAlign: 'center'}}>Pay an existing Loan</Text>
            </TouchableOpacity>

               
            <TouchableOpacity onPress= {() => this.props.navigation.navigate('Activity')} style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,
             shadowOffset: { width: 0, height: 19 },
             shadowOpacity: 0.25,
             shadowRadius: 4.84,  
             elevation: 10
          }}>
              <View style={{paddingTop:10}}>
              <Image style={{width:30}}
                source={require('../assets/img/activityicon.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:7,fontWeight:'bold',lineHeight:16,textAlign:'center'}}>Recent Activity</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:6, textAlign: 'center'}}>View your recent activities</Text>
            </TouchableOpacity>

            
         </View>


         <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
        

         </View>



         

<Collapse style={{transform: [{ rotate: '180deg'}]}} >
    <CollapseHeader 
       style={{backgroundColor:'#0E237E',height:30,borderRadius:5,width:60,alignContent:'flex-end',transform: [{ rotate: '180deg'}] }}>
       <Text style={{color:'white',justifyContent:'center',borderRadius:5,marginBottom:20,alignItems:'center',textAlign:'center',paddingTop:5}}>View All</Text>
     </CollapseHeader>

     <CollapseBody style={{ transform: [{ rotate: '180deg'}]}}>
     <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:0,marginBottom:15}}>
         <TouchableOpacity onPress= {() => this.props.navigation.navigate('History')}  style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,
          shadowOffset: { width: 0, height: 19 },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,  
          elevation: 10
        }}>
              <View style={{paddingTop:10}}>
              <Image style={{}}
                source={require('../assets/img/historyicon.png')}
              /> 
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:6,fontWeight:'bold',lineHeight:11,textAlign:'center'}}>Transaction History</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:2, textAlign: 'center'}}>View your transaction history</Text>
            </TouchableOpacity>
           

            <TouchableOpacity  onPress= {() => this.props.navigation.navigate('Terms')} style={{height:100,borderRadius:7,width:'32%',borderColor:'gray',backgroundColor:'white',borderWidth:1,alignItems:'center',paddingHorizontal:10,justifyContent:'center',
             shadowOffset: { width: 0, height: 19 },
             shadowOpacity: 0.25,
             shadowRadius: 4.84,  
             elevation: 10
          }}>
              <View style={{paddingTop:2}}>
              <Image style={{}}
                source={require('../assets/img/t&cs.png')}
              />   
              </View>
              <Text style={{color:'#000000',fontFamily:'Gilroy-Medium',fontSize:12,paddingTop:2,fontWeight:'bold',lineHeight:11,textAlign:'center'}}>Terms And Conditions</Text>
              <Text style={{color:'#000000',fontFamily:'Gilroy',fontSize:9,paddingTop:2, textAlign: 'center'}}>Read the terms and conditions for using this application</Text>
            </TouchableOpacity>
         </View>

     </CollapseBody>
</Collapse>



<ScrollView style={{ marginBottom:10,height:this.state.activities.length>0 ? 100: 0}} >
 
       {this.state.activities.map(act=>
         <View key={act.id} style={{paddingLeft:20,paddingVertical:10,borderBottomColor:'gray',
           
        }}>
          <View style={{flexDirection:'row',justifyContent:'space-between',shadowOffset:{  width: 10,  height: 10,  },shadowColor: 'black',shadowOpacity: 1.0,shadowOpacity: 1.0,}}>
            <Text style={{fontFamily:'Gilroy-Medium',fontSize:15,}}>{act.action}</Text>
            <Text style={{fontFamily:'Gilroy-Medium',fontSize:12,color:'gray',paddingRight:20}}>{moment(act.entryDate).format('D MMM YYYY')}</Text>
          </View>
  
           <View style={{flexDirection:'row',justifyContent:'flex-end',borderBottomColor:'gray',
          
          }}>
           <NumberFormat renderText={text => <Text  style={{fontFamily:'Gilroy-Medium',fontSize:17,color:act.type==='Debit' ? '#FF0000' : '#34AA44' }}>{act.type==='Debit' ?'-' : '+'}{text}</Text>} value={act.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
            <View style={{position:'relative',bottom:7}}>
            <AntDesign name={act.type==='Debit' ? 'arrowup': 'arrowdown'} size={25} color={act.type==='Debit' ?'#FF0000' : '#34AA44' } style={{}}/>  
            </View>
           </View> 
        </View>
      )}
      </ScrollView>

 
   
  
        </ScrollView>
        <CustomLoader visible={this.state.loading}/>
         </View>
    ) 
  }
}
 
