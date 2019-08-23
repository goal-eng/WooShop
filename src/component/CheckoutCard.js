import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView,FlatList,Text,ActivityIndicator } from 'react-native';
import { Input ,Image,Badge, Icon } from 'react-native-elements';
import colors from '../colors.json';


const CheckoutCard = ({}) => {
    return (
        <View style={{height:130,borderTopWidth:0.1,borderBottomWidth:0.1,borderColor:colors.color,flexDirection:"row",marginTop:10,marginBottom:5}}>
        <View style={{backgroundColor:colors.themeC,width:130}}>
        <Image
           source={{ uri: "https://www.incimages.com/uploaded_files/image/970x450/products_364475.jpg" }}
           style={{ width: 130, height: 130 }}
           PlaceholderContent={<ActivityIndicator />}
           />          
         </View>
        <View style={{flex:1}}>
            <View style={{flex:1,margin:10}}>
                <ScrollView>
                <Text style={{fontSize:22,fontFamily: 'Montserrat-Light',color:colors.color}}>
                   Bulb 25 volts
            </Text>
            <Text style={{fontSize:15,fontFamily: 'Montserrat-Light',color:colors.color}}>
            The idea with React Native Elements is mor.
            </Text>
                    </ScrollView>
          
            </View>
        <View style={{height:30,flexDirection:"row"}}>
           
           <Input containerStyle={{width:30}}
           inputContainerStyle={{width:30,height:25,color:colors.color}}
           inputStyle={{color:colors.color}}
           value='3'
           />
            <Text style={{fontSize:16,top:5,left:10,fontFamily: 'Montserrat-Light',color:colors.color}}>
                   Quantity
            </Text>
            <View style={{flexDirection:"row-reverse",flex:1}}>

            <Text style={{fontSize:16,top:5,left:10,fontFamily: 'Montserrat-Light',color:colors.color}}>
                   Total $32
            </Text>
            
            </View>
        </View>

        </View>
        <Badge
               status="error"
               containerStyle={{padding:5}}
               value={<Icon  name='close'
               type='evilicon'
               color='white'></Icon>
                   }
               containerStyle={{ position: 'absolute', top: 0, right: 4 }}
           />
       </View>
    )
}
export default CheckoutCard