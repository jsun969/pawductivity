import '../global.css';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Button, View } from 'react-native';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../lib/notifications';

// Configure the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const notificationId = useRef<string | null>(null);

  useEffect(() => {
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('Notification Token:', token);
    };

    setupNotifications();

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        // App is going to the background, schedule a notification
        notificationId.current = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Time to lock in! 🔔",
            body: "It's been 3 hours since you last used the app. Time to study!",
            data: { reason: 'inactivity' },
          },
          trigger: { seconds: 10800 }, // 3 hours
        });
        console.log('Notification scheduled:', notificationId.current);
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState.match(/active/)
      ) {
        // App is becoming active, cancel the scheduled notification
        if (notificationId.current) {
          await Notifications.cancelScheduledNotificationAsync(notificationId.current);
          console.log('Notification canceled:', notificationId.current);
          notificationId.current = null;
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="new-todo" options={{ presentation: 'modal', title: 'New Todo' }} />
      </Stack>
      {/* Add a button to test notifications */}
      <Button
        title="Test Notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}
