import Carousel from "@/components/home/carousel";
import { Navbar } from "@/components/home/Navbar";
import homeCarouselData from "@/data/homecarouseldata";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
    <Carousel carouselData={homeCarouselData}/>
    </main>
  );
}
