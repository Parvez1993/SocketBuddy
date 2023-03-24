import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'

function SlidingSidebar({ show, handleClose }) {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()




    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Contacts</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='d-flex'>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default SlidingSidebar