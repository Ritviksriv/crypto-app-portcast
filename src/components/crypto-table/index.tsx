import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Cryptocurrency } from "../../types";
import Link from "next/link";
import styles from "./index.module.css";

const CryptoCurrencyTable: React.FC = () => {
  const [data, setData] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get("https://api.coincap.io/v2/assets");
      setData(result.data.data);
      setLoading(false);
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const columns: ColumnsType<Cryptocurrency> = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text) => (text ? text : "-"),
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) =>
        text ? <Link href={`/details/${record.id}`}>{text}</Link> : "-",
      width: 200,
    },
    {
      title: "Price (USD)",
      dataIndex: "priceUsd",
      key: "priceUsd",
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
      width: 200,
    },
    {
      title: "Market Cap (USD)",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      render: (text) => (text ? parseFloat(text).toFixed(2) : "-"),
      width: 200,
    },
    {
      title: "Favorite",
      key: "favorite",
      render: (text, record) => (
        <Button onClick={() => handleFavorite(record.id)}>
          {favorites.includes(record.id) ? "Unfavorite" : "Favorite"}
        </Button>
      ),
      width: 180,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      className={styles["table-styles"]}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default CryptoCurrencyTable;
