import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { BiSolidError } from "react-icons/bi";
import {auth} from "@/firebaseconfig"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken } from "firebase/auth"


export default function LoginComponent() {
  const[registerFlag, setRegisterFlag] = useState<boolean>(false)
  const[email, setEmail] =useState<string>("")
  const[password, setPassword]=useState<string>("")
  const[repeatPassword, setRepeatPassword]=useState<string>("")
  const[loginError, setLoginError]=useState<string>("")
  const router = useRouter()

  function switchRegisterFlag(){
    setRegisterFlag(!registerFlag)
  }
  async function handleLogin() {
    setLoginError("")
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        if (user) {
          const token = await getIdToken(user)
          console.log("Successfully Logged In",user)
          
          // Fetch health information after login        
          router.push('/dashboard')      
        }
      })
      .catch((error) => {
        console.log("Login Error: ", error.message)
      })
  }
  async function handleRegister(){
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential:any)=>{
        const user = userCredential.user
        if(user){
          console.log("Successfully Registered: ", user)
        }
      })
      .catch((error:any) =>{
        const errorCode = error.code
        const errorMessage = error.message;
        console.log("Error Code: ", errorCode)
        console.log("Error Message: ", errorMessage)
      })
    }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {!registerFlag ? <CardTitle>Login to your account</CardTitle>:<CardTitle>Register for an account</CardTitle>}
        {!registerFlag ? <CardDescription>
          Enter your email below to login to your account
        </CardDescription> :<CardDescription>
          Enter a valid email address and password to register
        </CardDescription>}
        <CardAction>
          {!registerFlag ? <Button variant="link" className="cursor-pointer" onClick={switchRegisterFlag}>Sign Up</Button> :
                    <Button variant="link" className="cursor-pointer" onClick={switchRegisterFlag}>Log In</Button>
        }
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              
              <Input
                onChange={(e=>{setEmail(e.target.value)})}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              {!registerFlag ? <Input id="password" type="password" required /> :
              <><Input id="password" onChange={(e=>{setPassword(e.target.value)})}type="password" required />
              <Label>Re-Enter Password</Label><Input id="password2" onChange={(e=>{setRepeatPassword(e.target.value)})}type="password" required /></> }
            </div>
            {password!==repeatPassword ? <p className="text-red-500 flex">Passwords Do Not Match!<BiSolidError className="text-l"/></p> : null}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">

        {!registerFlag? <Button type="submit" onClick={handleLogin} className="w-full cursor-pointer">
          Login
        </Button> : <Button onClick={handleRegister} type="submit" className="w-full cursor-pointer">
          Register
        </Button>}
        
      </CardFooter>
    </Card>
  )
}
