import { Select } from "./Select";

type Props = {
  value: string
  onChangeOption: (value: string) => void
  variant?: 'default' | 'error' | null | undefined
}

export function GenderSelect({ value, onChangeOption, variant }: Props) {
  return (
    <Select
      placeholder='Gênero'
      options={['Masculino', 'Feminino', 'Outro']}
      value={value}
      onChangeOption={onChangeOption}
      variant={variant}
    />
  )
}