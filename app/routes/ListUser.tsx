
import userService from "../services/userService"; // Importa el servicio
import { User } from "../interfaces/userInterface"; // Importa la interfaz

import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";



// se trae la información
export const loader: LoaderFunction = async () => {

    const usersData = await userService.getUsers();
    const users = usersData.map((user:any) => ({
        id: user.id,
        Full_name: user.full_name,
        Email: user.email,
    }));
    return json({ users }); // Asegúrate de que users se retorne aquí

}

export default function listUser() {

    const {users} = useLoaderData<{ users: User[]}>();
    console.log(users);
    console.log(users[0].Full_name);
    console.log(users[0].Email);
    console.log(users[0].id);

    return (
        <div>
            <h1>Lista de usuarios</h1>
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
                                <td>{user.Full_name}</td>
                                <td>{user.Email}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
        </div>
    );
}



