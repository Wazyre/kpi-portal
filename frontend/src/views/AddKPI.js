import { useState, useEffect } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';

// Component responsible for adding new KPIs through
// a form. Uploads to Caspio database.
// All communication with Caspio is done through REST 
// calls. Please review Caspio Account for access details.

const CASPIO_LINK = process.env.REACT_APP_CASPIO_LINK;

const AddKPI = () => {
  const [token, setToken] = useState(0);
  const [dependOptions, setDependOptions] = useState([]);

  const [name, setName] = useState("");
  const [objId, setObjId] = useState(1);
  const [dependencyId, setDependencyId] = useState(null);
  const [department, setDepartment] = useState("");
  const [team, setTeam] = useState("");
  const [level, setLevel] = useState(1);
  const [freqpyear, setFreqpyear] = useState(1);
  const [formula, setFormula] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [resultProvider, setResultProvider] = useState("");

  const dataToSelectOptions = (data) =>{
    const options = data.map(value => {
      return (
        <option key={value.id} value={value.id}>{value.id}</option>
      );
    });

    setDependOptions(options);
  };

  // Populates and submits row to Caspio KPI_Main table
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const year = new Date().getFullYear();

    fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Main/records?response=rows', {
      method: 'POST',
      body: `{
        "name": "${name}",
        "obj_id": ${objId},
        "dependency_id": ${dependencyId},
        "department": "${department}",
        "team": "${team}",
        "level": ${level},
        "freqpyear": ${freqpyear},
        "formula": "${formula}",
        "data_source": "${dataSource}",
        "result_provider": "${resultProvider}",
        "year": ${year}
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
      if (data) console.log();
    })
    .catch((err) => {
      console.log(err.message);
    })
  };


  // Fetches access token from Caspio
  useEffect(() => {
    fetch(CASPIO_LINK + 'oauth/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=a2fd89ad266d44155aacc97f651f0d011d4b9406d8d2f16bcb& client_secret=31d60501c58b4d2c8ca28dda729a8cd633e34444c88fc26ac7',
      headers: { 'Content-type': 'application/json' }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.access_token);
      setToken(data.access_token);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);

  // Fetches and populates dependency_id and obj_id form selects
  useEffect(() => {
    fetch(CASPIO_LINK + 'rest/v2/tables/KPI_Main/records?q.select=id', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'applicaiton/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Result) {
          dataToSelectOptions(data.Result);
        } 
      });
  }, [token]);

  if(dependOptions) {

  
    return (
      <>
      <Form>
        <Form.Group className="formGroup">
          <Form.Label>Name</Form.Label>
            <Form.Control required type="text" value={name} onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Pillar</Form.Label>
          <Form.Select required value={objId} onChange={e => setObjId(parseInt(e.target.value))}>
            <option value={1}>1</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Dependency</Form.Label>
          <Form.Select value={""} onChange={e => setDependencyId(parseInt(e.target.value))}>
            <option key={"none"} value={null}>None</option> 
            {dependOptions}
          </Form.Select>
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Department</Form.Label>
            <Form.Control required type="text" value={department} onChange={e => setDepartment(e.target.value)} />
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Team</Form.Label>
            <Form.Control required type="text" value={team} onChange={e => setTeam(e.target.value)} />
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Level</Form.Label>
            <Form.Select required value={level} onChange={e => setLevel(parseInt(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Frequency per Year</Form.Label>
            <Form.Select required value={freqpyear} onChange={e => setFreqpyear(parseInt(e.target.value))}>
            <option value={1}>Annually</option>
            <option value={2}>Biannually</option>
            <option value={4}>Quarterly</option>
            <option value={6}>Bimonthly</option>
            <option value={12}>Monthly</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Formula</Form.Label>
            <Form.Control required type="text" value={formula} onChange={e => setFormula(e.target.value)} />
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Data Source</Form.Label>
            <Form.Control required type="text" value={dataSource} onChange={e => setDataSource(e.target.value)} />
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label>Result Provider</Form.Label>
            <Form.Control required type="text" value={resultProvider} onChange={e => setResultProvider(e.target.value)} />
        </Form.Group>
      </Form>
      <Button className="submitBtn" type='submit' onClick={handleSubmit}>Submit</Button>
      </>
    );
  }
  else{
    return;
  }
}

export default AddKPI;
