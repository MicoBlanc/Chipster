import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { BookText, Check, Copy } from "lucide-react"
import Image from 'next/image';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import DemoContainer from '@/components/DemoContainer';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const controls = useAnimation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText('npm install @micoblanc/chipster');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentSection < 1) {
        setCurrentSection(1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(0);
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection]);

  useEffect(() => {
    controls.start({ y: `${-currentSection * 100}vh` });
  }, [currentSection, controls]);

  return (
    <div className='bg-white h-screen overflow-hidden'>
      <motion.div 
        animate={controls}
        initial={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ height: '200vh' }}
      >
        <section className='h-screen flex flex-col items-center justify-center p-4'>
          <main className='max-w-4xl w-full flex flex-col items-center'>
            <Image className='mb-4' width={150} height={30} alt='chipster logo' src="/chipster-logo.svg"/>
            
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <p className='text-xl text-center mb-8'>A Flexible Multi-Entry Input Component for React</p>
            </AnimatedShinyText>
            <div className='flex justify-center space-x-2 font-medium mb-8'>
              <Button asChild>
                <a href="https://github.com/micoblanc/chipster" target="_blank" rel="noopener noreferrer">
                  <GitHubLogoIcon className="h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/docs">
                  <BookText className="h-4 w-4" /> Docs
                </a>
              </Button>
            </div>

            <div className='bg-gray-100 flex items-center pr-1 pl-2 py-1 rounded-lg border border-gray-200'>
              <code className='text-sm'>npm install @micoblanc/chipster</code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyToClipboard} 
                className='ml-4 bg-white border'
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </main>
        </section>
        <section className='h-screen flex items-center justify-center'>
          <DemoContainer />
        </section>
      </motion.div>
    </div>
  );
}
