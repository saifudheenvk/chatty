import useInfiniteScroll from "@hooks/useInfiniteScroll";
import { useRef, useState } from "react";
import "@pages/social/streams/Streams.scss";
import Suggestions from "@components/suggestions/Suggestions";
import useEffectOnce from "@hooks/useEffectOnce";
import { getUserSuggestions } from "@redux/api/suggestion";
import { useAppDispatch } from "@hooks/redux";

const Streams = () => {
  const bottomLineRef = useRef(null);
  const bodyRef = useRef(null);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const PAGE_SIZE = 8;

  function fetchPostData() {
    let pageNum = currentPage;
    if (currentPage <= Math.round(totalPostsCount / PAGE_SIZE)) {
      pageNum += 1;
      setCurrentPage(pageNum);
      // getAllPosts();
    }
  }
  useInfiniteScroll(bodyRef, bottomLineRef, fetchPostData);

  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  });

  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef}>
          <div>Post Form</div>
          <div>Post Items</div>
          <div ref={bottomLineRef} style={{ marginBottom: '50px', height: '50px' }}></div>
        </div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  )
}

export default Streams
