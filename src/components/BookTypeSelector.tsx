import { AudioLines, BookOpenText, TabletSmartphone } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function BookTypeSelector() {
  const types = [
    { id: 0, label: 'Físico', icon: BookOpenText },
    { id: 1, label: 'Digital', icon: TabletSmartphone },
    { id: 2, label: 'Audio', icon: AudioLines },
  ]

  const [selected, setSelected] = useState(0)

  const handleChangeSelected = (id: number) => {
    setSelected(id)
  }

  return (
    <View className='flex-row gap-8'>
      {types.map(({ id, label, icon: Icon }) => (
        <View className='flex-col items-center'>
          <TouchableOpacity onPress={() => handleChangeSelected(id)} className={`${selected == id ? 'bg-primary' : 'bg-slate-200'} p-4 rounded-lg`}>
            <Icon size={30} color={selected == id ? 'white' : '#a6b1c0'} />
          </TouchableOpacity>
          <Text className="mt-1 text-gray-500">{label}</Text>
        </View>
      ))}
    </View>
  )
}