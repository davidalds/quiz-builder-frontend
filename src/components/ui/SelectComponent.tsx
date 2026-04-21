import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'

interface Item {
  text: string
  value: string
}

interface SelectComponentProps {
  defaultValue: string
  defaultItem: Item
  label: string
  changeValue: (value: string) => void
  items: Item[] | undefined
}

function SelectComponent({
  defaultValue,
  defaultItem: { text, value: itemValue },
  changeValue,
  label,
  items,
}: SelectComponentProps) {
  return (
    <Select
      onValueChange={(value) => {
        if (value === itemValue) changeValue('')
        else changeValue(value)
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value={itemValue}>{text}</SelectItem>
          {items?.map(({ text, value }) => (
            <SelectItem key={value} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectComponent
