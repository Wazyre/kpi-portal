import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const CASPIO_LINK = process.env.REACT_APP_CASPIO_LINK;
const CASPIO_ID = process.env.REACT_APP_CASPIO_ID;
const CASPIO_SECRET = process.env.REACT_APP_CASPIO_SECRET;

// Component that lists all unapproved and uncommented new
// KPIs in Caspio database. Uploads to Caspio database.
// All communication with Caspio is done through REST
// calls. Please review Caspio Account for access details.

const ChooseKPI = () => {
    const [token, setToken] = useState("");
    const [formData, setFormData] = useState([]);

    const navigate = useNavigate();

    const createList = () => {
        return formData.map(value => {
            return (
                <ListGroup.Item action key={value.id} onClick={(e) => handleClick(e, value.name, value.id)}>
                    {value.name}
                </ListGroup.Item>
            )
        })
    };

    // Sends user to ApproveKPI.js with chosen KPI id
    const handleClick = (e, name, id) => {
        e.preventDefault();
        navigate(`${name}`, {state:{id: id}})
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

    // Fetches all new KPI without approval status or comments
    useEffect(() => {
        fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Main/records?q.select=name%2C%20id&q.where=approve_status%3D0%20AND%20comment%3D\'\'', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'applicaiton/json' }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.Result) {
                    setFormData(data.Result);
                }
            });
    }, [token]);

    if(formData) {
        return (
            <ListGroup>
                {createList()}
            </ListGroup>
        );
    }
    else return (<></>);
};

export default ChooseKPI;