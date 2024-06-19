import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Connexion = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authError, setAuthError] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value)
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setAuthError('')

        let users = JSON.parse(localStorage.getItem('users'));

        if(users && users.find(user => user.email === email)) {
            let user = users.find(user => user.email === email);
            if(user && user.password === password) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/');
            } else {
                setAuthError('Email ou mot de passe incorrect');
            }
        } else {
            setAuthError('Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="container">
            <section className="row d-flex justify-content-center align-content-center pt-3">
                <section className="col-10 col-md-6 p-5 form-inscription">
                    <h1>Connexion</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="mt-3">
                            <label htmlFor="email" className="white h4">Email :</label>
                            {/* {emailError? <p className="errorForm">{emailError}</p> : ''} */}
                            <input type="text" id="email" className="form-control" aria-label="champ email" value={email} onChange={handleEmail}/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password" className="white h4">Mot de passe :</label>
                            <input type="text" id="password" className="form-control" aria-label="champ mot de passe" value={password} onChange={handlePassword}/>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button type="submit" className="btn btn-lg validBtn">Connexion</button>
                        </div>
                    </form>
                </section>
            </section>
          
        </div>
      );
}