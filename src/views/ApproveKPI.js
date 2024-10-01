import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'

import '../styles/mainStyle.css'

// Component responsible for approving new KPIs through
// a form. Uploads to Caspio database.
// All communication with Caspio is done through REST
// calls. Please review Caspio Account for access details.

const CASPIO_LINK = process.env.REACT_APP_CASPIO_LINK;
const CASPIO_ID = process.env.REACT_APP_CASPIO_ID;
const CASPIO_SECRET = process.env.REACT_APP_CASPIO_SECRET;

const ApproveKPI = () => {
    const [token, setToken] = useState(0);
    const [formData, setFormData] = useState("");

    const [approve, setApprove] = useState(false);
    const [comment, setComment] = useState("");

    const location = useLocation();

    // Updates KPI in Caspio database with approval status and comments
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Main/records?response=rows&q.where=id%3D' + location.state.id, {
            method: 'PUT',
            body: `{
        "approve_status": "${approve}",
        "comment": "${comment}"
      }`,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        })
            .then((res) => {
                res.json()
            }
            )
            .then((data) => {
                if (data) console.log('here');
            })
            .catch((err) => {
                console.log(err.message);
            })
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

    // Fetches new KPI chosen in ChooseKPI.js
    useEffect(() => {
        fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Main/records?q.where=id%3D' + location.state.id, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'applicaiton/json' }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.Result) {
                    setFormData(data.Result[0]);
                }
            });
    }, [token, location.state.id]);

    if(formData) {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control disabled type="text" value={formData.name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pillar</Form.Label>
                        <Form.Control disabled type="text" value={formData.obj_id} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dependency</Form.Label>
                        <Form.Control disabled type="text" value={formData.dependency_id === null ? "" : formData.dependency_id} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Department</Form.Label>
                        <Form.Control disabled type="text" value={formData.department} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Team</Form.Label>
                        <Form.Control disabled type="text" value={formData.team} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Level</Form.Label>
                        <Form.Control disabled type="text" value={formData.level} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Frequency per Year</Form.Label>
                        <Form.Control disabled type="text" value={formData.freqpyear} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Formula</Form.Label>
                        <Form.Control disabled type="text" value={formData.formula} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data Source</Form.Label>
                        <Form.Control disabled type="text" value={formData.data_source} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Result Provider</Form.Label>
                        <Form.Control disabled type="text" value={formData.result_provider} />
                    </Form.Group>
                    
                        <Form.Check
                            type="checkbox"
                            label="Approve Status"
                            value={approve}
                            onClick={e => setApprove(e.target.checked)}
                        />
                    
                    <Form.Group>
                        <Form.Label>Comments</Form.Label>
                        <Form.Control required type="textarea" value={comment} onChange={e => setComment(e.target.value)} />
                    </Form.Group>
                </Form>
                <Button className="submitBtn" type='submit' onClick={handleSubmit}>Submit</Button>
            </>
        );
    }
    else return (<></>)
    
}

export default ApproveKPI;
