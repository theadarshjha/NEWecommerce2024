import Carousel from '@/components/home/carousel';
import homeCarouselData from '@/data/homecarouseldata';

export default function Home() {
  return (
    <main className=''>
      <Carousel carouselData={homeCarouselData} />
    </main>
  );
}
