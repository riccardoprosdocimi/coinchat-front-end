import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {removeWatchlistThunk} from "../services/watchlist-thunks";

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

const useCoinData = (coinID) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        fetch(`${COINGECKO_API_BASE_URL}/${coinID}`)
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
    }, [coinID]);

    return { coin, error, isLoaded };
};

const WatchlistTableItem = ({ item, allowedToRemove }) => {
    const dispatch = useDispatch();
    const { coin, error, isLoaded } = useCoinData(item.coinID);

    const removeWatchlistItem = (wid) => {
        dispatch(removeWatchlistThunk(wid));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    let priceChangeColorClass;
    if (coin.market_data.price_change_percentage_24h > 0) {
        priceChangeColorClass = 'text-success';
    } else if (coin.market_data.price_change_percentage_24h < 0) {
        priceChangeColorClass = 'text-danger';
    } else if (coin.percentChange === 0) {
        priceChangeColorClass = 'text-secondary';
    } else {
        priceChangeColorClass = '';
    }

    return (
        <tr>
            <th scope="row">
                <Link to={`/detail?coinID=${item.coinID}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <img className={'float-start pe-1 pt-1'} height={24} src={coin.image.large} alt="" />
                    {coin.symbol.toUpperCase()}
                </Link>
            </th>
            <td className={`text-center ${priceChangeColorClass}`}>
                {coin.market_data.price_change_percentage_24h > 0 ? '+' : ''}
                {percentFormat.format(coin.market_data.price_change_percentage_24h / 100)}
            </td>
            <td className={'text-center'}>
            {moneyFormat.format(coin.market_data.current_price.usd)}
            </td>
            {allowedToRemove && (
                <td className={'text-center'}>
                    <button className={'bi bi-x-lg'} onClick={() => removeWatchlistItem(item._id)}></button>
                </td>
            )}
        </tr>
    );
};

export default WatchlistTableItem