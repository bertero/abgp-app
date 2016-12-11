import { AppRegistry, View, ScrollView, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'
import React, { Component, PropTypes } from 'react'
import t                               from 'tcomb-form-native'
import { connect }                     from 'react-redux'
import { Actions }                     from 'react-native-router-flux'
import _                               from 'lodash'

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
  console.log('starting fetch...')
  return fetch('http://9276bf57.ngrok.io/api/v1', {
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
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    })
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataToExibit : {},
      showResults  : false
    }

    this.onPress = this.onPress.bind(this)
  }

  onPress(event) {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value) // value here is an instance of Pedido
      this.setState({dataToExibit : getPedido(value), showResults : true})
    }
  }

    render() {
      const { showResults, dataToExibit } = this.state

      if (!showResults) {
        return (
          <View style={styles.container}>
            <Form
              ref="form"
              type={Pedido}
            />
            <TouchableHighlight style={styles.button} onPress={ (event) => { this.onPress(event) }} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableHighlight>
            <Text>Exemplo de Codigo de Pedido: 5848a0dec95ef6209f7aff02</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <Text>{ 
              JSON.stringify(dataToExibit, null, 2)
            //   _(dataToExibit).map((value, key) => {
            //   return (
            //           <Text>{ key }:</Text>
            //           <Text>{ value }</Text>
            //           )
            // }) 
          }</Text>
          </View>
        )
      }      
    }
}

export default connect(mapStateToProps)(App)