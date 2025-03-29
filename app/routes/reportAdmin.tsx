import { LoaderFunction, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/services/sesionService';
import userService from '~/services/userService';



export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('adminToken');
    const expiration = session.get('tokenExpiration');

    if (!token || !expiration || new Date(expiration) < new Date()) {
        return redirect('/AdminLogin');
    }

    return json({ 
        isAuthenticated: true,
        expiration 
    });
};


// se trae la información
export const user: LoaderFunction = async () => {

    const usersData = await userService.getUsers();
    const users = usersData.map((user:any) => ({
        id: user.id,
        Full_name: user.full_name,
        Email: user.email,
    }));
    return json({ users }); // Asegúrate de que users se retorne aquí

}



export default function ReportAdmin() {

    const {users} = useLoaderData<{ users: any[]}>();


    const { expiration } = useLoaderData<{ isAuthenticated: boolean; expiration: string }>();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 mb-4">
                    Sesión válida hasta: {new Date(expiration).toLocaleString()}
                </p>
                {/* Add your report content here */}
            </div>
            <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>


                </table>
        </div>
    );
}