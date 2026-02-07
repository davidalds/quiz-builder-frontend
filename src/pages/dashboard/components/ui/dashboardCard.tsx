import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardCardProps {
  cardTitle: string
  cardContent: number | string
}

function DashboardCard({ cardTitle, cardContent }: DashboardCardProps) {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle className="text-lg">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl">{cardContent}</h2>
      </CardContent>
    </Card>
  )
}

export default DashboardCard
