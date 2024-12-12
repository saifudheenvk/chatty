import { useEffect, useRef } from "react";


const useChatScrollToBottom = (prop: number) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight;
    }
  }, [prop]);
};


export default useChatScrollToBottom
