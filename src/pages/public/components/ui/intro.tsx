import { useIsMobile } from '@/hooks/use-mobile'

function Intro() {
  const isMobile = useIsMobile()
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center min-h-100 text-center ${isMobile ? 'text-2xl' : 'text-3xl'} text-primary font-bold`}
    >
      <span>Crie Para Qualquer Um</span>
      <span>Responda Para Qualquer Um</span>
    </div>
  )
}

export default Intro
