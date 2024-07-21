import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CryptoCurrencyTable from "@/components/crypto-table";
import axios from "axios";

jest.mock("axios");

const mockData = {
  data: {
    data: [
      {
        id: "bitcoin",
        rank: "1",
        symbol: "BTC",
        name: "Bitcoin",
        supply: "17193925.0000000000000000",
        maxSupply: "21000000.0000000000000000",
        marketCapUsd: "119150835874.4699281625807300",
        volumeUsd24Hr: "2927959461.1750323310959460",
        priceUsd: "6931.5058555666618359",
        changePercent24Hr: "0.4012300632925680",
        vwap24Hr: "7175.0663247679233209",
      },
    ],
  },
};

test("renders table headers", async () => {
  axios.get.mockResolvedValueOnce(mockData);

  render(<CryptoCurrencyTable />);

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  expect(screen.getByText(/Symbol/i)).toBeInTheDocument();
  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
  expect(screen.getByText(/Market Cap/i)).toBeInTheDocument();
});

test("renders cryptocurrency data correctly", async () => {
  axios.get.mockResolvedValueOnce(mockData);

  render(<CryptoCurrencyTable />);

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
  expect(screen.getByText(/BTC/i)).toBeInTheDocument();
  expect(screen.getByText(/6931.51/i)).toBeInTheDocument();
  expect(screen.getByText(/119150835874.47/i)).toBeInTheDocument();
});
