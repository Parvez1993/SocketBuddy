import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form, Image, ButtonGroup, Badge } from "react-bootstrap";
import "./Home.css"
function Home() {

    const [register, setRegister] = useState(true)

    //hooks
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");


    const postDetails=(pics)=>{

    }


    return (
        <div className='bg-dark d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div className='container'>
                <Row className="landing">
                    <Col><Image src="./img/signup.jpg" thumbnail style={{ border: "none" }} /> </Col>
                    <Col>
                        <div className='my-5'>
                            <Badge bg="dark" style={{ fontSize: "30px", margin: "10px 0" }}>
                                {register ? "Register" : "Login"} Now
                            </Badge>
                            <div>
                                {register && <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Insane Guy" onChange={e=>setName(e.target.value)}/>
                                    <label for="floatingInput">Full Name</label>
                                </div>}
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e=>setEmail(e.target.value)}/>
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput" placeholder="*********" onChange={e=>setPassword(e.target.value)}/>
                                    <label for="floatingInput">Password</label>
                                </div>
                                {register && <div className="form-floating mb-3" onChange={e=>setConfirmPassword(e.target.value)}>
                                    <input type="password" className="form-control" id="floatingInput" placeholder="*********" />
                                    <label for="floatingInput">Confirm Password</label>
                                </div>}
                                {register && <div>
                                    <label for="formFile" className="form-label text-white">Select Profile Pic</label>
                                    <input className="form-control" type="file" id="formFile" onChange={e=>postDetails(e.target.files[0])} placeholder="select profile pic"/>
                                </div>}

                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <Button type="button" className="btn btn-success my-4">Submit</Button>
                            </div>
                            <ButtonGroup style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button variant="danger" onClick={() => {
                                    setRegister(false)
                                    setName(null);
                                    setConfirmPassword(null)
                                    setPassword(null);
                                    setEmail(null);
                                    setPic(null)
                                }
                                }>Login</Button>
                                <Button variant="warning" onClick={() => {
                                    setRegister(true); setName(null);
                                    setConfirmPassword(null)
                                    setPassword(null);
                                    setEmail(null);
                                    setPic(null)
                                }}>Register</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home