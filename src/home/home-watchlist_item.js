import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3/coins'

const moneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})
const percentFormat = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

const HomeWatchlistItem = ({ item }) => {
    const [coin, setCoin] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`${COINGECKO_API_BASE_URL}/${item.coinID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCoin(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [item.coinID]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    let textColorClass;
    if (coin.market_data.price_change_percentage_24h > 0) {
        textColorClass = 'text-success';
    } else if (coin.market_data.price_change_percentage_24h < 0) {
        textColorClass = 'text-danger';
    } else {
        textColorClass = 'text-secondary';
    }

    return (
        <tr>
            <th scope="row">
                <Link to={`/detail?coinID=${item.coinID}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <img className="float-start pe-1 pt-1" height={24} src={coin.image.large} alt="" />
                    {coin.symbol.toUpperCase()}
                </Link>
            </th>
            <td className={`text-center ${textColorClass}`}>
                {coin.market_data.price_change_percentage_24h > 0 ? '+' : ''}
                {percentFormat.format(coin.market_data.price_change_percentage_24h / 100)}
            </td>
            <td className="text-center">
            {moneyFormat.format(coin.market_data.current_price.usd)}
            </td>
        </tr>
    );
};

export default HomeWatchlistItem