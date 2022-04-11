import React from "react";
import {Route, Routes} from 'react-router-dom';
import GroupListComponent from "../components/GroupList/GroupListComponent";
import NewGroupComponent from "../components/AddNewGroup";
import GroupPageComponent from "../components/GroupPage";
import AlbumPage from "../components/AlbumPage";
import AlbumsPage from "../components/AlbumsPage";
import SongsPage from "../components/SongsPage";

const MainRouter = (
      <Routes>
        <Route path="/" element={<GroupListComponent/>}/>
        <Route path="/new-group" element={<NewGroupComponent/>}/>
        <Route path="/group/:groupId" element={<GroupPageComponent/>}/>
        <Route path="/album/:albumId" element={<AlbumPage/>}/>
        <Route path="/albums" element={<AlbumsPage/>}/>
        <Route path="/songs" element={<SongsPage/>}/>
      </Routes>
)
export default MainRouter