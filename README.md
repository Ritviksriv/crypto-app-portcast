# Cryptocurrency Tracker

This project is a cryptocurrency tracker built with Next.js, TypeScript, and Ant Design. It fetches real-time cryptocurrency data from the CoinCap API and displays it in a table with pagination, sorting, and a favorites feature. Each cryptocurrency links to a details page with more information.

## Features

- Real-time cryptocurrency prices
- Pagination
- Sorting by symbol or name
- Favorite toggle for each cryptocurrency
- Persistent favorites using local storage
- Details page for each cryptocurrency having a status for the info which can be refreshed, similar to the table component where the data is fetched every 10 seconds, in this case it will show "Outdated" after 10 seconds.

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone <repository_url>
   cd my-crypto-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

### Running the Application

1. **Start the development server:**

   ```sh
   npm run dev
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

### API Routes

- **Fetch all cryptocurrencies:**

  ```
  GET /api/cryptocurrencies
  ```

- **Fetch cryptocurrency details by ID:**

  ```
  GET /api/cryptocurrency/[id]
  ```

### Pages

- **Home Page (`/`):**
  Displays a table of all cryptocurrencies with real-time data.

- **Details Page (`/details/[id]`):**
  Displays detailed information about a specific cryptocurrency.

### Components

- **CryptoCurrencyTable.tsx:**
  Renders the table with cryptocurrency data, including sorting and favorites functionality.

- **CryptoCurrencyDetails.tsx:**
  Renders detailed information about a specific cryptocurrency.

## Testing

### Running Tests

To run tests, use the following command:

```sh
npm test
```
