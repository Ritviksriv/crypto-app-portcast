import React, { useEffect, useState } from "react";
import { Cryptocurrency } from "../../types";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import moment from "moment";

interface CryptoCurrencyDetailsProps {
  crypto: Cryptocurrency;
  lastUpdated: Date;
}

const CryptoCurrencyDetails: React.FC<CryptoCurrencyDetailsProps> = ({
  crypto,
  lastUpdated,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const updateStatus = () => {
      const now = moment();
      const updateTime = moment(lastUpdated);
      const duration = moment.duration(now.diff(updateTime));
      if (duration.asSeconds() > 10) {
        setStatus("Outdated");
      } else {
        setStatus("Up to date");
      }
    };
    updateStatus();
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentTime]);
  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header-layout"]}>
          <ArrowLeftOutlined
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          />
          <h2>{crypto.name}</h2>
        </div>
        <div
          className={styles["header-layout"]}
          onClick={() => {
            router.reload();
          }}
        >
          <p>
            Status: <b>{status}</b>
          </p>
          <ReloadOutlined
            style={{
              cursor: "pointer",
              visibility: status === "Outdated" ? "visible" : "hidden",
            }}
          />
        </div>
      </div>
      <Row className={styles["content"]} gutter={[16, 16]}>
        <Col xs={24} sm={12} md={7}>
          <h4>Symbol</h4>
          <p>{crypto?.symbol ? crypto.symbol : "-"}</p>
        </Col>
        <Col xs={24} sm={12} md={7}>
          <h4>Price (USD)</h4>
          <p>
            {crypto?.priceUsd ? parseFloat(crypto.priceUsd).toFixed(2) : "-"}
          </p>
        </Col>
        <Col xs={24} sm={12} md={7}>
          <h4>Market Cap (USD)</h4>
          <p>
            {crypto?.marketCapUsd
              ? parseFloat(crypto.marketCapUsd).toFixed(2)
              : "-"}
          </p>
        </Col>
      </Row>
    </>
  );
};

export default CryptoCurrencyDetails;
