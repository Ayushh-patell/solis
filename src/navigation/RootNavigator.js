import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from './routes';
import SplashScreen from '../screens/SplashScreen';
import PermissionScreen from '../screens/PermissionsScreen';
import HomeScreen from '../screens/HomeScreen';
import ViewerScreen from '../screens/MediaViewerScreen';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASH}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name={ROUTES.SPLASH}
        component={SplashScreen}
      />

      <Stack.Screen
        name={ROUTES.PERMISSION}
        component={PermissionScreen}
      />

      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
      />

      <Stack.Screen
        name={ROUTES.VIEWER}
        component={ViewerScreen}
      />
    </Stack.Navigator>
  );
}