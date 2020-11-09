import React, { Component } from 'react'
import {Text,View,TouchableOpacity,ImageBackground,Image,SafeAreaView} from 'react-native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
// import PhotoUpload from 'react-native-photo-upload'
export default class DrawerComponent extends Component {
  render() {
    return (   
      <View style={{flex:1,}}> 
       <ImageBackground source={require('./assets/img/Frame.png')}style={{width: '100%', height: '100%',}}>
       <View style={{paddingHorizontal:20}}>
      
      <ScrollView style={{paddingTop:50}}>
         {/* <SafeAreaView > */}

         <Image style={{width:100,height:100}}
                source={require('./assets/img/josh.png')}
             /> 
       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}>
         <Text style={{color:'white',fontSize:18,}}>Dashboard</Text> 
         <AntDesign name='right' size={20} color='white' style={{}}/>
       </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}>
         <Text style={{color:'white',fontSize:18,}}>Request Loan</Text> 
         <AntDesign name='right' size={20} color='white' style={{}}/>
       </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}>
         <Text style={{color:'white',fontSize:18,}}>Loan Balance</Text> 
         <AntDesign name='right' size={20} color='white' style={{}}/>
       </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}>
         <Text style={{color:'white',fontSize:18,}}>Pay Loan</Text> 
         <AntDesign name='right' size={20} color='white' style={{}}/>
       </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}>
         <Text style={{color:'white',fontSize:18,}}>Recommend a friend</Text> 
         <AntDesign name='right' size={20} color='white' style={{}}/>
       </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}>
         <Text style={{color:'white',fontSize:18,}}>Loan History</Text> 
         <AntDesign name='right' size={20} color='white' style={{}}/>
       </TouchableOpacity>

       
        <View style={{paddingTop:100}}>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}}  Press={()=> this.props.navigation.navigate('SignIn')} >
           <Text style={{color:'white',fontSize:16,}}>Disclaimer</Text> 
           <AntDesign name='right' size={20} color='white' style={{}}/>
        </TouchableOpacity>
{/*      
        <TouchableOpacity onPress={{paddingTop:20}}  onPress={()=> this.props.navigation.navigate('SignIn')} >
           <Text style={{color:'white',fontSize:16,}}>Terms and Conditions</Text> 
        </TouchableOpacity> */}

        

        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}} >
           <Text style={{color:'white',fontSize:16,}}>Terms and Conditions</Text> 
           <AntDesign name='right' size={20} color='white' style={{}}/>
        </TouchableOpacity>

        
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,alignItems:'center'}} >
           <Text style={{color:'white',fontSize:16,}}>Logout</Text> 
           <AntDesign name='right' size={20} color='white' style={{}}/>
        </TouchableOpacity>
        </View>
         {/* </SafeAreaView> */}
        </ScrollView>
        </View>
        
       </ImageBackground>
     
      </View>
    )
  }
}

