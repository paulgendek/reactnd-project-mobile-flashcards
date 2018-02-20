import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { View, StatusBar, TouchableOpacity, Text, Platform, AsyncStorage } from 'react-native'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'

import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Quiz from './components/Quiz'

function MFStatusBar({ backgroundColor, ...props}) {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <MaterialIcons name='playlist-add' size={30} color={tintColor} />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
        <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <MFStatusBar backgroundColor={purple} barStyle='light-content' />
            <MainNavigator />
          </View>
        </Provider>
    );
  }
}
