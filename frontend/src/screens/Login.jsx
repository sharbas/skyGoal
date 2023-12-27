import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice.js'
import { toast} from 'react-toastify'
import axios from 'axios'
// import { TEInput, TERipple } from "tw-elements-react";
const Login=() =>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')




    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {userInfo}=useSelector((state)=>state.auth)
   
  

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const submitHandler = async (e) => {
      e.preventDefault();
    
      try {
        const res = await axios.post('http://localhost:5000/api/users/auth', { email, password });
    
        if (res.status === 200) {
          const userToken = res.data?.userToken;
    
          if (userToken) {
            dispatch(setCredentials({ userToken }));
            navigate('/');
            toast.success(res.data.message || 'Login successful');
          } else {
            toast.error('Invalid response format');
          }
        } else if (res.status === 401) {
          toast.error(res.data.message || 'Invalid email or password');
        }
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    };
    

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
         
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-2/3  h-2/4"
              alt=""
            />
          </div>
          
         
            {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
          <div className='pb-20'><h1 className=''>Login</h1></div>
            <form onSubmit={submitHandler} className='border-5'>
              {/* <!-- Email input --> */}
              <div className="mb-6 ">
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  className="mt-1 p-2.5 w-full border rounded-md focus:ring-primary-600 focus:border-primary-600"
                  value={email}
                  placeholder='Enter your email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

          {/* <!-- Password input --> */}
          <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 p-2.5 w-full border rounded-md focus:ring-primary-600 focus:border-primary-600"
                  value={password}
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <!-- Remember me checkbox --> */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-300 border-gray-300 rounded"
                    id="exampleCheck3"
                    defaultChecked
                  />
                  <label
                    className="ml-2 text-sm text-gray-700"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>

                {/* <!-- Forgot password link --> */}
                <a
                  href="#!"
                  className="text-primary text-sm hover:text-primary-600 focus:text-primary-600"
                >
                  Forgot password?
                </a>
              </div>

              {/* <!-- Submit button --> */}
              <button
  type="submit"
  style={{ backgroundColor: '#3490dc', borderColor: 'black' }}
  className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 focus:outline-none focus:border-primary-600 font-medium rounded-md text-sm px-4 py-2 transition duration-300 ease-in-out"
>
  Sign in
</button>


  {/* Registration link */}
  <p className="text-sm text-gray-700 mt-2">
    Don't have an account yet?{' '}
    <a
      href="/register"
      className="text-primary hover:underline focus:underline"
    >
      Sign up
    </a>
  </p>
         
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
