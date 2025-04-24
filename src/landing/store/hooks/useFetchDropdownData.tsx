import { useState } from 'react';
import { REACT_APP_PRODUCTS_SERVICE } from '@env';
import { useFetchData } from '../../../hooks/useFetchData';

export const useFetchDropdownData = () => {
    const { fetchData } = useFetchData();
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDropdownData = async () => {
        setLoading(true);
        try {
            const [categoriesResponse, brandsResponse] = await Promise.all([
                fetchData(REACT_APP_PRODUCTS_SERVICE, '/categories'),
                fetchData(REACT_APP_PRODUCTS_SERVICE, '/brands'),
            ]);

            setCategories(categoriesResponse);
            setBrands(brandsResponse);
        } catch (err) {
            setError('Error fetching dropdown data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchDropdownData,
        categories,
        brands,
        // sizes,
        loading,
        error,
    };
};
