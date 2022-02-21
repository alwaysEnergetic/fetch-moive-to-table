import React, { useState } from "react";
import Pagination from "../Pagination";
import "../../styles.css";

const Table = ({ props }) => {
  const movies = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  // Gets current page array
  const indexOfLastPage = currentPage * entriesPerPage;
  const indexOfFirstPage = indexOfLastPage - entriesPerPage;
  const currentEntries = movies.slice(indexOfFirstPage, indexOfLastPage);

  // Changes page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const tryRequire = (path) => {
    try {
      return require(`../../images/${path}.jpg`);
    } catch (err) {
      return require(`../../images/default.jpg`);
    }
  };

  if (!movies.length > 0) {
    return (
      <>
        <h2>Movie Results:</h2>
        <h2>No Results Found.</h2>
      </>
    );
  } else {
    return (
      <>
        <h2> Movie Results:</h2>
        <table>
          <tbody>
            <tr className="title-row">
              <td>Title</td>
              <td>Image</td>
            </tr>
            {currentEntries.map((movie, index) => {
              return (
                <tr key={index}>
                  <td>{movie.title}</td>
                  <td>
                    <img src={tryRequire(`${movie.id}`)} alt={props.title} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          entriesPerPage={entriesPerPage}
          totalEntries={movies.length}
          paginate={paginate}
        />
      </>
    );
  }
};

export default Table;
