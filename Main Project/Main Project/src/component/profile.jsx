import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import './profile.css'

function Profile() {
    const [userDetails, setUserDetails] = useState(null);


    const fetchdata = async () => {
        auth.onAuthStateChanged(async (user) => {
            const docref = doc(db, "Users", user.uid);

            const name = await getDoc(docref);
            if (name.exists()) {
                setUserDetails(name.data());
            } else {
                toast.success("User Not Exists", {
                    position: "top-center",
                });
                window.location.href = "/log_in";
            }
        });
    };

    useEffect(() => {
        fetchdata()

        const timeout = setTimeout(() => {
            if (!userDetails) {
                toast.error("Session expired or user not found", {
                    position: "top-center",
                });
                window.location.href = "/log_in";
            }
        }, 3000);
        return () => clearTimeout(timeout);
    }, [userDetails]);

    const logout = async function () {
        try {
            await auth.signOut();
            toast.success("Logout Successfully", {
                position: "top-center",
            });
            window.location.href = "/log_in";
        } catch (error) {
            toast.success( error.message, {
                position: "top-center",
            });
        }
    }

    return (
        <div>
            {userDetails ? (
                <div className="profile">
                    <div className="profile2">
                        <h2>Information of User</h2>
                        <hr />
                        <h3>Welcome {userDetails.firstName} {userDetails.lastName}</h3>
                        <div>
                            <p>Email: {userDetails.email}</p>
                            <p>First Name: {userDetails.firstName}</p>
                            <p>Last Name: {userDetails.lastName}</p>
                        </div>
                        <button className="log_btn" onClick={logout}>Logout</button>
                    </div>
                </div>) : (
                    <div className="loading">
                <p className="load">Loading...</p>
                
                </div>
            )}
        </div>
    )
}

export default Profile
