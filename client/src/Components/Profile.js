import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

function Profile({ user }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div onClick={handleShow}> Profile</div>
            {user && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="outer-circle circle circle-1">
                        <span className="sq sq-1"></span>
                        <span className="inner-circle circle">
                            <img src={user?.pic} alt={user?.name} />
                        </span>
                        <span class="sq sq-2"></span>
                    </div>
                    <div>
                        {user?.email}
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}

export default Profile