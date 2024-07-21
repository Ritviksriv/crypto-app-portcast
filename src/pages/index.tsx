import React from "react";
import CryptoCurrencyTable from "../components/crypto-table";

const HomePage: React.FC = () => {
  return (
    <div className="layout">
      <h2>Cryptocurrency Prices</h2>
      <CryptoCurrencyTable />
    </div>
  );
};

export default HomePage;
