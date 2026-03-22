"use client"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
const Dashboard = () => {

    const router = useRouter()
    const [stats, setStats] = useState({})
    const [errorh, setErrorh] = useState({})

 useEffect(() => {
   getStats()
 }, [])
 
const getStats = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch('http://localhost:3000/anime/getstats',{
        method : "GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    const data = await res.json()
    if(res.status === 401){
        localStorage.removeItem("token")
        router.push('/login')
    }
    if(!res.ok){
        setErrorh(data)
        return
    }
    console.log(data)
    setStats(data)
  } catch (error) {
    setErrorh({message : "something went wrong, try again!"})
  }
}

if(errorh.message){
    return(
        <div>
            {errorh.message}
        </div>
    )
}

  return (
    <>
    <div className="flex flex-col items-center m-20 h-full justify-center">
    <div><span className="font-bold">Total: </span>{stats.total}</div>
    <div><span className="font-bold">Completed: </span>{stats.completed}</div>
    <div><span className="font-bold">On Goning: </span>{stats.ongoing}</div>
    <div><span className="font-bold">Favourites: </span>{stats.favourite}</div>
 <button onClick={()=>{router.push("/anime")}} className="cursor-pointer bg-red-600 px-3 py-2 rounded-full">back</button>
      </div>
      
      </>
  )
}

export default Dashboard
