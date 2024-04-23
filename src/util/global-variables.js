const Domain_address = process.env.REACT_APP_BASE_URL;

export const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3/coins'
export const coinGeckoSearch_API = "https://api.coingecko.com/api/v3/search?query="

export const Search_API = `${Domain_address}/search/coinSearch?query=`;
export const CoinData_API = `${Domain_address}/detail/getCoinData?coinID=`;
export const CoinMarketChartAPI = `${Domain_address}/detail/getCoinMarketChart?coinID=`;
export const Comment_API = `${Domain_address}/api/comment`;
export const User_API = `${Domain_address}/api/users`
export const Blog_API = `${Domain_address}/api/blog`
