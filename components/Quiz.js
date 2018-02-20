import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { SubmitBtn, getPercentage, clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import { red, green } from '../utils/colors'
import { globalStyles } from '../utils/styles'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    count: 0,
    correct: 0,
    incorrect: 0,
    questionIndex: 0,
    showAnswer: false,
    showResults: false,
  }

  handleReset = () => {
    this.setState({
      correct: 0,
      incorrect: 0,
      questionIndex: 0,
      showAnswer: false,
      showResults: false,
    })
  }

  handleClick = (value) => {
    if (value === 'correct') {
      this.setState({ correct: this.state.correct + 1 })
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 })
    }

    if ((this.state.questionIndex + 1) === this.state.count) {
      this.setState({showResults: true})
    } else {
      this.setState({
        questionIndex: this.state.questionIndex + 1,
        showAnswer: false,
      })
    }
  }

  componentDidMount() {
    const { questions } = this.props
    const count = (questions) ? questions.length : 0

    this.setState({count: count})

    clearLocalNotifications()
      .then(setLocalNotification)
  }

  render() {
    const { questions } = this.props
    const { count, correct, incorrect, questionIndex, showAnswer, showResults } = this.state

    const Card = ({question, ...props}) => {
      if (this.state.showAnswer) {
        return (
            <TouchableOpacity onPress={() => this.setState({showAnswer: !showAnswer})}>
              <Text style={{fontSize:30}}>{question.answer}</Text>
              <Text style={[{color: red}]}>Tap to show question</Text>
            </TouchableOpacity>
        )
      } else {
        return (
            <TouchableOpacity onPress={() => this.setState({showAnswer: !showAnswer})}>
              <Text style={{fontSize:30}}>{question.question}</Text>
              <Text style={[{color: red}]}>Tap to show answer</Text>
            </TouchableOpacity>
        )
      }
    }

    if (showResults) {
      return (
          <View style={[globalStyles.container, globalStyles.center]}>
            <Text style={{fontSize: 18}}>Results</Text>
            <Text>You got {getPercentage(correct, count)} correct out of {count} questions!</Text>

            <SubmitBtn onPress={() => this.handleReset()} value={'Restart Quiz'} style={{backgroundColor: green}} />
            <SubmitBtn onPress={() => this.props.navigation.goBack()} value={'Back to Deck'} style={{backgroundColor: red}} />
          </View>
      )
    }

    return (
        <View style={[globalStyles.container, globalStyles.center]}>
          <Text>{questionIndex + 1} / {count}</Text>

          <Card style={[globalStyles.container, globalStyles.center]} question={questions[questionIndex]}/>

          <SubmitBtn onPress={() => this.handleClick('correct')} value={'Correct'} style={{backgroundColor: green}} />

          <SubmitBtn onPress={() => this.handleClick('incorrect')} value={'Incorrect'} style={{backgroundColor: red}} />
        </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params

  return state[deck.title]
}

export default connect(mapStateToProps)(Quiz)
