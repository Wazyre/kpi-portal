import { useState, useEffect } from 'react'; 
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Col, Row } from 'react-bootstrap';

const CASPIO_LINK = process.env.REACT_APP_CASPIO_LINK;
const CASPIO_ID = process.env.REACT_APP_CASPIO_ID;
const CASPIO_SECRET = process.env.REACT_APP_CASPIO_SECRET;

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
    labels: ['Failed Target', 'Met Target', 'Exceeded Target'],
    datasets: [
        {
            label: 'Num. of KPIs',
            data: [],
            backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0']
        }
    ]
};

const ChartResults = ({chosenIds = "(1,2,3)", month = 3, year = 2024, teamName = ""}) => {

    const [token, setToken] = useState("");
    const [resultData, setResultData] = useState([]);
    const [failed, setFailed] = useState(0.0);
    const [met, setMet] = useState(0.0);
    const [exceeded, setExceeded] = useState(0.0);
    const [total, setTotal] = useState(0.0);

    // Calculates and formats fetched results for chart display
    const calculateData = (fetchedData) => {
        console.log(fetchedData)
        let tmet = 0;
        let tfailed = 0;
        let texceeded = 0;
        let ttotal = 0.0;

        fetchedData.map(row => {
            let perc = 0.0;

            if(row.direction === "up") perc = (row.actual / row.target) * 100.0;
            else perc = (row.target / row.actual) * 100.0;
            
            if (perc > 100) texceeded += 1;
            else if (perc === 100) tmet += 1;
            else tfailed += 1;

            ttotal += (parseFloat(row.weight) / 100.0) * perc; // row.weight is string of percentage "2.00%"
        });

        setMet(tmet);
        setFailed(tfailed);
        setExceeded(texceeded);
        setTotal(ttotal.toFixed(2));

        // Order of array matters to match labels in chartData declaration
        chartData.datasets[0].data = [tfailed, tmet, texceeded];
    };

    // Fetches access token from Caspio
    useEffect(() => {
        fetch(CASPIO_LINK + 'oauth/token', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + CASPIO_ID + '&client_secret=' + CASPIO_SECRET,
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => res.json())
            .then((data) => {
                setToken(data.access_token);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // Fetches recorded KPI results according to chosen parameters in ResultShowcase.js
    useEffect(() => {
        fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Result/records?q.where=year%3D' + year + '%20AND%20month%3D' + month + '%20AND%20id%20IN%20' + chosenIds, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'applicaiton/json' }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.Result) {
                    setResultData(data.Result);
                    calculateData(data.Result);
                }
            });
    }, [token]);


    if(chartData.datasets[0].data.length === 0) return(<></>);
    
    else {
        return (
            <Row>
                <Col>
                    <Pie data={chartData} />
                </Col>
                <Col>
                    <h2>Dept/Team: {teamName}</h2>
                    <h2>Total Score: {total + '%'}</h2>
                    <h3>
                        <ul>
                            <li>Failed KPIs: {failed}</li>
                            <li>Met KPIs: {met}</li>
                            <li>Exceeded KPIs: {exceeded}</li>
                        </ul>
                    </h3>
                </Col>
            </Row>
            
        );
    }
    
};

export default ChartResults;