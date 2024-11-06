import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { BookText, Check, Copy, ChevronDown, ChevronUp } from "lucide-react"
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import DemoContainer from '@/components/DemoContainer';
import TypingAnimation from './ui/typing-animation';

const floatingAnimation = {
  y: ["0%", "-10%", "0%"],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const HomePage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const controls = useAnimation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText('npm install @micoblanc/chipster');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToExamples = () => {
    setCurrentSection(1);
  };

  const scrollToTop = () => {
    setCurrentSection(0);
  };

  useEffect(() => {
    controls.start({ y: `${-currentSection * 100}vh` });
  }, [currentSection, controls]);

  return (
    <div className='bg-white h-screen text-black overflow-hidden'>
      <motion.div
        animate={controls}
        initial={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ height: '200vh' }}
      >
        <section className='h-screen flex flex-col items-center justify-center p-4 relative'>
          <main className='max-w-5xl w-full flex flex-col items-center'>
            <img className='mb-2' width={130} height={30} alt='chipster logo' src="/chipster-logo.svg"/>
            <TypingAnimation
              className="inline-flex items-center justify-center px-4 py-1 text-neutral-500 transition ease-out font-medium hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-lg text-center mb-6"
              text="A Flexible Multi-Entry Input Component for React"
              duration={20}
            />
            <div className='flex justify-center space-x-2 font-medium mb-8'>
              <Button asChild>
                <a href="https://github.com/micoblanc/chipster" target="_blank" rel="noopener noreferrer">
                  <GitHubLogoIcon className="h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/start">
                  <BookText className="h-4 w-4" /> Docs
                </a>
              </Button>
            </div>

            <div className='bg-gray-100 flex items-center pr-1 pl-2 py-1 rounded-lg border border-gray-200 mb-4'>
              <code className='text-sm'>npm install @micoblanc/chipster</code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyToClipboard} 
                className='ml-4 bg-white border border-gray-200'
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </main>
          <motion.div 
            className="absolute bottom-8 cursor-pointer flex flex-col items-center"
            onClick={scrollToExamples}
            animate={floatingAnimation}
          >
            <span className="text-sm font-medium mb-1">See Examples</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </section>
        <section className='h-screen flex flex-col items-center justify-center relative'>
          <DemoContainer />
          <motion.div 
            className="absolute top-6 cursor-pointer flex flex-col items-center"
            onClick={scrollToTop}
            animate={floatingAnimation}
          >
            <ChevronUp className="h-6 w-6" />
            <span className="text-sm font-medium mt-1">Back to Top</span>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
export default HomePage