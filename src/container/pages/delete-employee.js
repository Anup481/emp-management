import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Digital } from "react-activity";

import '../themes/App.css';

export default function UpdateEmployee() {
    const idRef = useRef(null);
    
    const [id, setId] = useState(null);
    const [idErr, setIdErr] = useState('');
    const [toastMsg, setToastMsg] = useState('')

    const [loading, setLoading]= useState(false);
    const [toast, setToast] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');

    // useEffect(() => {
    //     if (id.length > 0)  {
    //         setIdErr('');
    //     }
    // }, [id]);

    function _Id(e) {
        setId(e.target.value);
        if (e.target.value != '') {
            _getData(e.target.value);
        }
    }

    function _onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let valid = _validate();

        if (valid) {
            _deleteEmp();
        }
    }

    async function _getData(id) {
        if (id != null && id != undefined)
        try {
            await axios.get(
                `https://6572e5e6192318b7db4139ea.mockapi.io/api/v1/emp/${id}`
            )
            .then((res) => {
                if (res.status == 200) {
                    setFname(res.data.fname);
                    setLname(res.data.lname);
                    setCity(res.data.city);
                    setSalary(res.data.salary);
                    setShowForm(true);
                } else {
                    setToastMsg('Data does not exist');
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000)
                }
            })
        } catch (err) {
            console.log('ttry ', err)
        }
    }

    async function _deleteEmp() {
        try {
            await axios.delete(
                `https://6572e5e6192318b7db4139ea.mockapi.io/api/v1/emp/${id}`
            )
            .then((res) => {
                setToastMsg('Employee Deleted successfully!');
                setLoading(false);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000)
            })
        } catch (err) {
            console.log('ttry ', err)
        }
    }

    // validate all the inputs
    function _validate() {
        if (id == '') {
            idRef.current.focus();
            setIdErr('Id cannot be empty');
            return false;
        }

        return true;
    }

    return(
        (loading == true) ?
            <div className='body'>

                {/* activity loader */}
                <Digital size={50}/>
            </div>
        :
            <>
                <form onSubmit={_onSubmit} className="body row">
                <h2>Delete Employee</h2>
                <p>
                    <label>Id :</label>
                    <input value={id == null ? '' : id}
                        type="text"
                        ref={idRef}
                        onChange={evt => _Id(evt)}></input>
                </p>
                {
                    (showForm == true) &&
                    <div>
                        <p>
                            <label>First Name : {fname}</label>
                        </p>
                        <p>
                            <label>Last Name : {lname}</label>
                        </p>
                        <p>
                            <label>Employee City : {city}</label>
                        </p>
                        <p>
                            <label>Employee Salary : {salary}</label>
                        </p>
                        <button className="button">
                            Delete
                        </button>
                    </div>
                }
                </form>
                {
                    (toast) &&
                        <div className='my-toast'>
                            <span className='my-toast__icon'>i</span>
                            <span>{toast}</span>
                        </div>
                }
            </>
      )
}