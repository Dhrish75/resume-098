import React from "react";
import { Link } from "react-router-dom"; // Import Link

class Card extends React.Component {
    render() { 
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="text-center">
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>QUICK.EASY.FREE</h1>
                    <Link to="/Details"> {/* Use Link to navigate */}
                        <button type="button" className="btn btn-outline-secondary" style={{ fontSize: "1.2rem", marginTop: "30px" }}>
                            Create your resume now
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}
 
export default Card;

