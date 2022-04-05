import React from "react";
import {Route, Routes} from 'react-router-dom';
import GroupListComponent from "../components/GroupList/GroupListComponent";
import NewGroupComponent from "../components/NewGroupComponent";
import GroupPageComponent from "../components/GroupPageComponent";

const MainRouter = (
      <Routes>
        <Route path="/" element={<GroupListComponent/>}/>
        <Route path="/new-group" element={<NewGroupComponent/>}/>
        <Route path="/edit-group/:groupId" element={<NewGroupComponent/>}/>
        <Route path="/group/:groupId" element={<GroupPageComponent/>}/>
      </Routes>
)
export default MainRouter