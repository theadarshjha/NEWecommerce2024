import Carousel from "@/components/carousel";
import { Navbar } from "@/components/Navbar";
import homeCarouselData from "@/data/homecarouseldata";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
    <Navbar/>
    <Carousel carouselData={homeCarouselData}/>
    </main>
  );
}
