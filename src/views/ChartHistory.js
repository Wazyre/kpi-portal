import { useState, useEffect } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js"
import { Line } from 'react-chartjs-2';
import { Col, Row } from "react-bootstrap";

const CASPIO_LINK = process.env.REACT_APP_CASPIO_LINK;
const CASPIO_ID = process.env.REACT_APP_CASPIO_ID;
const CASPIO_SECRET = process.env.REACT_APP_CASPIO_SECRET;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'History of Team Scores',
        },
    },
};

const chartData = {
    labels: ['Total Score'],
    datasets: [
        {
            label: 'Score',
            data: [],
            backgroundColor: '#36a2eb'
        }
    ]
};

const ChartHistory = (token, month = 3, year = 2024, teamName = '') => {
    //const [token, setToken] = useState("");
    const [resultData, setResultData] = useState([]);

    const organizeData = (data) => {
        
    }

    // Fetches recorded KPI results according to chosen parameters in ResultShowcase.js
    useEffect(() => {
        fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Result/records?q.where=year%3D' + year + '%20AND%20month%3D' + month + '%20AND%20teamName%3D' + teamName, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'applicaiton/json' }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.Result) {
                    setResultData(data.Result);
                    organizeData(data.Result);
                }
            });
    }, [token]);

    if (chartData.datasets[0].data.length === 0) return (<></>);

    else {
        return (
            <Row>
                <Col>
                    <Line options={options} data={chartData} />
                </Col>
                <Col>
                </Col>
            </Row>

        );
    }

};


export default ChartHistory;