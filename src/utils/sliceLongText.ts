const DEFAULT_LENGTH = 10

function sliceLongText({
  txt,
  sliceLength = DEFAULT_LENGTH,
}: {
  txt: string
  sliceLength?: number
}) {
  sliceLength = sliceLength <= 0 ? DEFAULT_LENGTH : sliceLength

  if (sliceLength >= txt.length) return txt

  return txt.slice(0, sliceLength) + '...'
}

export default sliceLongText
