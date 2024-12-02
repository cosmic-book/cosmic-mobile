import { TextInput } from "react-native";

type Props = {
  placeholder: string,
  value: string,
  onChangeText: (value: string) => void
}

export function InputArea({ placeholder, value, onChangeText }: Props) {
  return (
    <TextInput
      className="h-48 border border-gray-300 rounded-lg p-4 align-top selection:text-blue-400 caret-blue-400"
      placeholder={placeholder}
      multiline
      value={value}
      onChangeText={onChangeText}
    />
  )
}