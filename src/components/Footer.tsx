import { CircleUserRound, Library, Menu, Search } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export function Footer({ state, navigation }: any) {
  const [activePage, setActivePage] = useState('Search')

  const tabs = [
    { label: 'Menu', page: 'Menu', icon: <Menu /> },
    { label: 'Buscar', page: 'Search', icon: <Search /> },
    { label: 'Estante', page: 'Bookshelf', icon: <Library /> },
    { label: 'Perfil', page: 'Profile', icon: <CircleUserRound /> }
  ]

  const handlePress = (page: string) => {
    setActivePage(page)
    navigation.navigate(page)
  }

  return (
    <View className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white border-t border-gray-200">
      <View className="flex-1 flex-row justify-around items-center">
        {tabs.map(({ label, page, icon }) => (
          <TouchableOpacity
            key={label}
            className="flex-col items-center justify-center px-5"
            onPress={() => handlePress(page)}
          >
            {React.cloneElement(icon, { color: activePage === page ? '#1460cd' : '#2d2d2d', size: 30 })}
            <Text className={`text-sm ${activePage === page ? 'text-blue-600' : 'text-gray-500'}`}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
