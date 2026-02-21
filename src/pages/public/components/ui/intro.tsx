import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { Link } from 'react-router'

function Intro() {
  const isMobile = useIsMobile()
  return (
    <div className="flex flex-col mb-3 min-h-100 justify-center items-center gap-8">
      <div
        className={`flex flex-col gap-2 items-center justify-center text-center ${isMobile ? 'text-2xl' : 'text-3xl'} text-primary font-bold`}
      >
        <span>Crie Para Qualquer Um</span>
        <span>Responda Para Qualquer Um</span>
      </div>
      <Button size={'lg'} asChild>
        <Link to={'/dashboard'}>Crie Seu Quiz</Link>
      </Button>
    </div>
  )
}

export default Intro
