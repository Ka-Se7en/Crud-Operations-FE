import React from 'react';
import { doGet, doDelete } from '../services/axios-services';
import { Link } from 'react-router-dom';
import '../styles/home-style.css';

const fetchAllStudent = (setStudents, setError, setLoading) => {
  setLoading(true);
  setError(false);
  doGet('/getList')
    .then((response) => {
      setStudents(response.data);
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
};

const Home = () => {
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetchAllStudent(setStudents, setError, setLoading);
  }, []);

  const deleteStudent = async (id) => {
    const response = await doDelete(`/delete/${id}`);
    if (response) {
      fetchAllStudent(setStudents, setError, setLoading);
      alert('Delete Process Was Completed');

      return;
    }

    alert('Delete Process Was Uncompleted');
  };

  return (
    <div className="home-container">
      {loading && <div>Loading..</div>}
      {error && <div>There is one error!..</div>}
      <div className="student-list-container">
        {!loading &&
          !error &&
          students?.map((student) => (
            <div key={`${student.id}/${student.name}`}>
              <ul>
                <li className="student-list-name">
                  <Link to={`/details/${student.id}`}>
                    Name: {student.name}
                  </Link>
                </li>
                <li className="student-list-lastname">
                  Last Name: {student.lastName}
                </li>
                <li
                  onClick={() => deleteStudent(student.id)}
                  className="student-list-delete">
                  Delete
                </li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
