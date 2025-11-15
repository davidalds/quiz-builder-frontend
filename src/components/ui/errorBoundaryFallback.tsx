import AlertComponent from './alertComponent'

function ErrorBoundaryFallback() {
  return (
    <div className="py-2">
      <AlertComponent
        alertType={'error'}
        title="Ocorreu um erro ao carregar a página!"
      >
        Tente novamente mais tarde
      </AlertComponent>
    </div>
  )
}

export default ErrorBoundaryFallback
