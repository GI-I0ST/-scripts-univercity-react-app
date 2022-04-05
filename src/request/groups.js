import {action, makeObservable, observable} from "mobx";
import api from "./apiInstance";

const initialGroupInfo = {
  id: null,
  data: {}
}

class Group {
  allGroups = [];
  groupInfo = initialGroupInfo;


  constructor() {
    makeObservable(this, {
      allGroups: observable,
      groupInfo: observable,
      setAllGroups: action,
      clearAllGroups: action,
      setGroupInfo: action,
      clearGroupInfo: action,
    })
    this.addGroup = this.addGroup.bind(this)
    this.editGroup = this.editGroup.bind(this)
    this.deleteGroup = this.deleteGroup.bind(this)
    this.getAllGroups = this.getAllGroups.bind(this)
    this.getGroupById = this.getGroupById.bind(this)
  }


  setAllGroups = data => this.allGroups = data;
  clearAllGroups = _ => this.allGroups = [];
  setGroupInfo = (id, data) => this.groupInfo = {id, data};
  clearGroupInfo = _ => this.groupInfo = initialGroupInfo;

  // API
  addGroup ({name}) {
    if (!name) {
      return console.error('name is required')
    }
    const data = {name};

    const [req] = api.post({
      url: `/group`,
      data,
    })

    req
        .then( (res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log('err', err)
        })
  }
  editGroup ({id, name}) {
    if (!name || !id) {
      return console.error('name and id is required')
    }
    const data  = {id, name};

    const [req] = api.put({
      url: `/group`,
      data,
    });

    req
        .then( (res) => {
          console.log(res)
        })
        .catch((err) => console.error('err', err))
  }
  deleteGroup ({id}) {
    if (!id) {
      return console.error('id is required')
    }
    const data  = {id};

    const [req] = api.delete({
      url: `/group`,
      data,
    });

    req
        .then( (res) => {
          console.log(res)
        })
        .catch((err) => console.error('err', err))
  }
  getAllGroups () {
    const [req] = api.get({
      url: `/group`,
    });

    const setAllGroups = this.setAllGroups,
        clearAllGroups = this.clearAllGroups;

    req
        .then( (res) => {
          console.log(res)
          setAllGroups(res.data)
        })
        .catch((err) => {
          console.error('err', err)
          clearAllGroups()
        })
  }
  getGroupById ({id}) {
    if (!id) {
      return console.error('id is required')
    }
    const data = {id};
    const setGroupInfo = this.setGroupInfo,
        clearGroupInfo = this.clearGroupInfo;

    const [req] = api.get({
      url: `/group`,
      data,
    });

    req
        .then( (res) => {
          console.log(res)
          setGroupInfo(id, res.data)
        })
        .catch((err) => {
          console.error('err', err);
          clearGroupInfo()
        })
  }
}

export default new Group();