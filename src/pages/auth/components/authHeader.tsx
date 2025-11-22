interface IProps {
  title: string
  subtitle: string
}

function AuthHeader({ title, subtitle }: IProps) {
  return (
    <div className="flex flex-col gap-1 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
}

export default AuthHeader
