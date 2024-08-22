import axios from 'axios';

const API_KEY = '62e91a09b58230ab090098b5';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const getExchangeRates = async (baseCurrency) => {
    try {
        const response = await axios.get(`${BASE_URL}/latest/${baseCurrency}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des taux de change:', error);
        throw error;
    }
};
