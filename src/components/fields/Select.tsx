import { Keyboard, Text, TouchableOpacity } from "react-native";
import { DropDown, DropDownContent, DropDownItem, DropDownTrigger } from "../DropDown";
import { Input } from "./Input";

type Props = {
  options: string[]
  placeholder: string
  value: string
  onChangeOption: (value: string) => void
  variant: "default" | "error" | null | undefined
}

export function Select({ options, placeholder, value, onChangeOption, variant }: Props) {
  return (
    <DropDown>
      <DropDownTrigger>
        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => onChangeOption(text)}
          variant={variant}
          showSoftInputOnFocus={false}
          clearable
        />
      </DropDownTrigger>

      <DropDownContent>
        {options.map((item, index) => (
          <DropDownItem key={index}>
            <TouchableOpacity
              className={`flex-row gap-2 items-center ${index < options.length - 1 ? 'border_bottom pb-3' : ''}`}
              onPress={() => onChangeOption(item)}
            >
              <Text className="text-black text-xl">
                {item}
              </Text>
            </TouchableOpacity>
          </DropDownItem>
        ))}
      </DropDownContent>
    </DropDown>
  )
}