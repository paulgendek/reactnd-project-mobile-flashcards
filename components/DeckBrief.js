import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { gray } from '../utils/colors'

class DeckBrief extends Component {
  render() {
    const { deck } = this.props

    const count = (deck.questions) ? deck.questions.length : 0

    return (
        <View>
          <Text style={{fontSize: 18}}>{deck.title}</Text>
          <Text style={{color: gray}}>{count} cards</Text>
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(DeckBrief)
