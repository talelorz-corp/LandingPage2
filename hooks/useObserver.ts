import { MutableRefObject, useRef } from 'react';
import { Ref, useEffect } from 'react';
import React from 'react'

type Observer = {
    target: MutableRefObject<null>;
    onIntersect: any;
    root: Document | null
    rootMargin: string
    threshold: number
};

const useObserver = (
    {target, onIntersect, root=null, rootMargin="0px", threshold=1.0,}:Observer
) => {
   useEffect(()=>{
    let observer:any
    if (target && target.current) {
        observer = new IntersectionObserver(onIntersect, {root, rootMargin, threshold})
        observer.observe(target.current)
    }
    return ()=> observer&&observer.disconnect()
}, [target, rootMargin, threshold])
}

export default useObserver