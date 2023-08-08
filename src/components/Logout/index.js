import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Tooltip  from 'react-tooltip'


const Logout = () => {

    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (checked) {
            signOut(auth)
                .then(() => {
                    console.log('Vous êtes déconnectés')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                })
                .catch(() => {
                    console.log(('Oups, nous avons une ereur!'))
                })
        }
    }, [checked])

    const handleChange = event => {
        setChecked(event.target.checked);
    }


    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input
                    onChange={handleChange}
                    type='checkbox'
                    checked={checked}
                />
                <span className='slider round' data-tip='Déconnexion'></span>
            </label>
            <Tooltip
                place="left"
                effect="solid"
            />
        </div>
    )
}

export default Logout