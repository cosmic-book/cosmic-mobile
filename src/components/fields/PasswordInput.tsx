import { useState } from "react";
import { Input } from "./Input";
import { Eye, EyeOff } from "lucide-react-native";

type Props = {
  placeholder: string,
  value: string,
  onChangeText: (value: string) => void
  variant?: 'default' | 'error' | null | undefined
}

export function PasswordInput({ placeholder, value, onChangeText, variant }: Props) {
  const [viewPassword, setViewPassword] = useState(false)

  const handleChangeView = () => {
    setViewPassword(!viewPassword)
  }

  return (
    <Input
      placeholder={placeholder}
      autoCapitalize="none"
      variant={variant}
      secureTextEntry={!viewPassword}
      value={value}
      onChangeText={onChangeText}
      endIcon={viewPassword ? EyeOff : Eye}
      endIconPress={handleChangeView}
    />
  )
}