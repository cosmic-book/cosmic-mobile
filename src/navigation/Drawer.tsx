import { LoginScreen } from '@/screens';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MenuDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}