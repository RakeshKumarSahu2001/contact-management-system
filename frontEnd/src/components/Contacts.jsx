import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import CircleLoader from 'react-spinners/CircleLoader'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const mySwal = withReactContent(Swal)

  const deleteContact = (id) => {
    console.log(id)
    mySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8001/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            console.log(res.data)
            setContacts(res.data.contacts)
            mySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((err) => {
            console.log(err)
            mySwal.fire({
              title: "Error!",
              text: "Error Occured!!",
              icon: "error"
            });
          })

      }
    });
  }


  const columns = [
    {
      name: "Name",
      selector: (row) => row.name
    },
    {
      name: "Email",
      selector: (row) => row.email
    },
    {
      name: "Phone",
      selector: (row) => row.phone
    },
    {
      name: "Action",
      selector: (row) => <>
        <button><Link to={`/dashboard/edit-contact/${row._id}`}>Edit</Link></button>
        <button onClick={() => deleteContact(row._id)}>delete</button>
      </>
    }
  ]

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8001/contacts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if (res.data.success) {
          setLoading(false)
          setContacts(res.data.contacts)
        }
      })
      .catch((err) => {
        console.log("fatching contacts error :", err)
        setLoading(false)
      })

  }, [])


  return (
    <>
      {
        loading ?
          <CircleLoader
            loading={loading}
            size={40}
            aria-label='Loading-Spinner'
            data-testid='loader'
          /> : <div>
            <DataTable
              columns={columns}
              data={contacts} />
          </div>
      }
    </>
  )
}

export default Contacts