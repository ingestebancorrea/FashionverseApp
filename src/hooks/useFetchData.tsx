import { useState } from 'react';
import authApi from '../api/authApi';

export const useFetchData = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (urlComplement: string) => {
    try {
      const response = await authApi.get(urlComplement);

      const formattedData = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));

      // Almacena los datos formateados en el estado
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if needed
    }
  };

  return {
    fetchData,
    data
  };
};
