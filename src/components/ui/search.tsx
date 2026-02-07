import { SearchIcon } from 'lucide-react'
import { Button } from './button'
import { Field } from './field'
import { Input } from './input'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Spinner } from './spinner'

interface SearchProps {
  placeholder: string
  submitSearch: (value: string) => void
  isSearching?: boolean
}

function Search({
  placeholder,
  submitSearch,
  isSearching = false,
}: SearchProps) {
  const isMobile = useIsMobile()
  const [searchText, setSearchText] = useState('')

  const submit = () => {
    submitSearch(searchText)
  }

  return (
    <Field orientation={isMobile ? 'vertical' : 'horizontal'}>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button disabled={isSearching} variant={'secondary'} onClick={submit}>
        {isSearching ? (
          <Spinner />
        ) : (
          <>
            <SearchIcon /> Pesquisar
          </>
        )}
      </Button>
    </Field>
  )
}

export default Search
