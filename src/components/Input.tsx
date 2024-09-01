import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const inputVariants = cva('flex flex-col gap-1.5 bg-gray-100 rounded-lg py-2.5 px-4', {
  variants: {
    variant: {
      default: '',
      error: 'border-solid border-2 border-error'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  label?: string
  labelClasses?: string
  inputClasses?: string
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, variant, inputClasses, ...props }, ref) => (
    <View className={cn(className)}>
      {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}
      <TextInput className={cn(inputVariants({ variant, className }))} {...props} />
      {variant === 'error' && <Text className="text-error text-sm ml-2">Campo obrigatório</Text>}
    </View>
  )
)

export { Input }
