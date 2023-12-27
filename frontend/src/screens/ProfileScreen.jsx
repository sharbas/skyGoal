import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import userAxiosInstance from '../axios/userAxiosInstance.js'
import { toast } from 'react-toastify'


const ProfileScreen = () => {
  // const {userInfo} = useSelector((state)=>state.auth)

  const [submittingForm, setSubmittingForm] = useState(false);

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [oldImage,setOldImage] = useState('')
  const [image,setImage] = useState('')

  const submitHandler = async(e)=>{
    try {
      e.preventDefault()
      // if(!name || !email ){
      //   toast.error("Name,Email,Specialization,Address,Qualification,Experience,Fees cannot be Empty!!")
      //   return
      // }
      console.log('this is submit handler in userprofile');
      if(password !== confirmPassword){
        toast.error("Passwords are not matching")
        return;
      }
      const passwordRegex =/.{6,}/;
      if (password && !passwordRegex.test(password)) {
        toast.error("Password must be 6  character.");
        return;
      }
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("email", email);
  
      formData.append("password", password);
      formData.append("image", image);
        // Log FormData entries
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
   

      const res = await userAxiosInstance.put('/profile',formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log('this is ressssss',res);

 
      setSubmittingForm(true)
      toast.success('Updated Successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  useEffect(()=>{
   console.log('this is usseffect in userprofile fetchdetails');
    const fetchDetails = async()=>{
      let res = await userAxiosInstance.get('/profile')
      setName(res?.data?.myProfile?.name)
      setEmail(res?.data?.myProfile?.email)

      setOldImage(res?.data?.myProfile?.profileImage)

    }
    fetchDetails();
    setSubmittingForm(false);
  },[submittingForm])





  

  return (
    <section className="p-4 px-5 lg:px-0 bg-userBgColor mt-20">
      <div className="bg-white text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5 ">
        <div className='flex'>

          <div className='w-2/3 flex justify-center'>
        <h3 className="text-headingColor text-[18px] leading-9 font-bold ">
          User <span className="text-primaryColor ">Profile</span>
        </h3>
        </div>
 
    </div>
      </div>

      <div className="bg-white m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="md:flex md:justify-between md:mx-[60px] items-center"
        >
          <div className="px-2 m-2">
            <div className="flex">
              <div className="mb-2 h-40 me-2 bg-blue-300 w-1/2 rounded-lg">
                <img src={image?URL.createObjectURL(image):`http://localhost:5000/images/${oldImage}`} className='w-full h-full rounded-lg' alt="user-image" />
              </div>
              <div className="mb-2 ms-2 p-4 w-1/2">
                <div>
                  <p></p>
                  <label
                    htmlFor="uploadPhoto"
                    className="inline-block text-sm font-medium text-blue-500 dark:text-blue-200"
                  >
                    Upload your Photo
                  </label>
                  <input
                    className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                    id="uploadPhoto"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    type="file"
                  />
                </div>
              </div>
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter Your Name"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

      
          
          </div>
          <div className="px-2">
       
          
            <div className="my-[20px]">
             
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Confirm Password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Confirm Password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>


      </div>

    </section>
 
    
  )
}

export default ProfileScreen