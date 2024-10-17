import { Button } from "@/components/ui/button"

interface FilterButtonsProps {
  filter: string
  setFilter: (filter: string) => void
}

export default function FilterButtons({ filter, setFilter }: FilterButtonsProps) {
  return (
    <div className="flex justify-between mb-6">
      <div className="space-x-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Todas
        </Button>
        <Button 
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
        >
          Activas
        </Button>
        <Button 
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </Button>
      </div>
    </div>
  )
}
