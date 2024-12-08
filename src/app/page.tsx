"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PatternDividerMobile from '../../public/pattern-divider-mobile.svg';
import PatternDividerDesktop from '../../public/pattern-divider-desktop.svg';
import DiceIcon from '../../public/icon-dice.svg';

interface Post {
  id: number;
  advice: string;
}

export default function Home() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const data = await fetch('https://api.adviceslip.com/advice');
      const response = await data.json();
      setPost(response.slip);
    } catch (error) {
      console.error('Failed to fetch advice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handleDiceClick = () => {
    fetchAdvice();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No advice available.</div>;
  }

  return (
    <section className="box-shadow flex flex-col items-center justify-center w-[21.4375rem] h-[19.6875rem] rounded-[0.625rem] bg-[#313A48] md:w-[33.75rem] md:h-[20.75rem] gap-y-6 md:gap-y-10 relative text-center pt-10 px-6 pb-16 md:pt-12 md:px-12 md:pb-[4.5rem]">
      <div className="space-y-6">
        <h1 className="text-[#53FFAA] text-[0.6875rem] font-extrabold tracking-[0.21606rem] leading-normal md:text-[0.8125rem] md:tracking-[0.25538rem]">
          ADVICE # {post.id}
        </h1>
        <p className="text-[#CEE3E9] tracking-[-0.01606rem] leading-normal font-extrabold text-2xl md:tracking-[-0.01875rem] md:text-[1.75rem]">
          {post.advice}
        </p>
      </div>
      <Image
        src={PatternDividerMobile}
        alt="Pattern Divider"
        className="md:hidden"
      />
      <Image
        src={PatternDividerDesktop}
        alt="Pattern Divider"
        className="hidden md:block"
      />
      <button
        className="size-16 bg-[#53FFAA] rounded-full flex items-center justify-center absolute bottom-[-2.5rem] md:bottom-[-2.8125rem]"
        onClick={handleDiceClick}
      >
        <Image
          src={DiceIcon}
          alt="Dice Icon"
        />
      </button>
    </section>
  );
}
