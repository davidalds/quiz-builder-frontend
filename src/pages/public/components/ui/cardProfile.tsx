import { useAuth } from '@/auth/useAuth'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User } from 'lucide-react'
import React from 'react'

function CardProfile() {
  const auth = useAuth()
  return (
    <Card className="px-2">
      <div className="flex align-items gap-2">
        <div className="flex flex-col align-items justify-center bg-muted rounded p-4">
          <User size={'70'} />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          {Object.entries(auth.user).map(([key, value], index) => (
            <React.Fragment key={index}>
              <div className="flex gap-2">
                <Badge variant={'secondary'}>{key}:</Badge>
                <span>{value}</span>
              </div>
              {index + 1 < Object.entries(auth.user).length ? (
                <Separator />
              ) : (
                <></>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default CardProfile
