import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";


const EIT = () => {
    const navigate = useNavigate();
    const [eits, setEits] = useState([]);
    const user_id = window.sessionStorage.getItem("user_id")

    useEffect(() => {
        if (!window.sessionStorage.getItem("auth")) navigate('/unauthorized')
        fetch(process.env.REACT_APP_API_URL_BASE + '/users/' + user_id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setEits(data.eits)
        })
        .catch(error => console.error(error));
    }, []);

  return (
    <div>
        <h1>Employee Improvement Tracking</h1>
        <table className='eit-table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Accession</th>
                    <th>Reviewed?</th>

                </tr>
            </thead>
            <tbody>{
                    eits.map(eits => {
                    return(
                        <tr key={eits.eit_id}>
                            <td>{eits.created_date}</td>
                            <td>{eits.category_name}</td>
                            <td>{eits.subcategory_name}</td>
                            <td>{eits.comment}</td>
                            <td>{eits.accessions}</td>
                            <td>{eits.review_status===0?"Yes":"No"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default EIT