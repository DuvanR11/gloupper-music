

import ClientOnly from "@/components/layouts/ClientOnly";

import { getCurrentUser } from '@/app/actions/user'

import { EmptyState } from "@/components/ui/loads";
import MessageClient from "./MessageClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="No autorizado"
          subtitle="Por favor Iniciar sesión"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <MessageClient currentUser={ currentUser }/>
    </ClientOnly>
  );
}
 
export default TripsPage;
