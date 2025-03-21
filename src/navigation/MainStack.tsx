import { TMainStackParamList } from '@/@types/navigation'
import { Footer } from '@/components'
import {
  EditionDetailsScreen,
  BookshelfScreen,
  HistoriesScreen,
  MenuScreen,
  ProfileEditScreen,
  ProfileScreen,
  SearchScreen,
  SettingsScreen
} from '@/screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

const Tab = createBottomTabNavigator<TMainStackParamList>()

const MainStack: React.FC = () => (
  <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
    <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Bookshelf" component={BookshelfScreen} options={{ headerShown: false }} />
    <Tab.Screen name="EditionDetails" component={EditionDetailsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="History" component={HistoriesScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Tab.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
)

export default MainStack
