import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { SubmitBtn } from '../utils/helpers'
import { blue, gray } from '../utils/colors'
import { globalStyles } from '../utils/styles'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: deck.title
    }
  }

  render() {
    const { title, questions } = this.props

    const count = (questions) ? questions.length : 0

    let quizBtn = null
    if (count > 0) {
      quizBtn = (
          <SubmitBtn onPress={() => this.props.navigation.navigate(
              'Quiz', {
                deck: {
                  title,
                  questions
                }
              }
          )} value={'Start a Quiz'} style={{backgroundColor: blue}} />
      )
    }

    return (
        <View style={globalStyles.container}>
          <Text style={{fontSize: 30, alignSelf: 'center'}}>{title}</Text>
          <Text style={{alignSelf: 'center', color: gray}}>{count} cards</Text>

          <SubmitBtn onPress={() => this.props.navigation.navigate(
              'AddCard',
              {
                deck: {
                  'title': title
                }
              }
          )} value={'Create New Question'} />

          {quizBtn}
        </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params

  return state[deck.title]
}

export default connect(mapStateToProps)(Deck)
