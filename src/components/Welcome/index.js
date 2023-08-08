import React, { Fragment, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { auth, user } from '../Firebase/firebaseConfig'
import Logout from '../Logout'
import Quiz from '../Quiz'
import Loader from '../Loader'

const Welcome = () => {

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, user => {
      user ? setUserSession(user) : navigate('/')
    })

    if (!!userSession) {
      const colRef = user(userSession.uid);

      getDoc(colRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const docData = snapshot.data();
            setUserData(docData);
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
    return listener();
  }, [userSession])


  return userSession === null ? (
    <Loader
      loadingMsg='Authentification ...'
      styling={{ textAlign: 'center', color: '#FFFFFF' }}
    />
  ) : (
    <div className='quiz-bg'>
      <div className='container'>
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  )
}

export default Welcome