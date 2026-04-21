import { Field } from './field'
import { Input } from './input'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import FetchingButton from './fetchingButton'
import { SearchIcon } from 'lucide-react'

interface SearchProps {
  placeholder: string
  submitSearch: (value: string) => void
  isSearching?: boolean
  selectors?: ReactNode | ReactNode[]
}

function Search({
  placeholder,
  submitSearch,
  isSearching = false,
  selectors,
}: SearchProps) {
  const isMobile = useIsMobile()
  const [searchText, setSearchText] = useState('')
  const btnSubmitRef = useRef<HTMLButtonElement>(null)

  const submit = () => {
    submitSearch(searchText)
  }

  const clickByKeyEnter = () => {
    if (btnSubmitRef.current) {
      btnSubmitRef.current.click()
    }
  }

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && searchText) {
        clickByKeyEnter()
      }
    }

    window.addEventListener('keydown', handleEvent)
    return () => {
      window.removeEventListener('keydown', handleEvent)
    }
  }, [searchText])

  return (
    <Field orientation={isMobile ? 'vertical' : 'horizontal'}>
      {selectors}
      <Input
        type="search"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <FetchingButton
        isFetching={isSearching}
        variant={'secondary'}
        fetchingFunc={submit}
        ref={btnSubmitRef}
        buttonContent={<SearchIcon />}
      />
    </Field>
  )
}

export default Search
