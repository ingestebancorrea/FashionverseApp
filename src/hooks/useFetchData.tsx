import { useState } from 'react';
import createApiInstance from '../api/apiInstance';

export const useFetchData = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (baseUrl: string, urlComplement: string) => {
    try {
      const api = createApiInstance(baseUrl);
      const response = await api.get(urlComplement);

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
    data,
  };
};
