"use client"
import {useRouter} from "next/navigation"
export default function Component() {
    const router=useRouter()
    function helloWorld(){
        router.push("./signup")
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container mx-auto flex max-w-md flex-col items-center justify-center gap-8 px-4 ">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Welcome to Jerry's Payments Application</h1>
          <p className="text-muted-foreground">Secure and reliable payment processing for your business.</p>
          <p className="text-muted-foreground">Featuring authentication with next auth, enabled on ramp transaction</p>
        </div>
        <div className="grid w-full gap-2">
          <button onClick={helloWorld} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign Up</button>
        </div>
      </div>
    </main>
  )
}