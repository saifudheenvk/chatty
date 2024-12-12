import { useCallback, useEffect, MutableRefObject } from 'react';

type UseInfiniteScrollCallback = () => void;

const useInfiniteScroll = (
  bodyRef: MutableRefObject<HTMLElement | null>,
  bottomLineRef: MutableRefObject<HTMLElement | null>,
  callback: UseInfiniteScrollCallback
): void => {
  const handleScroll = useCallback(() => {
    const containerHeight = bodyRef?.current?.getBoundingClientRect().height;
    const bottomLineTop = bottomLineRef?.current?.getBoundingClientRect().top;

    if (containerHeight !== undefined && bottomLineTop !== undefined && bottomLineTop <= containerHeight) {
      callback();
    }
  }, [bodyRef, bottomLineRef, callback]);

  useEffect(() => {
    const bodyRefCurrent = bodyRef?.current;
    bodyRefCurrent?.addEventListener('scroll', handleScroll, true);

    return () => {
      bodyRefCurrent?.removeEventListener('scroll', handleScroll, true);
    };
  }, [bodyRef, handleScroll]);
};

export default useInfiniteScroll;
