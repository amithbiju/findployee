import React, { useState } from 'react'
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // const {userLoggedIn} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const Navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      await doSignInWithEmailAndPassword(email, password).then(Navigate('/'));
    }else{
Navigate("/")
    }
  }
  return (
    <section classNameName="bg-gray-50 dark:bg-gray-900">
    {/* {userLoggedIn && (<Navigate to={'/Home'} replace={true} />)} */}
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow items-center justify-center dark:border md:mt-0 sm:max-w-md xl:p-0">
        <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Login to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit} >
                    <div>
                        <label for="email" className="block mb-2 font-medium text-gray-900 text-left">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 font-medium text-gray-900 text-left">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={isSigningIn} className={'w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 ${isSigningIn ? focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'}>{isSigningIn ? 'Signing In...' : 'Sign In'}</button>
                </form>
            </div>
        </div>
    </div>
  </section>
);
};

export default Login;
