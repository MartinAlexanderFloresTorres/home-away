
import Container from "@/app/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PerfilClient from "./PerfilClient";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "../components/Heading";

const PerfilPage = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return ( 
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
          <Heading
            center
            title="No Autorizado"
            subtitle="Necesitas iniciar sesión para ver tu Perfil"
          />
        </div>
       );        
  }


  return (
    <Container>
        <ClientOnly>
            <div className="mt-5">
                {currentUser && (
                    <PerfilClient currentUser={currentUser} />
                )}
            </div>
        </ClientOnly>
    </Container>
  );
}

export default PerfilPage;
