import { type VariantProps, cva } from 'class-variance-authority'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import { cn } from '../lib/utils'

const buttonVariants = cva('flex flex-row justify-center items-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
      disabled: 'bg-gray-300',
      link: 'text-primary underline-offset-4',
      inline: 'bg-transparent'
    },
    size: {
      default: 'h-12 px-4',
      sm: 'h-8 px-2',
      lg: 'h-12 px-8'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-white',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      disabled: 'text-primary-foreground',
      link: 'text-gray-600 underline',
      inline: 'text-gray-500'
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
  VariantProps<typeof buttonVariants> {
  label: string
  labelClasses?: string
  loading?: boolean
}

function Button({ label, labelClasses, loading, className, variant, size, ...props }: ButtonProps) {


  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant: loading ? 'disabled' : variant, size, className }))}
      disabled={loading}
      {...props}
    >
      {loading ?
        <ActivityIndicator color="#6b7280" />
        :
        <Text
          className={cn(buttonTextVariants({ variant, size, className: labelClasses }))}
        >
          {label}
        </Text>
      }
    </TouchableOpacity>
  )
}

export { Button, buttonTextVariants, buttonVariants }
