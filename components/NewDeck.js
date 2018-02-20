import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView } from 'react-native'
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
    // go directly to the new Deck view to start adding cards
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
      <KeyboardAvoidingView style={globalStyles.container} behavior={'padding'}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
            style={globalStyles.textInput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder={'Deck Title'}
            autoFocus
        />
        <SubmitBtn onPress={this.submit} value={'Create Deck'} />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(NewDeck)
