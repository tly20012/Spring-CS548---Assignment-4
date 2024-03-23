import { useState, useEffect } from 'react';
import axios from 'axios';

const useStoreData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://localhost:8080/store-check', {
                    storeCheck: true
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
};

export default useStoreData;
