import { useEffect, useState } from 'react'
import './App.css'
import masjidImage from './assets/masjid.webp'
import { BsQuestionCircle } from 'react-icons/bs';

type TimerProp = {
  days: number
  hours: number,
  minutes: number,
  seconds: number
};

type AppProp = {
  targetDate: Date
}

function App({ targetDate } : AppProp) {

  const calculateDifference = (): TimerProp => {
    const difference = targetDate.getTime() - new Date().getTime();

    if(difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0}
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  };

  const [currentTimer, setCurrentTimer] = useState<TimerProp>(calculateDifference());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimer(calculateDifference());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const showTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  }

  return (
    <div className='grid place-items-center'>
      <img src={masjidImage} className='w-64 md:w-80'/>

      <div className='flex flex-col gap-y-6 text-center'>
        <p className='font-bold text-3xl md:text-4xl'>Ramadhan 1446 H</p>

        <p className='text-2xl md:text-3xl'>Countdown:</p>

        <div className='grid grid-cols-4 text-lg md:text-2xl gap-x-2 md:gap-x-4'>
          <p className='text-4xl md:text-6xl font-bold'>{currentTimer.days}</p>
          <p className='text-4xl md:text-6xl font-bold'>{currentTimer.hours}</p>
          <p className='text-4xl md:text-6xl font-bold'>{currentTimer.minutes}</p>
          <p className='text-4xl md:text-6xl font-bold'>{currentTimer.seconds}</p>

          <p>Days</p>
          <p>Hours</p>
          <p>Minutes</p>
          <p>Seconds</p>
          
        </div>
      </div>
      
      <div className='absolute top-0 right-0 text-4xl m-2'>
        <button className='cursor-pointer' onClick={showTooltip}>
          <BsQuestionCircle />
        </button>
        {
          isTooltipOpen && 
          <div className='w-48 h-60 border-2 absolute -translate-x-[100%] p-2 bg-white'>
            <p className='italic text-sm'>*Untuk wilayah Indonesia berdasarkan Informasi yang tersedia.</p>
            <br />
            <p className='italic text-sm'>
            *Penetapan resmi awal Ramadan oleh pemerintah akan dikonfirmasi <br /> melalui sidang isbat yang diadakan menjelang bulan Ramadan. 
            </p>
          </div>
        }
        </div>
    </div>
  )
}

export default App
