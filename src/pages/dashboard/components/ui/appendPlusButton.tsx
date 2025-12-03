import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface IProps {
  action: () => void
}

function AppendPlusButton({ action }: IProps) {
  return (
    <div className="flex justify-center py-2">
      <Button type="button" className="rounded-full" onClick={action}>
        <Plus />
      </Button>
    </div>
  )
}

export default AppendPlusButton
