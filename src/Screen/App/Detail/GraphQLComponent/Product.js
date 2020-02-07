import React, {  } from 'react';
import { View,Dimensions,FlatList,Text,Animated,ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { ThemeColor as color } from '../../../../colors'
import {productsSorted} from '../../../../Graphql/Actions/index'


const GetProducts = (props) =>{
  const dataa = OrderBY(props.orderby)
	const { data, loading, error } = useQuery(productsSorted(dataa.filter));
	if (loading) return <ActivityIndicator size="large" color={color.PrimaryF} />;
	if (error) return <Text>ERROR</Text>;
	return (
    <View style={{marginLeft:15,marginRight:15,marginTop:10}}>

    <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: color.PrimaryF,
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold'
            }}
          >
            {dataa.title}
          </Text>
        </View>

        <View style={{ flexDirection: 'row-reverse' }}>
          <Text
            style={{
              color: color.BtnG[0],
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold'
            }}
          >
            filter
          </Text>
        </View>
      </View>
    <FlatList
        data={data.products.nodes}
        renderItem={props.render}
        numColumns={2}
        />
        </View>)
}
function OrderBY(order){
  switch(order){
    case 0:
        return {title : "All Products 🎉", filter : '{field: PARENT,order: DESC }'}
        break;
      case 1:
        return {title : "Most Popular ❤", filter : '{field: RATING,order: DESC }'}
        break;
      case 2:
          return {title : "Latest Products 🌹", filter : '{field: DATE,order: DESC }'}
          break;
      case 3:
          return {title : "Most Sold 🙌", filter : '{field: TOTAL_SALES,order: DESC }'}
          break;
      default :
      return {title : "All Products 🎉", filter : '{field: PARENT,order: DESC }'}
        break;
  }
}
export default GetProducts
