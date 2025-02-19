import React, { useState, useRef, useEffect } from 'react';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './profile.css';
import './AI.css';

const API_KEY = "AIzaSyCe9smmAGv2voZfx4VZImoxiqGwBE2rF-U";

const AI = () => {
    const [input, setInput] = useState("");
    const textRef = useRef();
    const [userDetails, setUserDetails] = useState(null);
    const [toggle, setToggle] = useState(0);
    const [chatHistory, setChatHistory] = useState([]);
    const genAI = new GoogleGenerativeAI(API_KEY);

    const change = () => {
        setToggle(prev => (prev === 0 ? 1 : 0));
    };

    const fetchdata = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const name = await getDoc(docRef);
                if (name.exists()) {
                    setUserDetails(name.data());
                } else {
                    toast.success("User Not Exists", { position: "top-center" });
                    window.location.href = "/log_in";
                }
            }
        });
    };

    useEffect(() => {
        fetchdata();
        const timeout = setTimeout(() => {
            if (!userDetails) {
                toast.error("Session expired or user not found", { position: "top-center" });
                window.location.href = "/";
            }
        }, 3000);
        return () => clearTimeout(timeout);
    }, [userDetails]);

    const logout = async () => {
        try {
            await auth.signOut();
            toast.success("Logout Successfully", { position: "top-center" });
            window.location.href = "/log_in";
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    const search = async () => {
        try {
            if (!input.trim()) return;
            console.log("User Input:", input);
            if (textRef.current) {
                let div1 = document.createElement("div");  
                div1.classList.add("left", "insert");  
                div1.innerHTML = input;  
                textRef.current.appendChild(div1);  
            }
            setInput("");
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const chatSession = model.startChat({
                history: chatHistory.map(msg => ({
                    role: msg.type === "user" ? "user" : "model",
                    parts: [{ text: msg.text }]
                })),
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 100
                }
            });
            const result = await chatSession.sendMessage(input);
            const output = result.response.candidates[0]?.content?.parts[0]?.text || "No response generated";
            console.log("AI Response:", output);
            if (textRef.current) {
                let div2 = document.createElement("div");  
                div2.classList.add("right", "insert");  
                div2.innerHTML = output;  
                textRef.current.appendChild(div2);  
            }
            setChatHistory(prevHistory => [
                ...prevHistory,
                { type: "user", text: input },
                { type: "model", text: output }
            ]);
        } catch (error) {
            console.error("AI Error:", error.message);
            toast.error("AI Error: " + error.message, { position: "top-center" });
        }
    };

    return (
        <div className='AI_Box'>
            <div className="profile_ai">
                <img onClick={change} src="./image/user2.png" alt="" />
                <div style={{ display: toggle === 0 ? "none" : "block" }} className='show'>
                    {userDetails ? (
                        <div className="profile">
                            <h2>Information of User</h2>
                            <hr/>
                            <p>Email: {userDetails.email}</p>
                            <p>First Name: {userDetails.firstName}</p>
                            <p>Last Name: {userDetails.lastName}</p>
                            <button className="log_btn" onClick={logout}>Logout</button>
                        </div>
                    ) : <p className="load">Loading...</p>}
                </div>
            </div>
            <div className="que">
                <div ref={textRef} className="text"></div>
                <div className="ask">
                    <input
                        value={input}
                        type="text"
                        placeholder="What you learn from me"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <img onClick={search} src="./image/export.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default AI;