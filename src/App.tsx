import { useEffect, useState } from 'react'
import './App.css'
import masjidImage from './assets/masjid.webp'
import { BsQuestionCircle } from 'react-icons/bs';
import ContextLanguage, { SelectedBahasa } from './libs/bahasa';
import ConfettiEffect from './ConfettiEffect';

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
  const [isRamadhanTime, setIsRamadhanTime] = useState(false);

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
      const updatedTimer = calculateDifference();

      if(updatedTimer.days === 0 && updatedTimer.hours === 0 && updatedTimer.minutes === 0 && updatedTimer.seconds === 0) {
        setIsRamadhanTime(true);
        clearInterval(timer)
      }

      setCurrentTimer(calculateDifference());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const showTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  const [currentBahasa, setCurrentBahasa] = useState<SelectedBahasa>('Indonesia');

  const changeBahasa = (value: SelectedBahasa) => {
    setCurrentBahasa(value);
  };

  return (
    <>
      <div className=''>
        <div className='text-4xl p-2'>
          <div className='w-full'>
            <div className='flex gap-x-4 items-center justify-end w-full'>
              <select className='text-xl md:text-2xl' defaultValue={currentBahasa} onChange={(e) => changeBahasa(e.target.value as SelectedBahasa)}>
                <option value={'English'}>English</option>
                <option value={'Indonesia'}>Indonesia</option>
              </select>

              <button className='cursor-pointer' onClick={showTooltip}>
                <BsQuestionCircle />
              </button>
            </div>
          </div>
          {
            isTooltipOpen && 
            <div className='w-48 h-60 border-2 absolute right-0 -translate-x-1/4  p-2 bg-white'>
              <p className='italic text-sm mb-4'>*{ContextLanguage().getParagraph1(currentBahasa)}</p>
              <p className='italic text-sm'>
              *{ContextLanguage().getParagraph2(currentBahasa)}
              </p>
            </div>
          }
        </div>
        <div className='grid place-items-center'>
          
          <img src={masjidImage} className='w-64 md:w-80'/>

          <div className='flex flex-col gap-y-6 text-center'>
            <p className='font-bold text-3xl md:text-4xl'>Ramadhan 1446 H</p>
            {
              isRamadhanTime ? 
              <p className='text-4xl md:text-6xl font-bold'>{ContextLanguage().getCelebrationText(currentBahasa)}</p>
              : 
              <>
                <p className='text-2xl md:text-3xl'>{ContextLanguage().getCountdown(currentBahasa)}</p>

                <div className='grid grid-cols-4 text-lg md:text-2xl gap-x-2 md:gap-x-4'>
                  <p className='text-4xl md:text-6xl font-bold'>{currentTimer.days}</p>
                  <p className='text-4xl md:text-6xl font-bold'>{currentTimer.hours}</p>
                  <p className='text-4xl md:text-6xl font-bold'>{currentTimer.minutes}</p>
                  <p className='text-4xl md:text-6xl font-bold'>{currentTimer.seconds}</p>

                  <p>{ContextLanguage().getDays(currentBahasa)}</p>
                  <p>{ContextLanguage().getHours(currentBahasa)}</p>
                  <p>{ContextLanguage().getMinutes(currentBahasa)}</p>
                  <p>{ContextLanguage().getSeconds(currentBahasa)}</p>
                  
                </div>
              </>
            }
          </div>
        </div>
      </div>
      <ConfettiEffect isShow={isRamadhanTime}/>
    </>
  )
}

export default App
