import { QuizBuilderLogo } from '@/icons/quizBuilderLogo'
import { Link } from 'react-router'

function LogoLink() {
  return (
    <Link to={'/'} className="flex items-center gap-1">
      <QuizBuilderLogo />
      <h1 className="text-2xl font-bold">Quiz Builder</h1>
    </Link>
  )
}

export default LogoLink
