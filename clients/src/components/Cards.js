import React from "react";
import card from "../styles/card.css";
import chat from "../images/chat.png";
import form from "../images/form.png";
import match from "../images/match.png";
import connection from "../images/connection.png";

const Cards = () => {
  return (
    <div>
    <div className="main-cards">
      {/* Background for the main card container */}

      <div className="card-body">
        <div className="card-features">
          <div className="card-title">All About PinkWaters</div>
          <div className="card-subtitle">Explore the feeling of peace</div>
        </div>

        <div className="card-frame">
          {/* First card */}
          <div className="card-box">
            <div className="card-item">
              <img src={form} alt="Image 1" width="80px" height="80px" />
              <h2>Fill up your details</h2>
              <p>
                This form allows them to communicate their concerns and what
                they like or dislike, creating a platform for open dialogue.
              </p>
            </div>
          </div>
          {/* Second card */}
          <div className="card-box">
            <div className="card-item">
              <img src={match} alt="Image 2" width="80px" height="80px" />
              <h2>We will find you a match</h2>
              <p>
                We match you based on your profile and mood. A personalized
                approach to connecting people based on their characteristics and
                emotions.
              </p>
            </div>
          </div>
          {/* Third card */}
          <div className="card-box">
            <div className="card-item">
              <img src={chat} alt="Image 3" width="80px" height="80px" />
              <h2>Connect</h2>
              <p>
                Establishing connections with individuals who are considered the
                most compatible or ideal matches.
              </p>
            </div>
          </div>
        </div>
        <div className="bottomFrame">
          <button type="button" className="butn">
            Get Started!
          </button>
        </div>
      </div>
    </div>
    <div className="img_divider">
    <img
      src={connection} // Replace with your image source
      alt="Divider Image"
      width = "1440px"
      height = "398px"
    />
  </div>
  </div>
    

  );
};

export default Cards;
