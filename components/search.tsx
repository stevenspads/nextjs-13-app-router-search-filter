"use client";

import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect } from "react";

export default function Search() {
  const router = useRouter();

  /* 
   * onChange without debounce
   *
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      router.push(`/?search=${e.target.value}`);
    } else {
      router.push(`/`);
    }
  };
  */

  const onChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length) {
        router.push(`/?search=${e.target.value}`);
      } else {
        router.push(`/`);
      }
    }, 500),
    [] // function will only be created once (initially)
  );

  useEffect(() => {
    return () => {
      onChange.cancel();
    };
  }, [onChange]);

  return (
    <>
      <input
        placeholder="Search products..."
        type="search"
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg"
      />
    </>
  );
}
