import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Digital } from "react-activity";

import '../themes/App.css';

export default function UpdateEmployee() {
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const cityRef = useRef(null);
    const salaryRef = useRef(null);
    const idRef = useRef(null);
    
    const [id, setId] = useState(null);
    const [loading, setLoading]= useState(false);
    const [toast, setToast] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [fname, setFname] = useState('');
    const [fnameErr, setFnameErr] = useState('');

    const [lname, setLname] = useState('');
    const [lnameErr, setLnameErr] = useState('');

    const [city, setCity] = useState('');
    const [cityErr, setCityErr] = useState('');

    const [salary, setSalary] = useState('');
    const [salaryErr, setSalaryErr] = useState('');

    useEffect(() => {
        if (fnameErr.length > 0)  {
            setFnameErr('');
        }
    }, [fname]);

    useEffect(() => {
        if (lname.length > 0)  {
            setLnameErr('');
        }
    }, [lname]);

    useEffect(() => {
        if (city.length > 0)  {
            setCityErr('');
        }
    }, [city]);

    useEffect(() => {
        if (salary.length > 0)  {
            setSalaryErr('');
        }
    }, [salary]);

    function _fname(e) {
        setFname(e.target.value);
    }

    function _lname(e) {
        setLname(e.target.value);
    }

    function _city(e) {
        setCity(e.target.value);
    }

    function _salary(e) {
        setSalary(e.target.value);
    }

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
            _updateEmp();
        }
    }

    async function _getData(id) {
        if (id != null && id != undefined)
        try {
            await axios.get(
                `https://6572e5e6192318b7db4139ea.mockapi.io/api/v1/emp/${id}`
            )
            .then((res) => {
                setFname(res.data.fname);
                setLname(res.data.lname);
                setCity(res.data.city);
                setSalary(res.data.salary);
                setShowForm(true);
            })
        } catch (err) {
            console.log('ttry ', err)
        }
    }

    async function _updateEmp() {
        try {
            await axios.put(
                `https://6572e5e6192318b7db4139ea.mockapi.io/api/v1/emp/${id}` , {
                   fname: fname,
                   lname: lname,
                   city: city,
                   salary: salary
                }
            )
            .then((res) => {
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
        if (fname == '') {
            fnameRef.current.focus();
            setFnameErr('first name cannot be empty');
            return false;
        } else if (lname == '') {
            lnameRef.current.focus();
            setLnameErr('last name cannot be empty');
            return false;
        } else if (city == '') {
            cityRef.current.focus();
            setCityErr('city cannot be empty');
            return false;
        } else if (salary == '') {
            salaryRef.current.focus();
            setSalaryErr('salary cannot be empty');
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
                <h2>Update Employee Details...</h2>
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
                            <label>First Name : <input value={fname}
                                type="text"
                                ref={fnameRef}
                                onChange={evt => _fname(evt)}></input></label>
                        </p>
                        <label>{fnameErr}</label>
                        <p>
                            <label>Last Name : <input value={lname}
                                type="text"
                                ref={lnameRef}
                                onChange={evt => _lname(evt)}></input></label>
                        </p>
                        <label>{lnameErr}</label>
                        <p>
                            <label>Employee City : <input value={city}
                                type="text"
                                ref={cityRef}
                                onChange={evt => _city(evt)}></input></label>
                        </p>
                        <label>{cityErr}</label>
                        <p>
                            <label>Employee Salary : <input value={salary}
                                type="text"
                                ref={salaryRef}
                                onChange={evt => _salary(evt)}></input></label>
                        </p>
                        <label>{salaryErr}</label>
                        <button className="button">
                            Update
                        </button>
                    </div>
                }
                </form>
                {
                    (toast) &&
                        <div className='my-toast'>
                            <span className='my-toast__icon'>i</span>
                            <span>Employee Details updated Successfully!</span>
                        </div>
                }
            </>
      )
}