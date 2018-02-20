import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { SubmitBtn } from '../utils/helpers'
import { globalStyles } from '../utils/styles'
import { addDeck } from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    const { title, questions } = this.props
    const { question, answer } = this.state

    if (question && answer) {

      this.props.dispatch(addDeck({
        [title]: {
          title,
          'questions': [
            ...questions,
            {
              question,
              answer
            }
          ]
        }
      }))

      this.setState(() => ({
        question: '',
        answer: '',
      }))

      addCardToDeck(title, { question, answer })
    }
  }

  render() {

    return (
        <View style={globalStyles.container}>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(question) => this.setState({question})}
              value={this.state.question}
              placeholder={'Question'}
              autoFocus
          />
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(answer) => this.setState({answer})}
              value={this.state.answer}
              placeholder={'Answer'}
              autoFocus
          />
          <SubmitBtn onPress={this.submit} value={'Submit'} />
        </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params

  return state[deck.title]
}

export default connect(mapStateToProps)(AddCard)
