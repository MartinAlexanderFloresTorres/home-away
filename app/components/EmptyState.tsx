'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No hay resultados",
  subtitle = "Intenta cambiar o remover los filtros de búsqueda",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remover filtros"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;