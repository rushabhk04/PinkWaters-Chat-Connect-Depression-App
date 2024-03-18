import logoWithWhite from '../images/logoWithWhite.png';
import care from '../images/care.png';

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      
        <h2 className="title-container">
          <img src={care} alt="Icon" className="icon" />
          <span className="text-dark-blue">Pink</span>
          <span className="text-pink">Waters</span>
        </h2>
        <ul className="nav-list">
          <li className="nav-item">
            {!authToken && (
              <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
              >
                Log in
              </button>
            )}
          </li>
        </ul>
     
    </nav>
  );
};

export default Nav;
