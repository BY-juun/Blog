"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Flex from "./Flex";
import { useVerticalScrollHandler } from "@/hooks";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useVerticalScrollHandler({ onScrollDown: show, onScrollUp: hide });

  return (
    <Flex
      justifyContents="center"
      alignItems="center"
      tagName="button"
      className={`${
        !isVisible ? "hidden" : ""
      } z-10 w-[50px] h-[50px] fixed m-auto left-1/2 bottom-0 bg-white rounded-full cursor-pointer text-black translate-x-[-50%] translate-y-[-50%] shadow-[0px_2px_7px_#333d4b26] text-[9px] flex-col`}
      onClick={scrollToTop}
    >
      <IoIosArrowUp />
      <span className="font-semibold">TOP</span>
    </Flex>
  );
};

export default memo(ScrollToTopButton);
