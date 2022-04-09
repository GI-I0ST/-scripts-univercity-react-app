import React from "react";
import {Route, Routes} from 'react-router-dom';
import GroupListComponent from "../components/GroupList/GroupListComponent";
import NewGroupComponent from "../components/AddNewGroup";
import GroupPageComponent from "../components/GroupPage";
import AlbumPage from "../components/AlbumPage";

const MainRouter = (
      <Routes>
        <Route path="/" element={<GroupListComponent/>}/>
        <Route path="/new-group" element={<NewGroupComponent/>}/>
        {/*<Route path="/edit-group/:groupId" element={<NewGroupComponent/>}/>*/}
        <Route path="/group/:groupId" element={<GroupPageComponent/>}/>
        <Route path="/album/:albumId" element={<AlbumPage/>}/>
      </Routes>
)
export default MainRouter