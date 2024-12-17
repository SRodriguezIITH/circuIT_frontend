import Image from "next/image";
import Navbar from "./components/navbar";
import HomePage from "../pages/home";
import { Provider } from "@/components/ui/provider";

export default function Home() {
  return (
    <main style={{background:"#1d1d1d", height:"100vh", width:"100vw"}}>
      <Provider><HomePage></HomePage></Provider>
      
    </main>
  );
}
