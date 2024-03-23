import React from 'react';
import '../App.css';
import useStoreData from '../hooks/useStoreData';

const DataFetcher = () => {

    // Using custom hook
    const { data, loading } = useStoreData();

    return (
        <div className="data-fetcher-container">
            <h2 className="data-fetcher-heading">Data from Server:</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                data && (
                    <div>
                        {data.operatingStatus ? (
                            <>
                                <p className="data-fetcher-info">Operating Status: {data.operatingStatus}</p>
                                <p className="data-fetcher-info">Is Premium Store: {data.isPremiumStore ? 'Yes' : 'No'}</p>
                                <p className="data-fetcher-info">Is Delivery Store: {data.isDeliveryStore ? 'Yes' : 'No'}</p>
                            </>
                        ) : (
                            <p className="data-fetcher-info">Timezone: {data.timezone}</p>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default DataFetcher;
