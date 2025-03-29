// app/components/Pagination.tsx
import { Link } from "@remix-run/react";

interface PaginationProps {
  currentPage: number;   // Página actual que se está mostrando
  totalPages: number;    // Número total de páginas
  pageSize: number;      // Cantidad de elementos por página
  baseUrl: string;       // La URL base a la que se agregan los parámetros de paginación
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  baseUrl,
}: PaginationProps) {
  
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      {/* Botón "Anterior" solo se muestra si la página actual es mayor que 1 */}
      {currentPage > 1 && (
        <Link
          to={`${baseUrl}?page=${currentPage - 1}&pageSize=${pageSize}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </Link>
      )}

      {/* Muestra el estado de la paginación */}
      <span>
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón "Siguiente" solo se muestra si la página actual es menor que el total de páginas */}
      {currentPage < totalPages && (
        <Link
          to={`${baseUrl}?page=${currentPage + 1}&pageSize=${pageSize}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Siguiente
        </Link>
      )}
    </div>
  );
}
