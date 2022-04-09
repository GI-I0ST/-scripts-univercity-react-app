import {Link} from "react-router-dom";
import {useState} from "react";
import Modal from "../Modal";
import NewGroupComponent from "../AddNewGroup";

const Navigation = () => {
  const [groupModalOpened, setGroupModalOpened] = useState(false);

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setGroupModalOpened(!groupModalOpened)
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Groups</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="nav-link" onClick={handleModalOpen}>Add Group</div>
              </li>
            </ul>
          </div>
          {
            groupModalOpened && <Modal onClose={handleModalOpen}>
              <NewGroupComponent onClose={handleModalOpen}/>
            </Modal>
          }
        </div>
      </nav>
  )
}

export default Navigation