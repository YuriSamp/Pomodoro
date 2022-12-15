import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  const COUNTDOWN_POMODORO_1_IN_SECONDS = 25 * 60
  const COUNTDOWN_POMODORO_2_IN_SECONDS = 5 * 60
  const COUNTDOWN_POMODORO_3_IN_SECONDS = 15 * 60

  const [secondsAmount, setSecondsAmont] = useState(COUNTDOWN_POMODORO_1_IN_SECONDS);
  const [IsCounting, setIsCounting] = useState(false);
  const IntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (secondsAmount === 0) {
      const audio = new Audio("/alarm.mp3")
      audio.play()
      return
    }

    if (IsCounting) {
      IntervalRef.current = setTimeout(() => {
        setSecondsAmont(secondsAmount - 1);
      }, 1000)
    } else {
      clearTimeout(IntervalRef.current);
    }

  }, [secondsAmount, IsCounting])

  function ChangeCountdown(ref: number) {
    setIsCounting(false);
    clearTimeout(IntervalRef.current);
    setSecondsAmont(ref);
  }

  function ResetCounter() {
    setIsCounting(false);
    setSecondsAmont(COUNTDOWN_POMODORO_1_IN_SECONDS);
  }

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className='flex flex-col justify-center items-center min-h-screen bg-[#B87E91]'>
        
        <section className='bg-[#000B] py-5 sm:py-10 px-2 sm:px-10 border-2 rounded-lg border-transparent opacity-70 '>

          <div className='flex text-center items-center gap-2 sm:gap-6 py-2 border-b-2 border-[#B87E91]'>
            <button className='text-lg sm:text-2xl focus:bg-black focus:opacity-90 px-2 py-2 rounded-lg border-transparent' onClick={() => ChangeCountdown(COUNTDOWN_POMODORO_1_IN_SECONDS)}>Pomodoro</button>
            <button className='text-lg sm:text-2xl focus:bg-black focus:opacity-90 px-2 py-2 rounded-lg border-transparent' onClick={() => ChangeCountdown(COUNTDOWN_POMODORO_2_IN_SECONDS)}>Short Break</button>
            <button className='text-lg sm:text-2xl focus:bg-black focus:opacity-90 px-2 py-2 rounded-lg border-transparent' onClick={() => ChangeCountdown(COUNTDOWN_POMODORO_3_IN_SECONDS)}>Long Break</button>
          </div>

          <div className='py-8 flex justify-center'>
            <span className='text-6xl sm:text-8xl px-4'>{String(minutes).padStart(2, '0')}</span>
            <span className='text-6xl sm:text-8xl px-4'>:</span>
            <span className='text-6xl sm:text-8xl px-4'>{String(seconds).padStart(2, '0')}</span>
          </div>

          <div className='flex gap-16 justify-center'>
            <button className='text-4xl' onClick={() => setIsCounting(!IsCounting)}> {IsCounting ? "Pause" : "Start"}</button>
            <button className='text-4xl' onClick={() => ResetCounter()}> Reset</button>
          </div>

        </section>

      </main>
    </>
  )
}
