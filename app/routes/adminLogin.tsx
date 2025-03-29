import { ActionFunction, json, redirect } from '@remix-run/node';
import { commitSession, getSession } from '~/services/sesionService';
import authService from '~/services/AdminFormsService';
import AdminForm from '~/components/AdminForm';
import { useActionData } from '@remix-run/react';

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return json(
        { success: false, 
          error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }
    
    const response = await authService.loginAdmin({ email, password });
    const session = await getSession(request.headers.get('Cookie'));
    // Store both token and expiration
    session.set('adminToken', response.token);
    session.set('tokenExpiration', response.expiration);
    
    console.log('Token:', response.token);
    console.log('Expiration:', response.expiration);


    // Redirect to ReportAdmin after successful login
    return redirect('/ReportAdmin', {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión'
      },
      { status: 401 }
    );
  }
};

export default function AdminLogin() {
  const actionData = useActionData<{ success: boolean; error?: string }>();
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-144px)]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Acceso Administrativo
        </h2>
        {actionData?.error && (
          <div className="mb-4 p-3 text-red-500 bg-red-100 rounded-md">
            {actionData.error}
          </div>
        )}
        <AdminForm />
      </div>
    </div>
  );
}