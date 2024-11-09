import { Genders } from "@/enums";
import { Select } from "./Select";

type Props = {
  value: number | null
  onChangeOption: (value: number | null) => void
  variant?: 'default' | 'error' | null | undefined
}

export function GenderSelect({ value, onChangeOption, variant }: Props) {
  const genders = [{
    id: 1,
    label: Genders.MASCULINE
  }, {
    id: 2,
    label: Genders.FEMININE
  }, {
    id: 3,
    label: Genders.OTHER
  }, {
    id: 0,
    label: Genders.NOT_INFORMED
  }];

  return (
    <Select
      placeholder='Gênero *'
      options={genders}
      value={value}
      onChangeOption={onChangeOption}
      variant={variant}
    />
  )
}