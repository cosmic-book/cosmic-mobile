import { BookshelfScreen, ProfileScreen, SearchScreen } from '@/screens'
import { Footer } from '@/components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
      {/* <Tab.Screen name="Menu" component={MenuScreen} /> */}
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Bookshelf" component={BookshelfScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
