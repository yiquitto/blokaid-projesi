import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold my-8">Welcome to Blokaid</h1>
            <p className="text-lg text-gray-600">
                Transparent and verifiable aid distribution, powered by Solana.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Placeholder for stats or info cards */}
            </div>
        </div>
    );
};

export default DashboardPage;