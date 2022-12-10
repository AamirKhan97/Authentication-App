import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/users/users.action";
import { USERS_FEATURE_KEY } from "../../redux/users/users.reducer";
// import { Pagination } from "antd";
import ReactPaginate from "react-paginate";

let Home = () => {
  let [userId, setUserId] = useState(useParams().id);

  const [clientPerPage, setClientPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [clientSearch, setClientSearch] = useState("");

  let allUsersInfo = useSelector((state) => {
    return state[USERS_FEATURE_KEY];
  });

  let { allUsers, loading } = allUsersInfo;

  let navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // // editUser
  // let editUser = (userId) => {

  // }

  // deleteUser
  let deleteOneUser = (userId) => {
    // console.log(userId)
    dispatch(deleteUser(userId));
  };

  // Page Number selection handler
  const changePage = ({ selected }) => {
    console.log(selected);
    setPageNumber(selected);
  };

  // State for Client Data
  const [clientList, setClientList] = useState([]);

  const pageCount = Math.ceil(clientList.length / clientPerPage);

  // New Pagination Logic
  const pagesVisited = pageNumber * clientPerPage;

  let calculatedNumberForPageData = pagesVisited + parseInt(clientPerPage);

  // Page Size Handle
  const pageSizeHandler = (e) => {
    // console.log(`Page ${e.target.value}`);
    setClientPerPage(e.target.value);
  };

  // Search for User
  const handleSearch = (e) => {
    setClientSearch(e.target.value.toLowerCase());
  };

  // Display Searched Data
  const displaySearch = allUsers
    .filter((user) => user.name?.toLowerCase().includes(clientSearch))
    .map((user, index) => {
      return (
        <tr key={user._id}>
          <td>{user._id.slice("0", "5")}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <img src={user.avatar} height="40" width="40" alt="" />
          </td>
          <td>{user.password}</td>
          <td>{user.contact}</td>
          <td>{user.created}</td>
          <td>
            <div className="d-flex justify-content-between">
              <Link
                className="btn btn-success btn-sm"
                to={`/edituser/${user._id}`}
              >
                Edit
              </Link>
              <Link
                className="btn btn-danger btn-sm"
                onClick={deleteOneUser.bind(this, user._id)}
              >
                Delete
              </Link>
            </div>
          </td>
        </tr>
      );
    });

  // Display Sliced Data
  const displayClients = allUsers
    ?.slice(pagesVisited, calculatedNumberForPageData)
    .map((user, index) => {
      return (
        <tr key={user._id}>
          <td>{user._id.slice("0", "5")}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <img src={user.avatar} height="40" width="40" alt="" />
          </td>
          <td>{user.password}</td>
          <td>{user.contact}</td>
          <td>{user.created}</td>
          <td>
            <div className="d-flex justify-content-between">
              <Link
                className="btn btn-success btn-sm"
                to={`/edituser/${user._id}`}
              >
                Edit
              </Link>
              <Link
                className="btn btn-danger btn-sm"
                onClick={deleteOneUser.bind(this, user._id)}
              >
                Delete
              </Link>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <>
      <div>
        <div className="wrapper animated zoomIn delay-2s">
          <div className="container my-3">
            <h1 className=" animated slideInUp text-success">
              Wellcome to Athentication App
            </h1>
            <label className="lead  animated slideInUp">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              maiores eveniet repellat et quasi rerum doloribus quaerat facilis
              consequuntur, molestiae perferendis qui at sapiente repudiandae
              eum maxime! Quas, quaerat soluta.
            </label>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <div className="role-table-header reponsivesrc d-flex justify-content-between">
          <div className="col-md-6">
            <div className="search-input-wrapper">
              <input
                type="text"
                className="form-control position-relative"
                placeholder="Search"
                onChange={handleSearch}
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvfvU8D6WpN9KCe_qKPMmwC63tQS2JJiwBzLqEUWsYw&s"
                alt=""
                className="searcgImg"
              />
            </div>
          </div>
          <div className="entries-wrapper d-flex ">
            <div className="mx-1">
              <p>Entries per page</p>
            </div>
            <div className="mx-1">
              <select
                class="form-control select-drop-icon remove-border p-1"
                aria-label="Default select example"
                onChange={(e) => pageSizeHandler(e)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <table className="table table table-hover table-light table-striped text-center position-relative mb-2">
            <thead className="bg-light text-black table-bordered fw-bold ">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>email</th>
                <th>Avatar</th>
                <th>password</th>
                <th>contact</th>
                <th>createdAt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  {/* <BeatLoader color="#1890ff" className="spinner" /> */}{" "}
                  "Loding"
                </tr>
              ) : clientSearch === "" ? (
                displayClients.length > 0 ? (
                  displayClients
                ) : (
                  <div className="positionng">No Record Found</div>
                )
              ) : displaySearch.length > 0 ? (
                displaySearch
              ) : (
                <div className="positionng">No Record Found</div>
              )}
            </tbody>
          </table>
        </div>
      <div className="my-2">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        </div>
      </div>
        
    </>
  );
};

export default Home;
