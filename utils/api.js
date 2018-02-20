import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((decks) => {
        //console.log(JSON.parse(decks))
        return JSON.parse(decks)
      })
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((decks) => {
        //console.log(JSON.parse(decks)[id])
        return JSON.parse(decks)[id]
      })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    const deck = JSON.parse(decks)[title]
    let questions = deck.questions
    questions.push(card)

    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: {
        questions
      }
    }))
  })
}
