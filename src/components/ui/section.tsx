import type { ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'
interface SectionProps {
  icon: LucideIcon
  title: string
  children: ReactNode
}

function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <section className="flex flex-col mb-8">
      <div className="flex items-center justify-center gap-2 py-3 text-xl font-medium rounded bg-primary text-primary-foreground">
        <Icon />
        {title}
      </div>
      <div className="py-8">{children}</div>
    </section>
  )
}

export default Section
