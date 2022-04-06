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
  setGroupInfo = data => this.groupInfo = data;
  clearGroupInfo = _ => this.groupInfo = initialGroupInfo;

  // API
  addGroup ({name, onSuccess, onError}) {
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
          onSuccess?.(res?.data)
        })
        .catch((err) => {
          console.log('err', err)
          onError?.(err)
        })
  }
  editGroup ({id, name, onSuccess, onError}) {
    if (!name || !id) {
      return console.error('name and id is required')
    }
    const data  = {id, name};
    const setGroupInfo = this.setGroupInfo;

    const [req] = api.put({
      url: `/group`,
      data,
    });

    req
        .then( (res) => {
          setGroupInfo(res.data)
          onSuccess?.(res.data)
        })
        .catch((err) => onError?.(err))
  }
  deleteGroup ({id}) {
    if (!id) {
      return console.error('id is required')
    }
    const data  = {id};
    const getAllGroups = this.getAllGroups;

    const [req] = api.delete({
      url: `/group`,
      config: {data},
    });

    req
        .then( (res) => {
          getAllGroups()
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
          setAllGroups(res.data)
        })
        .catch((err) => {
          console.error('err', err)
          clearAllGroups()
        })
  }
  getGroupById ({id, onSuccess, onError}) {
    if (!id) {
      return console.error('id is required')
    }
    const params = {id};
    const setGroupInfo = this.setGroupInfo,
        clearGroupInfo = this.clearGroupInfo;

    const [req] = api.get({
      url: `/group`,
      config: {params},
    });

    req
        .then( (res) => {
          setGroupInfo(res.data)
          onSuccess?.(res.data)
        })
        .catch((err) => {
          console.error('err', err);
          clearGroupInfo()
          onError?.(err)
        })
  }
}

export default new Group();