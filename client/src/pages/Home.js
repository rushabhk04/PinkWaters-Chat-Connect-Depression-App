import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import Cards from "../components/Cards";

import peoplenobg from "../images/peoplenobg.png";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
     
      <Nav
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="inner-container">
        <div className="text-container how-it-works">
          <p className="how-it-works-text">Feeling alone?</p>
        </div>
        <div className="C_text">
          <div className="frame5">
            <div className="C_Feature-title">
              <p className="C_Feature-title-text">Your voice is heard, valued, and cherished!!</p>
            </div>
            <div className="C_paragraph">
              <div className="intro">
                <p className="C_paragraph-text">
                  Welcome to our revolutionary mental health app, where the
                  power of connection meets the strength of empathy. We've
                  created a safe and supportive space for individuals with
                  shared experiences to come together, connect, and find solace
                  in one another's stories. Your voice matters, and here, it's
                  heard, valued, and cherished.
                </p>
              </div>
            </div>
            <div className="button-container">
              <button className="primary-button" onClick={handleClick}>
                {authToken ? "Signout" : "Create Account"}
              </button>
            </div>
          </div>
          <div className="chart">
            <img src={peoplenobg} alt="Chart Image" />
          </div>
        </div>
      </div>
      <Cards/>
    </div>
  );
};

export default Home;
