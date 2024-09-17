import { cva, type VariantProps } from 'class-variance-authority'
import { LucideProps, X } from 'lucide-react-native'
import React, { forwardRef } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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
  startIcon?: React.FC<LucideProps>
  clearable?: boolean
}

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon color="#5d5d5d" size={20} />
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, variant, inputClasses, startIcon, clearable, ...props }, ref) => (
    <View className={cn(className)}>
      {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}

      <View className="flex-row items-center bg-gray-100 rounded-lg">
        {startIcon && (
          <View className="pl-4">
            <Icon icon={startIcon} />
          </View>
        )}

        <TextInput ref={ref} className={cn('flex-1', inputVariants({ variant, className }), inputClasses)} {...props} />

        {clearable && props.value && (
          <TouchableOpacity className="pr-4" onPress={() => props.onChangeText?.('')}>
            <Icon icon={X} />
          </TouchableOpacity>
        )}
      </View>

      {variant === 'error' && <Text className="text-error text-sm ml-2">Campo obrigatório</Text>}
    </View>
  )
)

export { Input }
