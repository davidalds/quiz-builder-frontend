import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'

type inputType = 'input' | 'textarea'

interface FormInputProps<T extends FieldValues> {
  inputType?: inputType
  inputLabel: string
  inputPlaceholder?: string
  fieldError?: FieldError | undefined
  field: ControllerRenderProps<T, Path<T>>
}

function FormInput<T extends FieldValues>({
  inputLabel: fieldLabel,
  fieldError,
  inputPlaceholder = '',
  field,
  inputType = 'input',
}: FormInputProps<T>) {
  return (
    <FormItem>
      <FormLabel>{fieldLabel}</FormLabel>
      <FormControl>
        {inputType === 'input' ? (
          <Input placeholder={inputPlaceholder} {...field} />
        ) : (
          <Textarea placeholder={inputPlaceholder} {...field} />
        )}
      </FormControl>
      {fieldError ? <FormMessage>{fieldError.message}</FormMessage> : <></>}
    </FormItem>
  )
}

export default FormInput
