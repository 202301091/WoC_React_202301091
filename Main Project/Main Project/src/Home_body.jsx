import React from 'react'
import "./Home_body.css"
import { Link } from 'react-router-dom'
const Home_body = () => {
    return (
        <div className='home_body'>
            <div className="mode">
                <h4>Unlock Your Coding Skill</h4>
                <h5>Coderunner is a platform that makes coding and collaboration easy for developers. It offers simple tools and a user-friendly interface to help you code faster.</h5>
                <div >
                <Link className='No_deco' to="/ai"><button className="mode1">Explore as Guest</button></Link> <Link to="/sign_up"><button className="mode2">Sign Up For Free</button></Link>
                </div>
            </div>

            <hr />
            <div className="key">
                <h2>Key Features Our Website</h2>
                <div className="box">
                <Link className='No_deco' to="/ide"> <div  className="boxes">
                        <img src="image/terminal.png" alt="" />
                        <h4>Run Any Programming Language</h4>
                        <h5>You can execute your code 20+ coding language</h5>
                    </div></Link>
                    <div className="boxes">
                        <img src="image/file_bar.png" alt="" />
                        <h4>File_Bar</h4>
                        <h5>You can save your code in your own folder</h5>
                    </div>
                    <div className="boxes">
                        <img src="image/terminal.png" alt="" />
                        <h4>Terminal</h4>
                        <h5>Run the command and debug your code within the brower</h5>
                    </div>
                    <Link className='No_deco' to="/ai"><div className="boxes">
                        <img src="image/ai.png" alt="" />
                        <h4> Ai-chat Bot</h4>
                        <h5>You learn and resolve your coding doubt with Ai-powered assistant</h5>
                    </div></Link>
                </div>
            </div>
        </div>
    )
}

export default Home_body
