import { Link, useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { getSession } from '~/services/sesionService';
import { City } from '~/interfaces/cityInterface';

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get('Cookie'));
    const recommendedCities = session.get('recommendedCities') || [];

    const citiesObj = JSON.parse(recommendedCities);
    // Transformamos el objeto en un arreglo de valores
    const cities = Object.values(citiesObj);


    return json({ cities });
};

export default function Result() {
    const { cities } = useLoaderData<{ cities: City[] }>();

    if (!cities || cities.length === 0) {
        return (
            <div className="min-h-screen bg-blue-200 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center text-red-600 mb-6">No se encontraron destinos</h1>
                    <p className="text-gray-700 text-center mb-8">
                        Lo sentimos, no pudimos encontrar destinos que coincidan con tus preferencias.
                    </p>
                    <div className="flex justify-center">
                        <Link 
                            to="/question" 
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Volver al cuestionario
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-200 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Tus destinos recomendados</h1>
                
                <div className="flex flex-wrap gap-6 justify-evenly">
                    {cities.map((city) => (
                        <div key={city.id} className="bg-white rounded-xs">
                            <div className="h-48">
                                <img 
                                    src={city.image} 
                                    alt={city.cityName} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800">{city.cityName}</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    {city.country}
                                </p>
                                <p className="text-gray-700">
                                    Imperdible:
                                </p>
                                <p className="text-gray-800 text-lg mb-4">
                                    {city.unmissablePlace}
                                </p>
                                <a 
                                    href={`https://www.google.com/search?q=turismo+en+${city.cityName}+${city.country}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Más información
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <Link 
                        to="/question" 
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                    >
                        Volver al cuestionario
                    </Link>
                </div>
            </div>
        </div>
    );
}