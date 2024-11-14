import { cva, type VariantProps } from 'class-variance-authority'
import { LucideProps, X } from 'lucide-react-native'
import React, { forwardRef } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { cn } from '../../lib/utils'

const viewVariants = cva('flex-row items-center rounded-md border py-1', {
  variants: {
    variant: {
      default: 'border-gray-300',
      error: 'border-error'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const inputVariants = cva('flex-col gap-1.5 rounded-lg py-2.5 px-4', {
  variants: {
    variant: {
      default: 'placeholder-gray-400',
      error: 'placeholder-error'
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
  endIcon?: React.FC<LucideProps>
  endIconPress?: () => void
  clearable?: boolean
  editable?: boolean
}

function Icon({ icon: Icon, disabled = false }: { icon: React.FC<LucideProps>, disabled?: boolean }) {
  return <Icon color={!disabled ? '#5d5d5d' : '#d1d5db'} size={20} />
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, variant, inputClasses, startIcon, endIcon, endIconPress, clearable, editable = true, ...props }, ref) => (
    <View className={cn(className)}>
      {
        label &&
        <Text className={cn('text-base', labelClasses)}>
          {label}
        </Text>
      }

      <View className={cn('', viewVariants({ variant, className }), inputClasses)}>
        {startIcon && (
          <View className="pl-4">
            <Icon icon={startIcon} />
          </View>
        )}

        <TextInput
          ref={ref}
          editable={editable}
          className={cn('flex-1 selection:text-blue-400 caret-blue-400', inputVariants({ variant, className }), inputClasses)}
          {...props}
        />

        {clearable && props.value && (
          <TouchableOpacity className="pr-4" onPress={() => props.onChangeText?.('')}>
            <Icon icon={X} />
          </TouchableOpacity>
        )}

        {!clearable && endIcon && (
          <TouchableOpacity disabled={!editable} onPress={endIconPress} className="pr-4">
            <Icon icon={endIcon} disabled={!editable} />
          </TouchableOpacity>
        )}
      </View>

      {
        variant === 'error' &&
        <Text className="text-error text-sm ml-2">
          Campo obrigatório
        </Text>
      }
    </View>
  )
)

export { Input }
