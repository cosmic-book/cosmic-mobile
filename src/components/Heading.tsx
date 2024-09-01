import React from 'react'
import { Text } from 'react-native'

type HeadingProps = {
  content: string
}

export function Heading({ content }: HeadingProps) {
  return <Text className="text-4xl font-extrabold text-textDark">{content}</Text>
}
