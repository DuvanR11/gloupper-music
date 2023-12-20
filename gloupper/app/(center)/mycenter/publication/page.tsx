import { getListings } from '@/app/actions/center';
import { getCurrentUser } from '@/app/actions/user'
import { IParamsCenter } from '@/interfaces';
import PublicationClient from './PublicationClient';
import { EmptyState } from '@/components/ui/loads';


interface TourPageProps { searchParams: IParamsCenter };

const PublicationPage = async ({ searchParams }: TourPageProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
        title="No autorizado"
        subtitle="Debes Iniciar Sesion"
        />
    }
    
    const center = await getListings({ centerId: searchParams.centerId })

  if (!center) {
    return <EmptyState
      title="No hay un centro registrado"
      subtitle="Debes Crear uno"
    />
  }

  return ( <PublicationClient publication={{}} center={center[0]}/> )
}

export default PublicationPage