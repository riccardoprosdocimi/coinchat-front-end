import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { CoinMCThunk } from "../services/detail-thunks";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChartArea = () => {
    const [searchParams] = useSearchParams();
    const { marketData, fetching, error } = useSelector((state) => state.coinMarketChart);
    const [coinPrice, setCoinPrice] = useState(null);
    const [coinGradient, setCoinGradient] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CoinMCThunk({ coinID: searchParams.get("coinID"), days: searchParams.get("days") }));
    }, [dispatch, searchParams]);

    useEffect(() => {
        if (marketData.prices.length > 0) {
            setCoinPrice(marketData.prices[marketData.prices.length - 1][1]);
            setCoinGradient(marketData.prices[marketData.prices.length - 1][1] / marketData.prices[0][1] - 1);
        }
    }, [marketData.prices]);

    const labels = marketData.prices.map(
        (price) => {
            const unixTimestamp = price[0];
            let t = new Date(unixTimestamp);
            return moment(t).format("YYYY-MM-DD HH:mm");
        }
    );

    const data = {
        labels,
        datasets: [
            {
                label: marketData.name,
                data: marketData.prices.map((price) => price[1]),
                borderColor: 'rgb(255, 214, 10)',
                backgroundColor: 'rgb(3, 49, 83)',
                fill: true
            }
        ],
    };

    const options = {
        responsive: true,
        elements: {
            point: {
                radius: 0,
                hoverRadius: 6,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: '#333',
                borderWidth: 1
            },
            line: {
                tension: 0.3,
                backgroundColor: 'rgba(3, 49, 83, 0.4)',
                borderColor: 'rgb(3, 49, 83)',
                borderWidth: 2
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                titleColor: '#333',
                bodyColor: '#333',
                titleAlign: 'center',
                bodyAlign: 'center',
                displayColors: false,
                padding: 10,
                callbacks: {
                    label: function (context) {
                        return 'Price: $' + context.parsed.y.toFixed(2);
                    },
                    title: function(context) {
                        return 'Date: ' + data.labels[context[0].dataIndex];
                    }
                }
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                display: true,
                beginAtZero: false,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value.toFixed(2);
                    },
                    color: '#333'
                }
            },
            x: {
                type: 'category',
                display: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                },
                ticks: {
                    rotation: 45,
                    color: '#333'
                },
            }
        }
    };

    const getRoundDigit = (num) => {
        let reverseNum = 1 / num;
        if (reverseNum < 0) {
            return 100;
        } else {
            reverseNum = Math.round(reverseNum);
            return 10 ** (reverseNum.toString().length + 2);
        }
    }

    const percentFormat = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const roundDigit = getRoundDigit(coinPrice);
    const roundDigit1 = getRoundDigit(coinGradient);
    const displayedCoinGradient = Math.round((coinGradient + Number.EPSILON) * roundDigit1) / roundDigit1;

    if (error) {
        return <h4>
            {error}<br />
            Probable cause: Maximum API calls reached, please wait a minute
        </h4>;
    }

    return (
        !error && fetching ?
        <h4>Loading...</h4> :
        <div className="d-flex flex-column mt-2">
            <div id={"timeRangeNavigation"} className={"d-flex mt-2"}>
                <h3 className={"fw-bold ms-5 d-none d-sm-block"}><i
                    className="fa-solid fa-dollar-sign"></i>{Math.round(
                    (coinPrice + Number.EPSILON) * roundDigit) / roundDigit}</h3>
                <h3 className={`ms-3 d-none d-sm-block ${displayedCoinGradient > 0 ?
                                                         'text-success' : ''
                                                                          || displayedCoinGradient
                                                                          < 0 ?
                                                                          'text-danger' : ''
                                                                                          || displayedCoinGradient
                                                                                          === 0 ?
                                                                                          'text-secondary'
                                                                                                : ''}`}>
                    {displayedCoinGradient > 0 ? '+' : ''}
                    {percentFormat.format(displayedCoinGradient)}
                </h3>
                <div id={"small-figures"} className={"d-flex flex-column d-block d-sm-none"}>
                    <h3 className={"fw-bold ms-3"}><i
                        className="fa-solid fa-dollar-sign"></i>{Math.round(
                        (coinPrice + Number.EPSILON) * roundDigit) / roundDigit}</h3>
                    <h3 className={`ms-3 ${displayedCoinGradient > 0 ?
                                           'text-success' : ''
                                                            || displayedCoinGradient < 0 ?
                                                            'text-danger' : ''
                                                                            || displayedCoinGradient
                                                                            === 0 ?
                                                                            'text-secondary'
                                                                                  : ''}`}>
                        {displayedCoinGradient > 0 ? '+' : ''}
                        {percentFormat.format(displayedCoinGradient)}
                    </h3>
                </div>
                <ul className="nav nav-pills ms-auto h-sm-100 h-50">
                    <Link
                        to={{
                            pathname: '.',
                            search: "coinID=" + searchParams.get("coinID") + "&days=1"
                        }}
                        className={`nav-link ${
                            searchParams.get("days") === null || searchParams.get("days") === '1'
                            ? 'active'
                            : ''
                        }`}
                    >
                        24h
                    </Link>
                    <Link
                        to={{
                            pathname: '.',
                            search: "coinID=" + searchParams.get("coinID") + "&days=7"
                        }}
                        className={`nav-link ${
                            searchParams.get("days") === '7'
                            ? 'active'
                            : ''
                        }`}
                    >
                        1W
                    </Link>
                    <Link
                        to={{
                            pathname: '.',
                            search: "coinID=" + searchParams.get("coinID") + "&days=30"
                        }}
                        className={`nav-link ${
                            searchParams.get("days") === '30'
                            ? 'active'
                            : ''
                        }`}
                    >
                        1M
                    </Link>
                </ul>
            </div>
            <div id="price_trend_chart" className={"mt-2 d-none d-md-block"}>
                <Line options={options} data={data}/>
            </div>
        </div>
    );
}

export default LineChartArea;