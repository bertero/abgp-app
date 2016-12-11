import { AppRegistry, View, ScrollView, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'

import React, { Component, PropTypes } from 'react'
import t                               from 'tcomb-form-native'
import { connect }                     from 'react-redux'
import { Actions }                     from 'react-native-router-flux'

import { actionCreators } from '../redux/todoRedux'

const Form = t.form.Form

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  items: state.items,
})

// here we are: define your domain model
const Pedido = t.struct({
  email         : t.String,
  codigo_pedido : t.String
});

function getPedido(value) {
  return fetch('http://9276bf57.ngrok.io', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        codigo_pedido : value.codigo_pedido
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataToExibit : {}
    }

    this.onPress = this.onPress.bind(this)
  }

  onPress(event) {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Pedido
      getPedido(value)
    }
  }

    render() {
      return (
        <View style={styles.container}>
          <Form
            ref="form"
            type={Pedido}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={ (event) => { this.onPress(event) }} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      );
    }
}

export default connect(mapStateToProps)(App)