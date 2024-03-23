import React from 'react';
import '../App.css';
import useStoreData from '../hooks/useStoreData';

const DataFetcher = () => {
    const { data, loading } = useStoreData();

    return (
        <div>
            <h2>Data from Server:</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                data && (
                    <div>
                        <p>Operating Status: {data.operatingStatus}</p>
                        <p>Is Premium Store: {data.isPremiumStore ? 'Yes' : 'No'}</p>
                        <p>Is Delivery Store: {data.isDeliveryStore ? 'Yes' : 'No'}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default DataFetcher;
