import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import DeckBrief from './DeckBrief'
import { globalStyles } from '../utils/styles'
import { receiveDecks } from '../actions'

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks } = this.props

    if (Object.keys(decks).length === 0) {
      return (
          <View style={[globalStyles.container, globalStyles.center]}>
            <Text style={{fontSize:18}}>Welcome to Mobile Flashcards!</Text>
            <Text>Add your first deck to begin training</Text>
          </View>
      )
    }

    return (
        <View style={{flex: 1, paddingTop: 15}}>
        {Object.keys(decks).map((deck) => (
            <View key={deck} style={[globalStyles.item]}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                  'Deck',
                  { deck: decks[deck] }
              )}>
                <DeckBrief deck={decks[deck]} />
              </TouchableOpacity>
            </View>
        ))}
        </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
