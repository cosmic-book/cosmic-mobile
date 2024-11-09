import { ReadingType } from "@/enums";
import { AudioLines, BookOpenText, TabletSmartphone } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: number;
  onSelect: (value: number) => void;
}

export function ReadingTypeSelector({ value, onSelect }: Props) {
  const types = [
    { id: 0, label: ReadingType.PRINTED, icon: BookOpenText },
    { id: 1, label: ReadingType.DIGITAL, icon: TabletSmartphone },
    { id: 2, label: ReadingType.AUDIO, icon: AudioLines },
  ]

  const handleChangeSelected = (id: number) => {
    onSelect(id)
  }

  return (
    <View className='flex-row gap-8'>
      {types.map(({ id, label, icon: Icon }) => (
        <View key={id} className='flex-col items-center'>
          <TouchableOpacity onPress={() => handleChangeSelected(id)} className={`${value == id ? 'bg-primary' : 'bg-slate-200'} p-4 rounded-lg`}>
            <Icon size={30} color={value == id ? 'white' : '#a6b1c0'} />
          </TouchableOpacity>
          <Text className="mt-1 text-gray-500">{label}</Text>
        </View>
      ))}
    </View>
  )
}