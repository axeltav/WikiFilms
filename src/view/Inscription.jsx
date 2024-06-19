import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
export const Inscription = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userNameError, setUserNameError] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value)
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    };

    const handleUserName = (event) => {
        setUserName(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPasswordError('');
        setEmailError('');
        setUserNameError('');

        let isValid = true;

        if(password && password.length < 5){
            setPasswordError('Le mot de passe doit faire au moins 5 caractères')
            isValid = false;
        }

        if (!validateEmail(email)) {
            setEmailError("Le mail renseigné n'est pas dans le bon format, exemple : exemple@gmail.com")
            isValid = false;
        }

        if (!userName){
            setUserNameError('Veuillez renseigner un nom d\'utilisateur')
            isValid = false;
        }

        let users = JSON.parse(localStorage.getItem('users'));

        if (users.find(user => user.userName === userName)) {
            setUserNameError('Ce nom d\'utilisateur est déjà utilisé')
            isValid = false;
        }

        if(users.find(user => user.email === email)) {
            setEmailError('Ce mail est déjà utilisé')
            isValid = false;
        }

        if(isValid === true) {
            if(localStorage.getItem('users')) {
                users.push({userName: userName, email: email, password:  password});
                localStorage.setItem('users', JSON.stringify(users));
            } else {
                let passwordList = [];
                passwordList.push({userName: userName, email: email, password:  password});
                localStorage.setItem('users', JSON.stringify(passwordList));
            }
            localStorage.setItem('currentUser', JSON.stringify({userName: userName, email: email, password:  password}));
            navigate('/');
        } 
    };

  return (
    <div className="container">
        <section className="row d-flex justify-content-center align-content-center pt-3">
            <section className="col-10 col-md-6 p-5 form-inscription">
                <h1>Inscription</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="userName" className="white h4">Nom d'utilisateur :</label>
                        {userNameError? <p className="errorForm">{userNameError}</p> : ''}
                        <input type="text" id="userName" className="form-control" aria-label="champ email" value={userName} onChange={handleUserName}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="white h4">Email :</label>
                        {emailError? <p className="errorForm">{emailError}</p> : ''}
                        <input type="text" id="email" className="form-control" aria-label="champ email" value={email} onChange={handleEmail}/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="white h4">Mot de passe :</label>
                        {passwordError? <p className="errorForm">{passwordError}</p> : ''}
                        <input type="text" id="password" className="form-control" aria-label="champ mot de passe" value={password} onChange={handlePassword}/>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-lg validBtn">S'inscrire</button>
                    </div>
                </form>
            </section>
        </section>
      
    </div>
  );
}

const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };