import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { TouchableOpacity, Text, Platform } from 'react-native'
import { globalStyles } from './styles'

const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function SubmitBtn({ onPress, style = {}, value }) {
  return (
      <TouchableOpacity
          style={[(Platform.OS === 'ios' ? globalStyles.iosSubmitBtn : globalStyles.androidSubmitBtn), style]}
          onPress={onPress}>
        <Text style={globalStyles.submitBtnText}>{value}</Text>
      </TouchableOpacity>
  )
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Mobile Flashcards',
    body: "Don't forget to quiz yourself today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data == null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                if (status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync()

                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(0)

                  Notifications.scheduleLocalNotificationAsync(
                      createNotification(),
                      {
                        time: tomorrow,
                        repeat: 'day'
                      }
                  )

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
              })
        }
      })
}

export function getPercentage(is, of) {
  return ((is / of) * 100).toFixed(2) + '%'
}

