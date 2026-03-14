import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Category } from '@/types/categories'
import { useEffect, useState } from 'react'

interface MultiSelectProps {
  changeFieldValue: (data: { slug: string }[]) => void
  defaultValues?: Category[]
  categories?: Category[]
  errorMessage?: string
}

function MultiSelect({
  defaultValues = [],
  categories,
  changeFieldValue,
  errorMessage = '',
}: MultiSelectProps) {
  const [optionsSelected, setOptionsSelected] =
    useState<Array<{ slug: string }>>(defaultValues)

  const findOptions = (slug: string) => {
    return optionsSelected.find((opt) => opt.slug === slug)
  }

  const handleOptionsSelected = (slug: string) => {
    if (findOptions(slug)) {
      setOptionsSelected(optionsSelected.filter((opt) => opt.slug !== slug))
    } else {
      setOptionsSelected((prev) => [...prev, { slug }])
    }
  }

  useEffect(() => {
    changeFieldValue(optionsSelected)
  }, [optionsSelected, changeFieldValue])

  return (
    <>
      <FieldLabel>Categorias</FieldLabel>
      <FieldGroup className="rounded-md border">
        <ScrollArea className="pl-1 h-30">
          {categories
            ? categories.map(({ title, slug }) => (
                <Field orientation={'horizontal'} key={slug} className="my-2">
                  <Checkbox
                    checked={findOptions(slug) ? true : false}
                    id={slug}
                    onCheckedChange={() => handleOptionsSelected(slug)}
                  />
                  <Label htmlFor={slug}>{title}</Label>
                </Field>
              ))
            : []}
        </ScrollArea>
      </FieldGroup>
      <FormMessage>{errorMessage}</FormMessage>
    </>
  )
}

export default MultiSelect
