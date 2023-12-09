import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Digital } from "react-activity";

import '../themes/App.css';

export default function AddEmployee() {
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const cityRef = useRef(null);
    const salaryRef = useRef(null);

    const [loading, setLoading]= useState(false);
    const [toast, setToast] = useState(false);

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

    function _onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let valid = _validate();

        if (valid) {
            _addEmp();
        }
    }

    function _addEmp() {
        try {
            axios.post('https://6572e5e6192318b7db4139ea.mockapi.io/api/v1/emp', {
                fname: fname,
                lname: lname,
                city: city,
                salary: salary
            }, { 'content-type': 'application/json' })
            .then(function (response) {
                setLoading(false);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000)
            })
            .catch(function (error) {
                console.log(error);
            });
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
                <form  onSubmit={_onSubmit} className="body">
                <h2>Please Enter Employee Details...</h2>
                <p>
                    <label>First Name :</label>
                    <input value={fname}
                        type="text"
                        ref={fnameRef}
                        onChange={evt => _fname(evt)}></input>
                </p>
                <label>{fnameErr}</label>
                <p>
                    <label>Last Name : </label>
                    <input value={lname}
                        type="text"
                        ref={lnameRef}
                        onChange={evt => _lname(evt)}></input>
                </p>
                <label>{lnameErr}</label>
                <p>
                    <label>Employee City : </label>
                    <input value={city}
                        type="text"
                        ref={cityRef}
                        onChange={evt => _city(evt)}></input>
                </p>
                <label>{cityErr}</label>
                <p>
                    <label>Employee Salary : </label>
                    <input value={salary}
                        type="text"
                        ref={salaryRef}
                        onChange={evt => _salary(evt)}></input>
                </p>
                <label>{salaryErr}</label>
                <button className="button">
                    Submit
                </button>
                </form>
                {
                    (toast) &&
                        <div className='my-toast'>
                            <span className='my-toast__icon'>i</span>
                            <span>This is a simple toast</span>
                        </div>
                }
            </>
      )
}