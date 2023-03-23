import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form, Image, ButtonGroup, Badge, Alert } from "react-bootstrap";
import "./Home.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Home() {

    const [register, setRegister] = useState(true)

    //hooks
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate()

    const postDetails = async (pics) => {
        setLoading(true);
        if (pics === undefined) {
            return toast.error("Please select an Image", {
                position: toast.POSITION.TOP_LEFT
            });
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {


            const reader = new FileReader();
            reader.readAsDataURL(pics);
            reader.onloadend = () => {
                setPreview(reader.result);
            };





            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chatapp");
            data.append("cloud_name", "dglhbqhkd");
            fetch("https://api.cloudinary.com/v1_1/dglhbqhkd/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json()).then((data) => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        } else {
            setLoading(false);
            return toast.error("Please select an Image", {
                position: toast.POSITION.TOP_LEFT
            });

        }
    };


    let submitFun = async () => {
        setLoading(true)
        if (register) {
            setLoading(true)
            if (password !== confirmPassword) {
                return toast.error("Password and Confirm Password Does not Match !", {
                    position: toast.POSITION.TOP_LEFT
                });
            }
            else if (!name || !password || !confirmPassword || !email) {
                return toast.error("Please Fill all the Fields", {
                    position: toast.POSITION.TOP_LEFT
                });
            }
            else {
                const config = {
                    headers: { "Content-Type": "application/json" },
                }

                const { data } = await axios.post("/api/users", { name, email, password, pic }, config)

                localStorage.setItem("userInfo", JSON.stringify(data))
                navigate("/chat")
                setLoading(false)
            }

        }
        else {
            const { data } = await axios.post("/api/users/login", { email, password })

            localStorage.setItem("userInfo", JSON.stringify(data))
            navigate("/chat")
            setLoading(false)
        }
    }


    return (
        <>
            {loading ? "Loading" : <div className='bg-dark d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
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
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Insane Guy" onChange={e => setName(e.target.value)} />
                                        <label for="floatingInput">Full Name</label>
                                    </div>}
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingInput" placeholder="*********" onChange={e => setPassword(e.target.value)} />
                                        <label for="floatingInput">Password</label>
                                    </div>
                                    {register && <div className="form-floating mb-3" onChange={e => setConfirmPassword(e.target.value)}>
                                        <input type="password" className="form-control" id="floatingInput" placeholder="*********" />
                                        <label for="floatingInput">Confirm Password</label>
                                    </div>}

                                    {register &&
                                        <Row className='justify-content-around'>
                                            <Col lg={6}>
                                                <label for="formFile" className="form-label text-white">Select Profile Pic</label>
                                                <input className="form-control" type="file" id="formFile" onChange={e => postDetails(e.target.files[0])} placeholder="select profile pic" />
                                            </Col>
                                            <Col lg={6} className="align-self-end">
                                                <img src={preview ? preview : "https://qph.cf2.quoracdn.net/main-qimg-54166a525ee4fb3097d260173688c157.webp"} className="rounded mx-auto d-block" alt="..." width={200} />
                                            </Col>
                                        </Row>

                                    }


                                </div>

                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Button type="button" className="btn btn-success my-4" onClick={submitFun}>Submit</Button>
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
            </div>}
            <ToastContainer />
        </>
    )
}

export default Home