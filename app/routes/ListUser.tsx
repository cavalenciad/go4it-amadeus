
import userService from "../services/userService"; // Importa el servicio
import { User } from "../interfaces/userInterface"; // Importa la interfaz

import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";



// se trae la información
export const loader: LoaderFunction = async () => {

    const user = await userService.getUsers();
    return json(user);

}

export default function ListUser() {

    const {user} = useLoaderData<{ user: User[]}>();



    return (
        <div>
            <h1>Lista de usuarios</h1>
        </div>
    );


}



