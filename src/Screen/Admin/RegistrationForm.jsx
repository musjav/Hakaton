import React from 'react'
import SideNav from '../../Components/SideNav'
import DynamicForm from '../../Components/DynamicRegFrom'
import { useParams } from "react-router-dom";
import ManagerSideNav from '../../Components/ManagrSideNav';
const Students = () => {
    const { type } = useParams(); // students, teachers, users, etc.
    console.log(type);
    const usertype = localStorage.getItem("role"); // ✅ get role from localStorage

    return (
        <>
            {usertype === "branchmanagerdashboard" ?<ManagerSideNav /> : usertype === "user"? <></> : <SideNav />}

            <DynamicForm role={type} />
        </>
    )
}

export default Students
