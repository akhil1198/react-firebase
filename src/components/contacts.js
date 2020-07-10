import React, { useState, useEffect } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Button, Table, ButtonGroup } from 'react-bootstrap'
import Contactform from './contactform'
import firebaseDb from '../firebase'


const Contacts = () => {

    var [currentID, setCurrentid] = useState('')

    var [contactObject, setContactobject] = useState({})

    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {                                //sets values on any changes on the firestore
            if (snapshot.val() != null) {
                setContactobject({                                                            //sets the details from the firestore in the contactobject
                    ...snapshot.val()
                })
            } else {
                setContactobject({
                    ...snapshot.val()
                })
            }
        })

    }, [])                                                

    const addOrEdit = obj => {                                                                //add or edit function sent as props to the contactform component 

        if (currentID === "")
            firebaseDb.child('contacts').push(                                                //pushes the values to the firestore
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentid('')                                                      
                    }
                }
            )
        else
            firebaseDb.child(`contacts/${currentID}`).set(                                    //updates the values for the selected id from the table in the firestore
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentid('')
                    }
                }
            )
    }

    const onDelete = (id) => {
        if(window.confirm("Are your sure?")){                                                 //creates an alert, on confirmation, removed
            firebaseDb.child(`contacts/${id}`).remove(                                        //removes the selected id from the firestore
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentid('')
                    }
                }
            )
        }
    }

    return (
        <div>
            <Jumbotron>
                <center>
                    <h1>Contacts Registration</h1>
                    <p>
                        This is a sample react+firebase project that shows the working CRUD functionalities with firebase.
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </center>
            </Jumbotron>

            <div className="row">
                <div className="col-md-5">
                    {/* sending the currentid and the contacts object that is being fetched from the firestore on any updates */}
                    <Contactform {...({ addOrEdit, currentID, contactObject })} />            
                </div>
                <div className="col-md-7">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr >
                                <th >Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // using object here because the state contactobject is defined as an object and then is mapped.
                                Object.keys(contactObject).map(id => {
                                    return (
                                        <tr key={id}>
                                            <td>{contactObject[id].name}</td>
                                            <td>{contactObject[id].email}</td>
                                            <td>{contactObject[id].mobile}</td>
                                            <td>
                                                <a className="btn btn-primary" style={{ margin: "5%" }} onClick={() => {
                                                    setCurrentid(id)                                                                //selecting the current id of the row
                                                }}>
                                                    Edit
                                                </a>
                                                <a className="btn btn-danger" onClick={() => {
                                                    onDelete(id)                                                                    //calling the onDelete function and sending id as parameter
                                                }}>
                                                    Delete
                                                </a>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Contacts