import { Skeleton } from './skeleton'

interface IProps {
  numberLines?: number
  lineH?: number
}

function SkeletonContent({ numberLines = 3, lineH = 3 }: IProps) {
  return (
    <div className="flex flex-col w-full gap-2 grow justify-center">
      {Array.from({ length: numberLines }).map((_, index) => (
        <Skeleton key={index} className={`h-${lineH}`} />
      ))}
    </div>
  )
}

export default SkeletonContent
