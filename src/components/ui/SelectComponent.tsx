import type { ReactNode } from 'react'
import { Select, SelectContent, SelectTrigger, SelectValue } from './select'

interface SelectComponentProps {
  defaultValue: string
  changeValue: (value: string) => void
  children: ReactNode | ReactNode[]
}

function SelectComponent({
  defaultValue,
  changeValue,
  children,
}: SelectComponentProps) {
  return (
    <Select onValueChange={changeValue}>
      <SelectTrigger>
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
}

export default SelectComponent
