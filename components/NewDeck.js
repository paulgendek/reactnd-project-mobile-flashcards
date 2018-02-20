import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { globalStyles } from '../utils/styles'
import { SubmitBtn } from '../utils/helpers'

class NewDeck extends Component {
  state = {
    title: '',
  }

  addCards = (title) => {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Deck',
      params: {
        deck: {
          'title': title
        }
      }
    }))
  }

  submit = () => {
    const { title } = this.state

    this.props.dispatch(addDeck({
      [title]: {
        title,
        questions: []
      }
    }))

    this.setState({
      title: ''
    })

    if (title) {
      saveDeckTitle(title)
      this.addCards(title)
    }
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder={'Deck Title'}
            autoFocus
        />
        <SubmitBtn onPress={this.submit} value={'Create Deck'} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(NewDeck)
