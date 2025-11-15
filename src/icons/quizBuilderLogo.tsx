import { createLucideIcon } from 'lucide-react'

export const QuizBuilderLogo = createLucideIcon('QuizBuilderLogo', [
  // Prancheta
  [
    'rect',
    { x: '4', y: '3', width: '16', height: '18', rx: '2', ry: '2', key: '1' },
  ],
  ['path', { d: 'M9 3V1h6v2', key: '2' }],
  ['rect', { x: '8', y: '1', width: '8', height: '4', rx: '1', key: '3' }],

  // Marca de verificação
  ['path', { d: 'M9 9l1.5 1.5L13 8', key: '4' }],

  // Linhas do texto
  ['line', { x1: '8', y1: '13', x2: '14', y2: '13', key: '5' }],
  ['line', { x1: '8', y1: '16', x2: '12', y2: '16', key: '6' }],

  // Engrenagem (builder)
  ['circle', { cx: '18', cy: '17', r: '2', key: '7' }],
  [
    'path',
    {
      d: `
      M18 13.8v1.2
      M18 19v1.2
      M15.8 15.8l.8.8
      M20.6 20.6l.8.8
      M13.8 17h1.2
      M21 17h1.2
      M15.8 18.2l.8-.8
      M20.6 13.4l.8-.8
    `,
      key: '8',
    },
  ],
])
