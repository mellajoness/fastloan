import React, { Component } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View ,StatusBar,TouchableOpacity} from "react-native";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
export default class TermsScreen extends Component {
  render() {
    return (
       <View>  
        <StatusBar backgroundColor="#1D3461" barStyle="light-content" />
         <View style={{height: 60,backgroundColor:'white',flexDirection:'row',alignItems:'center',paddingHorizontal:20 }} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} >
             <AntDesign name='arrowleft' size={30} color='#0E237E' style={{}}/> 
          </TouchableOpacity>
          <View style={{flex:1}}>
            <Text style={{textAlign:'center',color:'white',fontSize:20,fontWeight:'bold',color:'#0E237E',fontFamily:'Gilroy-Medium',}}>Terms and Conditions</Text>
         </View>
         </View>  
         
               
      
   
   <View style={{paddingHorizontal:20,paddingVertical:20,backgroundColor:'white',height:'100%'}}>
        <ScrollView >
            <View style={{backgroundColor:'white'}}>
        <Text style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>You agree:</Text>  

<Text style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>1. To pay the loan balance on or before its expiration</Text>

<Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>2. To allow Fidelity Bank access and use your transactional data to determine your loan amount</Text>

<Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>3. To allow Fidelity Bank conduct and use the information obtained from Credit Bureau</Text>

    <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>4. To be listed on the credit bureau in the event of default</Text>

     <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>5. To domicile all salary inflow with Fidelity Bank untill all exposure is paid</Text>

    <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>6. To obtain the Fidelity Bank consent where there is need to change its domiciliation to any other bank</Text>

  <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>7. To immediately inform the lender of any material adverse change in his/her personal cash flow within 24 hours of the occurence</Text>

 <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}> 8. To be subjected to Fidelity Bank penal charges in the case of default</Text> 

 <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>9. To allow Fidelity Bank use all means legitimate to recover its loan</Text>
 <Text  style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}>Kindly click on link for more details Terms and Condition </Text>
 <Text style={{fontSize:15,color:'#0E237E',fontFamily:'Gilroy',paddingTop:7}}> "https://www.fidelitybank.ng/fastloans/"</Text>
 </View>
        </ScrollView>
        </View>
        </View>
    )   
    }}
