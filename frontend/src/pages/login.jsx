import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Lock, User } from "lucide-react";
import { motion } from "framer-motion";


function Login(){

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = (e)=>{

        e.preventDefault();

        // Temporary login
        if(username==="admin" && password==="admin@123"){

            navigate("/dashboard");

        }
        else{

            alert("Invalid Username or Password");

        }

    };


    return(

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-blue-100">


            <motion.div

            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}

            className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-96"

            >


                <div className="flex justify-center mb-5">

                    <HeartPulse 
                    size={55}
                    className="text-emerald-500"
                    />

                </div>


                <h1 className="text-2xl font-bold text-center text-gray-800">

                    PHC Medicine System

                </h1>


                <p className="text-center text-gray-500 mb-6">

                    Login to manage medicine stock

                </p>


                <form onSubmit={handleLogin}>


                    <div className="mb-4 flex items-center bg-white rounded-xl px-3 shadow">

                        <User className="text-blue-500"/>

                        <input

                        className="p-3 w-full outline-none"

                        placeholder="Username"

                        value={username}

                        onChange={(e)=>setUsername(e.target.value)}

                        />

                    </div>



                    <div className="mb-5 flex items-center bg-white rounded-xl px-3 shadow">

                        <Lock className="text-blue-500"/>


                        <input

                        type="password"

                        className="p-3 w-full outline-none"

                        placeholder="Password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                        />

                    </div>


                    <button

                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-3 rounded-xl font-semibold hover:scale-105 transition"

                    >

                    Login

                    </button>


                </form>


            </motion.div>


        </div>

    )

}


export default Login;