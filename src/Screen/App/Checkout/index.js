import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Mutation} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {print} from 'graphql';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {
  checkout,
  refreshToken,
  addToCart,
} from '../../../Graphql/Actions/index';
import {HeaderC} from '../../../component/index';
import {
  CheckBox,
  Input,
  Text,
  Layout,
  Modal,
  Button,
} from '@ui-kitten/components';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isLogout: true,
      isVisible: false,
    };

    AsyncStorage.getItem('userToken').then(res => {
      this.setState({user: JSON.parse(res)});
      // this.refreshToken(JSON.parse(res).authToken)
      // console.log(JSON.parse(res).authToken)
    });
  }

  checkout(params) {
    this.falling()
      .then(res => {
        params()
          .then(res => {
            let a = this.props.Cart.cart.length;
            for (let i = 0; i < a; i++) {
              this.props.dispatch({type: 'CART_DELETE', product: 0});
            }
            this.setState({isVisible: true});
          })
          .catch(err => {});
      })
      .catch(err => {});
  }
  falling() {
    return new Promise((resolve, rejects) => {
      this.props.Cart.cart.forEach(async element => {
        const response = await fetch('https://eproject.tk/graphql', {
          headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + this.state.user.authToken,
          },
          method: 'POST',
          body: addToCart(element.Q, element.Pid, 'Mut' + Math.random()),
        });
        const responseJson = await response.json();
        if (responseJson.data) {
          resolve(responseJson);
        } else {
          rejects(responseJson);
        }
      });
    });
  }
  Login() {
    axios
      .post('https://eproject.tk/graphql', {
        query: print(Loginn),
        variables: {
          username: this.state.username,
          password: this.state.password,
        },
      })
      .then(res => {
        if (res.data.data) {
          Toast.show('Successfull Logged In');
          AsyncStorage.setItem(
            'userToken',
            JSON.stringify(res.data.data.login),
          );
          this.props.dispatch({type: 'LOGINUSER', user: res.data.data.login});
          this.props.navigation.navigate('App');
          AsyncStorage.getItem('userToken').then(res => {
            this.setState({user: JSON.parse(res)});
          });
          this.setState({isLogout: false});
        } else {
          Toast.show('Make sure to enter username and password correctly');
        }
      })
      .catch(err => {});
  }

  render() {
    return this.state.user ? (
      <Layout style={{flex: 1}}>
        <HeaderC heading={'Checkout'} navigation={this.props.navigation} />

        <Mutation
          context={{
            headers: {
              Authorization: this.state.user
                ? `Bearer ${this.state.user.authToken}`
                : '',
            },
          }}
          variables={{
            clientMutationId: 'Mu' + Math.random(),
            jwtRefreshToken: this.state.user.authToken,
          }}
          mutation={refreshToken}>
          {(mutate, {data, loading, error}) => (
            <React.Fragment>
              <DoMutation mutate={mutate} />
              {error && (
                <DoRedirect navigation={this.props.navigation} error={error} />
              )}
              {data && (
                <RefreshToken navigation={this.props.navigation} data={data} />
              )}
              <ScrollView>
                <Mutation
                  context={{
                    headers: {
                      Authorization: this.state.user
                        ? `Bearer ${this.state.user.authToken}`
                        : '',
                    },
                  }}
                  variables={{
                    input: {
                      clientMutationId: 'Mu' + Math.random(),
                      billing: {
                        firstName: this.state.bfn ? this.state.bfn : '',
                        lastName: this.state.bln ? this.state.bln : '',
                        postcode: this.state.bpc ? this.state.bpc : '',
                        address1: this.state.ba1 ? this.state.ba1 : '',
                        address2: this.state.ba2 ? this.state.ba2 : '',
                        city: this.state.bc ? this.state.bc : '',
                        email: this.state.be ? this.state.be : '',
                        country: this.state.bC ? this.state.bC : 'PK',
                        company: this.state.sCP ? this.state.sCP : '',
                        state: this.state.ss ? this.state.ss : '',
                      },
                      paymentMethod: 'cod',
                      paymentMethodTitle: 'Cash on Delivery',
                      shipToDifferentAddress: this.state.checked,
                      shipping: {
                        firstName: this.state.sfn ? this.state.sfn : '',
                        lastName: this.state.sln ? this.state.sln : '',
                        postcode: this.state.spc ? this.state.spc : '',
                        address1: this.state.sa1 ? this.state.sa1 : '',
                        address2: this.state.sa2 ? this.state.sa2 : '',
                        city: this.state.sc ? this.state.sc : '',
                        email: this.state.se ? this.state.se : '',
                        country: this.state.sC ? this.state.sC : 'PK',
                        company: this.state.sCP ? this.state.sCP : '',
                        state: this.state.ss ? this.state.ss : '',
                      },
                    },
                  }}
                  mutation={checkout}>
                  {(CheckoutInput, {data, error}) => (
                    <View style={{margin: 20}}>
                      {data && (
                        <DoRedirect2Home
                          navigation={this.props.navigation}
                          data={data}
                        />
                      )}
                      <Layout
                        style={{marginVertical: 10, padding: 10}}
                        level="4"
                        title="Billing Information">
                        <Input
                          placeholder="First Name"
                          onChangeTextText={e => this.setState({bfn: e})}
                        />
                        <Input
                          placeholder="Last Name"
                          onChangeTextText={e => this.setState({bln: e})}
                        />
                        <Input
                          placeholder="Address 1"
                          onChangeTextText={e => this.setState({ba1: e})}
                        />
                        <Input
                          placeholder="Address 2"
                          onChangeText={e => this.setState({ba2: e})}
                        />
                        <Input
                          placeholder="City"
                          onChangeText={e => this.setState({bc: e})}
                        />
                        <Input
                          placeholder="Country"
                          onChangeText={e => this.setState({baC: e})}
                        />
                        <Input
                          placeholder="Company"
                          onChangeText={e => this.setState({bCP: e})}
                        />
                        <Input
                          placeholder="Email"
                          onChangeText={e => this.setState({be: e})}
                        />
                        <Input
                          placeholder="Phone"
                          onChangeText={e => this.setState({bp: e})}
                        />
                        <Input
                          placeholder="PostCode"
                          onChangeText={e => this.setState({bpc: e})}
                        />
                        <Input
                          placeholder="State"
                          onChangeText={e => this.setState({bs: e})}
                        />
                        <CheckBox
                          status="control"
                          text="Control"
                          center
                          title="Ship to different Address ?"
                          checked={this.state.checked}
                          onChange={() =>
                            this.setState({checked: !this.state.checked})
                          }
                        />
                      </Layout>
                      {this.state.checked ? (
                        <Layout
                          style={{marginVertical: 10, padding: 10}}
                          level="4"
                          title="Shipping Information">
                          <Input
                            placeholder="First Name"
                            onChangeText={e => this.setState({sfn: e})}
                          />
                          <Input
                            placeholder="Last Name"
                            onChangeText={e => this.setState({sln: e})}
                          />
                          <Input
                            placeholder="Address 1"
                            onChangeText={e => this.setState({sa1: e})}
                          />
                          <Input
                            placeholder="Address 2"
                            onChangeText={e => this.setState({sa2: e})}
                          />
                          <Input
                            placeholder="City"
                            onChangeText={e => this.setState({sc: e})}
                          />
                          <Input
                            placeholder="Country"
                            onChangeText={e => this.setState({saC: e})}
                          />
                          <Input
                            placeholder="Company"
                            onChangeText={e => this.setState({sCP: e})}
                          />
                          <Input
                            placeholder="Email"
                            onChangeText={e => this.setState({se: e})}
                          />
                          <Input
                            placeholder="Phone"
                            onChangeText={e => this.setState({sp: e})}
                          />
                          <Input
                            placeholder="PostCode"
                            onChangeText={e => this.setState({spc: e})}
                          />
                          <Input
                            placeholder="State"
                            onChangeText={e => this.setState({ss: e})}
                          />
                        </Layout>
                      ) : (
                        <View />
                      )}
                      <Layout
                        style={{marginVertical: 10, padding: 10}}
                        level="4"
                        title="Payment Method">
                        <Text>Cash On Delivery Only Supported YET!</Text>
                      </Layout>
                      <Button
                        onPress={() => {
                          this.checkout(CheckoutInput);
                        }}>
                        CHECKOUT
                      </Button>
                    </View>
                  )}
                </Mutation>
              </ScrollView>
            </React.Fragment>
          )}
        </Mutation>
      </Layout>
    ) : (
      <View />
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    Cart: state.Cart,
  };
};

class DoMutation extends React.Component {
  componentDidMount() {
    const {mutate} = this.props;
    mutate();
  }

  render() {
    return null;
  }
}

class DoRedirect extends React.Component {
  async componentDidMount() {
    if (this.props.error) {
      await AsyncStorage.removeItem('userToken');
      this.props.dispatch({type: 'LOGOUTUSER'});
    }
  }

  render() {
    return null;
  }
}
class DoRedirect2Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  componentDidMount() {
    if (this.props.data) {
      this.setState({isVisible: true});
      // this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <Modal visible={this.state.isVisible}>
        <Layout
          level={'4'}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 256,
            padding: 16,
          }}>
          <Text style={{fontSize: 20}}>Success</Text>
          <Button onPress={() => this.props.navigation.navigate('Home')}>
            {' '}
            Close{' '}
          </Button>
        </Layout>
      </Modal>
    );
  }
}

class RefreshToken extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      AsyncStorage.getItem('userToken').then(res => {
        const a = JSON.parse(res);
        // console.log(res.refreshJwtAuthToken.authToken)

        a.authToken = res.refreshJwtAuthToken.authToken;
        AsyncStorage.setItem('userToken', JSON.stringify(a));
      });
    }
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps)(Checkout);
