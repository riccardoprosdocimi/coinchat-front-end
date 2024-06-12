const DOMAIN_ADDRESS = process.env.REACT_APP_BASE_URL;

export const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3/coins';
export const COINGECKO_SEARCH_API = "https://api.coingecko.com/api/v3/search?query=";
export const COINGECKO_TRENDING_API = "https://api.coingecko.com/api/v3/search/trending";

export const Search_API = `${DOMAIN_ADDRESS}/search/coinSearch?query=`;
export const CoinData_API = `${DOMAIN_ADDRESS}/detail/getCoinData?coinID=`;
export const CoinMarketChartAPI = `${DOMAIN_ADDRESS}/detail/getCoinMarketChart?coinID=`;
export const Comment_API = `${DOMAIN_ADDRESS}/api/comment`;
export const User_API = `${DOMAIN_ADDRESS}/api/users`;
export const Blog_API = `${DOMAIN_ADDRESS}/api/blog`;