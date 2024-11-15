import { CustomToast } from '@/components'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalProvider } from '@/contexts/GlobalContext'
import Navigation from '@/navigation/Navigation'
import '@/styles/global.css'
import '@/styles/style.css'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
        <CustomToast />
      </AuthProvider>
    </GlobalProvider>
  )
}
