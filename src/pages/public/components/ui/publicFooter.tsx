import { SiVite, SiTypescript, SiNestjs, SiReact } from 'react-icons/si'
function PublicFooter() {
  return (
    <footer className="flex justify-center items-center p-3 bg-secondary text-secondary-foreground mt-4 text-lg gap-2">
      <span className="font-medium">Desenvolvido com:</span> <SiReact /> +{' '}
      <SiVite /> + <SiNestjs /> + <SiTypescript />
    </footer>
  )
}

export default PublicFooter
