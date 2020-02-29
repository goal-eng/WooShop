import { CheckoutCard } from '../../../../component/index';

import React, { } from 'react';
import {
  View,
  Dimensions,
  FlatList,
  Animated,
  ActivityIndicator
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Text } from '@ui-kitten/components';
let i = 0

const GET_PRODUCTS = (orderby) => gql`
query {
 ${orderby}
}
`;
const GetProducts = (props) => {
  let Cart = props.Cart;
  // let cart = []; Cart.forEach((element) => {      if
  // (cart.some((item) => item.id === element.id)) {     const a =
  // cart.findIndex((i) => i.id === element.id);     //
  // console.log(cart.findIndex(i => i.id === element.id))     cart[a].Q =
  // cart[a].Q + element.Q;   } else {     cart.push(element);   } });
  // console.log(cart); let a = Refactoring(cart); 

  if (!Refactoring(Cart))
    return <Text style={{ marginLeft: 20,   }}>Empty !</Text>;

  const { data, loading, error } = useQuery(GET_PRODUCTS(Refactoring(Cart)));
  if (loading)
    return <ActivityIndicator size="large"  />;
  if (error)
    return <Text>ERROR</Text>;
  var result = Object
    .keys(data)
    .map(function (key) {
      return [Number(key), data[key]];
    });
  let total = 0

  result.forEach((element, i) => {
    const tot = parseFloat(element[1].price.replace('$', ''))
    const Q = Cart[i].Q
    total = total + tot * Q
  });
  props.MakeTotal(total)


  return (
    <View>
      {result.map((e, i) => {
        return <CheckoutCard index={i} ind={Cart[i]} data={e} />;
      })}
    </View>
  );
};

function Refactoring(Cart) {
  const Alph = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  let a = '';
  Cart.forEach((e, i) => {
    a += Alph[i] + `: product( id: "` + e.id + `" ) {
      id
      productId
      name
      image{
        sourceUrl
      }
      price
      description
    }`;
  });
  return Cart.length == 0
    ? false
    : a;
}
export default GetProducts;
