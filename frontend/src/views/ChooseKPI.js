import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ApproveKPI from "./ApproveKPI";
import { ListGroup } from "react-bootstrap";

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

    const handleClick = (e, name, id) => {
        // console.log(e)
        e.preventDefault();
        navigate(`/approvekpi/${name}`, {state:{id: id}})
    };

    useEffect(() => {
        fetch('https://c3hch526.caspio.com/oauth/token', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=a2fd89ad266d44155aacc97f651f0d011d4b9406d8d2f16bcb& client_secret=31d60501c58b4d2c8ca28dda729a8cd633e34444c88fc26ac7',
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

    useEffect(() => {
        fetch('https://c3hch526.caspio.com/rest/v2/tables/KPI_Main/records?q.select=name%2C%20id&q.where=approve_status%3D0%20AND%20comment%3D\'\'', {
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