import React, { useState } from 'react'
import { Image, ListGroup, Offcanvas } from 'react-bootstrap'
import axios from 'axios'

function SlidingSidebar({ show, handleClose, user }) {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()





    const handleSearch = async (e) => {
        setLoading(true)
        setSearch(e.target.value)
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`/api/users?search=${e.target.value}`, config)
        setSearchResults(data)
        setLoading(false)
    }


    return (
        <Offcanvas style={{ display: "block" }} show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Contacts</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                {searchResults.length > 0 && searchResults.map((data, index) => {
                    return <ListGroup key={index}>
                        <ListGroup.Item style={{ minWidth: "fitContent" }} className="listItemz">
                            <div className='d-flex justify-content-between '>
                                <div><h6>{data?.name}</h6></div>
                                <div> <Image src={data.pic} name={data.name} roundedCircle width="20" /></div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                })}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default SlidingSidebar