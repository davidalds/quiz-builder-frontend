import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

interface FormSelectProps<T extends FieldValues> {
  selectLabel: string
  selectPlaceholder?: string
  field: ControllerRenderProps<T, Path<T>>
  selectItems: { value: string; label: string }[]
}

function FormSelect<T extends FieldValues>({
  selectLabel,
  selectPlaceholder = '',
  field,
  selectItems,
}: FormSelectProps<T>) {
  return (
    <FormItem>
      <FormLabel>{selectLabel}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className={'w-[100%]'}>
            <SelectValue placeholder={selectPlaceholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {selectItems.map(({ value, label }, index) => (
            <SelectItem key={index} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )
}

export default FormSelect
