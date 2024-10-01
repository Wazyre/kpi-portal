import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";


const Main = () => {
    const navigate = useNavigate();

    const handleNavigate = (e, link) => {
        e.preventDefault();

        if(link === "add") navigate('/addkpi');
        else navigate('approvekpi');
    };

    return (
        <ListGroup>
            <ListGroup.Item action onClick={e => handleNavigate(e, "add")}>
                Add New KPI
            </ListGroup.Item>
            <ListGroup.Item action onClick={e => handleNavigate(e, "approve")}>
                Approve New KPI
            </ListGroup.Item>
        </ListGroup>
    );
};

export default Main;