import { useState } from "react"
const AuthModal =({setShowModal, isSignUp}) => {
    const [email, setEmail] = useState(null)
    const[ password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(email, password, confirmPassword)
    const handleClick =() =>{
        setShowModal(false)
    }
    const handleSubmit = (e) =>{
    
        e.preventDefault()
        try{
            if(isSignUp && (password !=confirmPassword)){
                setError("passwords do not match")
            }
            console.log('make a post req to database')
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <div className="auth-modal">
            <div className= "close-icon" onClick={handleClick}>X</div>
            <h2>{isSignUp?'CREATE ACCOUNT':'LOG IN'}</h2>
            <p>  By clicking "Log In," you accept the terms and conditions displayed on this website.</p>
            <form onSubmit="{handleSubmit}">
                <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required = {true}
                onChange ={(e) => setEmail(e.target.value)}
                />
                 <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required = {true}
                onChange ={(e) => setPassword(e.target.value)}
                />
                 {isSignUp && <input
                type="password-check"
                id="password-check"
                name="password-check"
                placeholder="confirm-password"
                required = {true}
                onChange ={(e) => setConfirmPassword(e.target.value)}
                />}
                
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            AUTH MODAL
        </div>
    )    
    
    
}


export default AuthModal