import axios from 'axios';

const API_BASE_URL = 'https://backend-2m8bdmbti-edustadler.vercel.app/api';

const authController = {
    getCrudData: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching CRUD data:', error);
            throw new Error('Failed to fetch data from the backend');
        }
    },
    deleteData: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw new Error('Failed to delete data');
        }
    },
    createData: async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/`, data);
            return response;
        } catch (error) {
            console.error('Error creating data:', error);
            throw new Error('Failed to create data');
        }
    },
    updateData: async (id, data) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw new Error('Failed to update data');
        }

    },
};

export default authController;
