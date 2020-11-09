import React, { Component } from 'react';
import { Text, View ,TouchableOpacity,Image,Dimensions,StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import {CustomLoader} from "../shared/activityindicator"
import NumberFormat from 'react-number-format';
import {ScrollView} from 'react-native';
import {BarChart,} from "react-native-chart-kit";

const data = {
  labels: ["payday", "Personal", "Laptop", "Migo",'uwuwu'],
  datasets: [
    {
      data: [20, 45, 28, 80,59]
    }
  ] 
};

const chartConfig = {
  backgroundGradientFrom: "white",
  // backgroundGradientFromOpacity: 30,
  backgroundGradientTo: "white", 
  // backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(14,35,126, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(193,194,193, ${opacity})`,
  // strokeWidth: 2, // optional, default 3
  // barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get('screen').width;

export default class LoanBalanceScreen extends Component {
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
           <View   style={{height:100,backgroundColor:'#0E237E',marginHorizontal:0,borderRadius:5,marginTop:10,paddingHorizontal:10,marginBottom:0,alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>  
               
              <Text style={{paddingLeft:4,color:'#AAAAAA',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:14,paddingTop:30}}>Your total loan balance is</Text>
             </View>
             <NumberFormat renderText={text => <Text style={{color:'white',fontFamily:'Gilroy-Medium',fontSize:19,fontWeight:'bold',lineHeight:22,paddingTop:10}}>{text}</Text>}value={20000} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
          </View> 


          <ScrollView style={{marginTop:20 ,flex:1}}>
           <View style={{borderColor:'#cdcecd',borderWidth:5,height:230}}>
           <BarChart
 style={{backgroundColor:'red'}}
  data={data} 
  width={screenWidth}
  withHorizontalLines={false}
  height={220}
  yAxisLabel="$"
  chartConfig={chartConfig}
  verticalLabelRotation={0}
/>
          
              
           </View>

            <TouchableOpacity style={{height:50,backgroundColor:'#0E237E',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:20,}} >
              <Text style={{color:'white',fontSize:18}}>Pay Loan</Text>
            </TouchableOpacity>

            </ScrollView>
          </View>
    );
  }
}

