import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";


const UserProfile = () => {
    const navigate = useNavigate();
    const [userColumns, setUserColumns] = useState([]);
    const [record, setRecord] = useState([]);
    const [employeeColumns, setEmployeeColumns] = useState([]);
    const [employee, setEmployee] = useState([]);
    const user_id = window.sessionStorage.getItem("user_id")
    const employee_id = window.sessionStorage.getItem("employee_id")

    useEffect(() => {
        if (!window.sessionStorage.getItem("auth")) navigate('/unauthorized')
        fetch(process.env.REACT_APP_API_URL_BASE + '/users/' + user_id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserColumns(Object.keys(data.user))
            setRecord(data.user)
            setEmployeeColumns(Object.keys(data.employee))
            setEmployee(data.employee)
        })
        .catch(error => console.error(error));
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        window.sessionStorage.removeItem("auth")
        window.sessionStorage.removeItem("user_id")
        window.sessionStorage.removeItem("token")
        navigate('/login')
    }

    const eitFeed = (e) => {
        e.preventDefault();
        navigate(('/eit'))
    }

  return (
    <div>
        <br />
        <div className="page shadow">
            <div className="main-container shadow">
                <MDBContainer>
                <br />
                    <MDBRow>
                        <MDBCol>
                            <div className="container">
                            <img
                                alt={record.first_name}
                                style={{ width: "20%", borderRadius: "48%" }}
                            />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div class="container">
                                <h3>{record.first_name} {record.last_name}</h3>
                            </div>

                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <table className='user-table'>
                            <thead>
                                <tr>
                                    <th key="1">USER ID</th>
                                    <th key="2">EMAIL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    <tr key={record.user_id}>
                                        <td>{record.user_id}</td>
                                        <td>{record.email}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </MDBRow>
                    <br />
                </MDBContainer>
            </div>
        </div>

         <br />
        <h2>Employee Info</h2>
        <table className='employee-table'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Job Title</th>
                </tr>
            </thead>
            <tbody>{
                    <tr key={employee.user_id}>
                        <td>{employee.employee_id}</td>
                        <td>{employee.dept_number}</td>
                        <td>{employee.user_role}</td>
                    </tr>
                }
            </tbody>
        </table>
        <button className="login-button" onClick={eitFeed}>EIT Feed</button>
        <button className="login-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserProfile