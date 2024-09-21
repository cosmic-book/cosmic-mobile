/* eslint-disable prettier/prettier */
import React, { cloneElement, createContext, useContext, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { cn } from '../lib/utils'

interface DropDownContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropDownContext = createContext<DropDownContextType | undefined>(undefined)

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handlePressOutside = () => {
    setOpen(false)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <DropDownContext.Provider value={{ open, setOpen }}>
        <View className="relative">{children}</View>
      </DropDownContext.Provider>
    </TouchableWithoutFeedback>
  )
}

const DropDownTrigger = ({ children }: any) => {
  const { setOpen } = useDropdown()
  return cloneElement(children, {
    onPress: () => setOpen((prev: any) => !prev),
    onBlur: () => setOpen(false)
  })
}

type DropDownContentTypes = {
  className?: string
  children: React.ReactNode
}

const DropDownContent = ({ className, children }: DropDownContentTypes) => {
  const { open } = useDropdown()
  return (
    <>
      {open && (
        <View
          style={{
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 5,
          }}
          className={cn(
            'min-w-[8rem] w-full absolute flex gap-3 overflow-hidden rounded-md bg-white text-popover-foreground mt-3 p-3 top-12 mx-auto justify-center z-50',
            className
          )}
        >
          {children}
        </View>
      )}
    </>
  )
}

type DropDownLabelProps = {
  labelTitle: string
}

const DropDownLabel = ({ labelTitle }: DropDownLabelProps) => {
  return <Text className="text-xl font-semibold text-black">{labelTitle}</Text>
}

type DropDownItemProps = {
  children: React.ReactNode
  className?: string
  onPress?: () => void
}

const DropDownItem = ({ children, className, onPress }: DropDownItemProps) => {
  const { setOpen } = useDropdown()

  const handlePress = () => {
    onPress?.() // Executa a função onPress se fornecida
    setOpen(false) // Fecha o dropdown
  }

  return (
    <View className={cn('bg-default rounded-md', className)} onTouchEnd={handlePress}>
      {children}
    </View>
  )
}

const DropDownItemSeparator = () => {
  return <View className="h-[1px] bg-border flex-1" />
}
const useDropdown = () => {
  const context = useContext(DropDownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}
export { DropDown, DropDownTrigger, DropDownContent, DropDownLabel, DropDownItemSeparator, DropDownItem, useDropdown }
