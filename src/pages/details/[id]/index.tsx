import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import CryptoCurrencyDetails from '@/components/crypto-details';
import { Cryptocurrency } from '../../../types';

interface DetailsPageProps {
    crypto: Cryptocurrency;
    lastUpdated: Date
}

const DetailsPage: React.FC<DetailsPageProps> = ({ crypto, lastUpdated }) => {
    return (
        <div>
            <CryptoCurrencyDetails crypto={crypto} lastUpdated={lastUpdated} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const result = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
    return {
        props: {
            crypto: result.data.data,
            lastUpdated: result.data.timestamp,
        },
    };
};

export default DetailsPage;
