import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

// Landing page, navigates to AddKPI.js and 
// ApproveMain.js

const Main = () => {
    const navigate = useNavigate();

    const handleNavigate = (e, link) => {
        e.preventDefault();

        if(link === "add") navigate('addkpi');
        else if(link === "approve") navigate('approvekpi');
        else navigate('chart');
    };

    return (
        <ListGroup>
            <ListGroup.Item action onClick={e => handleNavigate(e, "add")}>
                Add New KPI
            </ListGroup.Item>
            <ListGroup.Item action onClick={e => handleNavigate(e, "approve")}>
                Approve New KPI
            </ListGroup.Item>
            <ListGroup.Item action onClick={e => handleNavigate(e, "result")}>
                View Result KPI
            </ListGroup.Item>
        </ListGroup>
    );
};

export default Main;