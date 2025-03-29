import axios from 'axios';
import { User } from '~/interfaces/userInterface';

const API_URL = 'http://localhost:5177/api/user';

const getUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUserById = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`);
        if(!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const getUserByEmail = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/email/${email}`);
        if(!response.ok) {
            return null;
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
}

const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(!response.ok) {
            throw new Error('Error');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

const updateUser = async (id: number, user: User) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

// Método para obtener usuarios paginados
const getPagedUsers = async (page: number, pageSize: number) => {
    try {
        const response = await fetch(`${API_URL}/paged?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error('Error fetching paged users');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching paged users:', error);
        throw error;
    }
};


export default {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser,
    getPagedUsers
};