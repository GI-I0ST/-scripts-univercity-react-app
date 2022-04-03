import './App.css';
import GroupListComponent from './components/GroupListComponent'
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import GroupPageComponent from "./components/GroupPageComponent";
import NewGroupComponent from "./components/NewGroupComponent";

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Service</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/new-group">Add Group</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<GroupListComponent/>}/>
                    <Route path="/new-group" element={<NewGroupComponent/>}/>
                    <Route path="/edit-group/:groupId" element={<NewGroupComponent/>}/>
                    <Route path="/group/:groupId" element={<GroupPageComponent/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
