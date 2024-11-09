import { ReadingStatus } from "@/enums";
import { Select } from "./Select";

type Props = {
  value: number | null
  onChangeOption: (value: number | null) => void
  variant?: 'default' | 'error' | null | undefined
}

export function ReadingStatusSelect({ value, onChangeOption, variant }: Props) {
  const status = [{
    id: 0,
    label: ReadingStatus.TO_READ,
  }, {
    id: 1,
    label: ReadingStatus.READING,
  }, {
    id: 2,
    label: ReadingStatus.FINISHED,
  }, {
    id: 3,
    label: ReadingStatus.REREADING,
  }, {
    id: 4,
    label: ReadingStatus.ABANDONED,
  }];

  return (
    <Select
      placeholder='Status de Leitura'
      options={status}
      value={value}
      onChangeOption={onChangeOption}
      variant={variant}
    />
  )
}