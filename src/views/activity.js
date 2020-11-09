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

export default class ActivityScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      activities:[],
      phoneNumber:'',
      loading: false,
    }
  }

  async componentDidMount(){
    this.getActivities()
  }
  async getActivities () {
    const phoneNumber =await GET_PHONE()
     console.log('First phone',phoneNumber)
      const endpoint = `Mobile/GetRecentActivities?Phonenumber=${phoneNumber}`;
      console.log('endpoint',endpoint)
      this.setState({loading: true});
      try {
          const response = await GET_SERVICE(endpoint);
          console.log('Activities', response);
          this.setState({loading: false});
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
        this.setState({loading: false});
          return e.response;
      }
  };



  header= () => {
    return(
      <View style={{height: 60, width: Dimensions.get('screen').width,backgroundColor:'white',justifyContent:'center' }} >
      <View style={{flex:1}}>
        <StatusBar backgroundColor="#1D3461" barStyle="light-content" />

        <View style={{paddingRight:30,paddingLeft:20}}>
          <View style={{ flexDirection:'row',paddingTop:15, }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} >
             <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/> 
          </TouchableOpacity>
      <View style={{flex:1}}>
       <Text style={{color:'white',fontSize:20,fontWeight:'bold',color:'#0E237E',fontFamily:'Gilroy-Medium',textAlign:'center'}}>Recent Activity</Text>  
      </View> 
      </View>
    
    </View>
     </View> 
     <CustomLoader visible={this.state.loading}/>
  </View>)
  }


  _renderItem(item, index) {
   let sign=item.type==='Debit' ?'-' : '+'
    console.log('data', item);
    return (
      
      <View> 
        <StatusBar backgroundColor='#1D3461' barStyle="light-content" /> 
        
       <View  style={{paddingLeft:20,paddingTop:20,paddingRight:20,backgroundColor:'white'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{fontFamily:'Gilroy-Medium',fontSize:14,color:'#9C9E9B'}}>{item.loanType}</Text>
    <Text style={{fontFamily:'Gilroy-Medium',fontSize:14,color:'#9C9E9B',paddingRight:30}}>{moment(item.entryDate).format('D MMM YYYY')}</Text>

         </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',borderColor:'red',}}>
         <Text>{item.action}</Text>

       <View style={{flexDirection:'row'}}>
    <Text style={{fontFamily:'Gilroy-Medium',fontSize:17,color:item.type==='Debit' ? '#FF0000' : '#34AA44'  }}>{sign} &#8358;{item.amount}</Text>
      
       <View style={{position:'relative',bottom:7}}>
       <AntDesign name={item.type==='Debit' ? 'arrowup': 'arrowdown'} size={25} color={item.type==='Debit' ?'#FF0000' : '#34AA44' } style={{}}/>  
       </View>
       </View>
      </View>
   </View>
   <CustomLoader visible={this.state.loading}/>
      </View>
    );
  }

  render() {
    return (
      
        <View style={{flex:1,backgroundColor:'white'}}>
            <FlatList
                data={this.state.activities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => this._renderItem(item, index)}
                ListHeaderComponent={this.header}
                stickyHeaderIndices={[0]}
            />
        </View>
        
    );
  }

}

