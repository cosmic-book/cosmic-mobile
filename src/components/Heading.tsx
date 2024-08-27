import React from 'react'
import { Text } from 'react-native'

type HeadingProps = {
  content: string
}

export function Heading(props: HeadingProps) {
  return <Text className="text-4xl font-extrabold text-textDark">{props.content}</Text>
}
