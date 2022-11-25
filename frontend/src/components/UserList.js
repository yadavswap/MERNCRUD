import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { API_PATH } from '../config'
export default function UserList() {

  const [userData,SetUserData] = useState()

  const fetchUserData = async()=>{
    const response = await axios.get(`${API_PATH}/users`)


    console.log('response',response);

    // if no users are there please dont set values
    if(response.data.users.length > 0){
      SetUserData(response.data.users)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [userData])
  // edit

  const handleEdit = async(user)=>{
    const UserName = prompt("Enter your user name")
    const UserEmail = prompt("Enter your user email")
    if(!UserName || !UserName){
      alert("Please Enter Email and Name both")
    }else{
      const response = await axios.patch(`${API_PATH}/user/${user._id}`,{
        name:UserName,
        email:UserEmail
      })
      console.log(response)
    }
  }

  // delete
  const handleDelete = async(userId)=>{
 
   
      const response = await axios.delete(`${API_PATH}/user/${userId}`)
    
     
  }
  return (
    <div>
         <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {userData && userData.map((user)=> (

             
              <tr>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <button className="hover:text-green-500" onClick={()=>handleEdit(user)}>Edit</button>
                </td>
                <td className="px-4 py-3 text-lg text-gray-900">
                  <button className="hover:text-red-500" onClick={()=>handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </div>
  )
}
