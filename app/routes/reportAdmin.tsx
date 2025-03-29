import { LoaderFunction, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/services/sesionService';
import userService from '~/services/userService';
import { IPagedResult } from '~/interfaces/IPagedResult';
import { User } from '~/interfaces/userInterface';
import { Pagination } from '~/components/Pagination';




interface LoaderData {
    isAuthenticated: boolean;
    expiration: string;
    pagedData: IPagedResult<User>;
  }

export const loader: LoaderFunction = async ({ request }) => {
    // Validar sesión y autenticación
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('adminToken');
    const expiration = session.get('tokenExpiration');
  
    if (!token || !expiration || new Date(expiration) < new Date()) {
      return redirect('/AdminLogin');
    }


    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    const pagedData: IPagedResult<User> = await userService.getPagedUsers(page, pageSize);
    

    const normalizedPagedData = {
        ...pagedData,
        items: pagedData.items.map((user: any) => ({
          id: user.id,
          full_name: user.full_name,  // Renombra full_name a Full_name
          email: user.email,          // Renombra email a Email
        })),
      };
    
    

    return json({
        isAuthenticated: true,
        expiration,
        pagedData: normalizedPagedData,
    
      });
  };

export default function ReportAdmin() {

    const { expiration, pagedData } = useLoaderData<{
        isAuthenticated: boolean;
        expiration: string;
        pagedData: {
          items: any[]; // usaremos any para transformar
          currentPage: number;
          totalPages: number;
          pageSize: number;
        };
      }>();

     

      const normalizedUsers = pagedData.items;

    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 mb-4">
                    Sesión válida hasta: {new Date(expiration).toLocaleString()}
                </p>
                {/* Add your report content here */}
            </div>
            <table className="min-w-full border-collapse border-2 border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th  className="py-2 px-4 border-2 border-blue-700">ID</th>
                        <th  className="py-2 px-4 border-2 border-blue-700">Nombre</th>
                        <th  className="py-2 px-4 border-2 border-blue-700">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {normalizedUsers.map((user) => (
                        <tr className="hover:bg-gray-200" key={user.id}>
                            <td className="py-2 px-4 border-2 border-blue-700 text-center ">{user.id}</td>
                            <td className="py-2 px-4 border-2 border-blue-700 text-center ">{user.full_name}</td>
                            <td className="py-2 px-4 border-2 border-blue-700 text-center ">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Componente de paginación reutilizable */}
            <Pagination 
                currentPage={pagedData.currentPage}
                totalPages={pagedData.totalPages}
                pageSize={pagedData.pageSize}
                baseUrl="/ReportAdmin" // Ajusta según la ruta actual
            />
    </div>
    );
}