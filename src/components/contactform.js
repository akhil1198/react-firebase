import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'



const Contactform = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    const initialFieldValues = {
        name: name,
        mobile: mobile,
        email: email
    }

    const [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        console.log(values)
        if (props.currentID === "") {
            console.log(values)
            setValues({
                ...initialFieldValues
            })
        } else {
            setValues({
                ...props.contactObject[props.currentID]                 //sets the values from the table to the text fields on selecting the edit option
            })
            console.log(values)
        }
    }, [props.currentID, props.contactObject])                          //checks if there is any change is found in state then the call back function is called


    const handleChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const onSubmit = e => {
        console.log(values)
        props.addOrEdit(values)                                         //call the addOrEdit function by accessing it from props and sending the values as parameter to the addOrEdit function
    }

    return (
        <div >
            <Form autoComplete="off">

                <Form.Group controlId="formBasic">
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" name="name" value={values.name}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Email" value={values.email}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" name="mobile" placeholder="Phone" value={values.mobile}
                            onChange={handleChange} />
                    </Form.Group>
                </Form.Group>

                <center>
                    <Button variant="primary" onClick={onSubmit}>
                        {/* conditionally renders Submit and Update based on the props */}
                        {props.currentID === "" ? "Submit" : "Update"}                                                  
                    </Button>
                </center>
            </Form>
        </div>
    )
}

export default Contactform