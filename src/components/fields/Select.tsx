import { ChevronDown, X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { DropDown, DropDownContent, DropDownItem, DropDownTrigger } from "../DropDown";
import { useState } from "react";

type Option = {
  id: number
  label: string
}

type Props = {
  options: Option[]
  placeholder: string
  value: number | null
  onChangeOption: (value: number | null) => void
  variant?: "default" | "error" | null | undefined
}

export function Select({ options, placeholder, value, onChangeOption, variant }: Props) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeOption = (item: Option) => {
    onChangeOption(item.id)
    setInputValue(item.label)
  }

  const handleClear = () => {
    onChangeOption(null)
    setInputValue('')
  }

  return (
    <View>
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity
            activeOpacity={1}
            className={`${variant === 'error' ? 'border-error' : 'border-gray-300'} border rounded-md py-3.5 px-4`}>
            {value !== null && value >= 0 ? (
              <View className="flex-row items-center justify-between">
                <Text>{inputValue}</Text>

                <TouchableOpacity onPress={handleClear}>
                  <X color="#5d5d5d" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-400">{placeholder}</Text>

                <ChevronDown color="#5d5d5d" size={20} />
              </View>
            )}
          </TouchableOpacity>
        </DropDownTrigger>

        <DropDownContent>
          {options.map((item, index) => (
            <DropDownItem key={item.id}>
              <TouchableOpacity
                className={`flex-row gap-2 items-center ${index < options.length - 1 ? 'border_bottom pb-3' : ''}`}
                onPress={() => handleChangeOption(item)}
              >
                <Text className="text-black text-xl">
                  {item.label}
                </Text>
              </TouchableOpacity>
            </DropDownItem>
          ))}
        </DropDownContent>
      </DropDown>

      {
        variant === 'error' &&
        <Text className="text-error text-sm ml-2">
          Campo obrigatório
        </Text>
      }
    </View>
  );
}
