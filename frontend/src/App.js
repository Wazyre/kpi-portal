import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddKPI from './views/AddKPI.js';
import ApproveKPI from './views/ApproveKPI.js';
import ApproveMain from './views/ApproveMain.js';
import Banner from './components/Banner.js';
import ChooseKPI from './views/ChooseKPI.js';
import Main from './views/Main.js';
import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Router>
            <Banner/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/addkpi" element={<AddKPI />} />
                <Route path="/approvekpi" element={<ApproveMain />} >
                    <Route index element={<ChooseKPI />} />
                    <Route path=":kpi" element={<ApproveKPI />} />
                </Route>
            </Routes>
        </Router>
        
    );
};

export default App;