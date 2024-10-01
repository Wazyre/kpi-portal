import { Outlet } from "react-router-dom";
import '../styles/mainStyle.css'

const ApproveMain = () => {
    return (
        <>
            <h2>Approve KPI Menu</h2>
            <h5>Choose a following KPI to approve:</h5>
            <Outlet/>
        </>
    );
};

export default ApproveMain;