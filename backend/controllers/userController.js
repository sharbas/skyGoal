import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser=async(req,res)=>{
    try{
        console.log('register controller');
       const {name,email,password}=req.body
       const userExists=await User.findOne({email:email}) 
           
       if(userExists){
        return res.status(400).json({message:'user already exist'})
       }

       const passwordRegex=/.{6,}/;

       if(!password.match(passwordRegex)){
        return res.status(400).json({message:'Password must be 6 atleast 6 characters'})
       }

       const user=await User.create({
        name,
        email,
        password
       })

       if(user){
        return res.status(200).json({message:'User registration successfull'})
       }else{
        return res.status(401).json({message:'Invalid mail or password'})
       }


    }catch(error){
console.error(error)
 res.status(500).json({error:'An error occurred while processing your request.'})
    }
}






const authUser=async(req,res)=>{
    try{
const {email,password}=req.body
const user=await User.findOne({email:email})
if(user && (await user.matchPassword(password))){
    const userToken=generateToken(user._id)
    
   res.status(200).json({userToken,message:'Login successfull'})
}else{
    res.status(401).json({message:'Invalid email or password'})
}

    }catch(error){
     console.error(error)
     res.status(500).json({error:'An error occured while processing your request.'})
    }
}


const getUserProfile = async (req, res) => {
    try {
        const myProfile=req.user
        res.status(200).json({ myProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
      console.log('this is updateuserprofile');
      const imagePath = req.file.filename; // Access profileImage from the request body
      const user = await User.findById(req.user._id);
  //controller
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.profileImage = imagePath || user.profileImage;
  
        if (req.body.password) {
          user.password = req.body.password;
        }
  
        const updatedUser = await user.save();
        const userToken = generateToken({ userId: user._id }); // Pass only the necessary information
  
        res.status(200).json({
          userToken,
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  };
  


export{
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile
}