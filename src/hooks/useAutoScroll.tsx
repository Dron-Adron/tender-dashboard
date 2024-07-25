import { useEffect, useRef, useState } from 'react';

const useAutoScroll = (dependencies: any[]) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const isModalOpen = dependencies.includes(true);

    if (scrollContainer && !isUserInteracting && !isModalOpen) {
      const step = 1; // Уменьшение значения для снижения скорости скроллинга
      const intervalTime = 100; // Интервал времени для более медленного скроллинга

      const autoScroll = () => {
        if (!scrollContainer) return;

        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

        // Check if we reached the bottom
        if (scrollContainer.scrollTop >= maxScroll) {
          scrollContainer.scrollTop = 0; // Scroll to the top
        } else {
          scrollContainer.scrollTop += step; // Continue scrolling down
        }
      };

      const intervalId = setInterval(autoScroll, intervalTime);

      // Clean up on component unmount
      return () => clearInterval(intervalId);
    }
  }, [isUserInteracting, dependencies]);

  const handleUserInteraction = (isInteracting: boolean) => {
    setIsUserInteracting(isInteracting);
  };

  return { scrollContainerRef, handleUserInteraction };
};

export default useAutoScroll;
