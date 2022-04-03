import logo from './logo.svg';
import './App.css';
import GroupListComponent from './components/GroupListComponent'
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import GroupPageComponent from "./components/GroupPageComponent";
import NewGroupComponent from "./components/NewGroupComponent";

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">My Service</span>
                </div>
                <div className="container-fluid">
                    <Link className="nav-link" to="/new-group">Add Group</Link>
                </div>

            </nav>
            <Routes>
                <Route path="/" element={<GroupListComponent/>}/>
                <Route path="/new-group" element={<NewGroupComponent/>}/>
                <Route path="/edit-group/:groupId" element={<NewGroupComponent/>}/>
                <Route path="/group/:groupId" element={<GroupPageComponent/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
