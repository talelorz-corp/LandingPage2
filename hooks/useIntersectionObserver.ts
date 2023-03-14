import { useEffect } from 'react';
import { MutableRefObject, useRef } from 'react';
import React from 'react'

type Observer = {
    target: MutableRefObject<null>;
    onIntersect: any;
    root: any | null;
    rootMargin: string;
    threshold: number;
    enabled: boolean | undefined;
};

const useIntersectionObserver = ({root, target, onIntersect, threshold=1.0, rootMargin='0px', enabled=true,}:Observer) => {
    useEffect(()=>{
        if(!enabled){
            return
        }

        const observer = new IntersectionObserver(
            entries => entries.forEach(entry => entry.isIntersecting && onIntersect()),
            {
                root: root&& root.current,
                rootMargin,
                threshold,
            } 
        )

        const el = target && target.current

        if (!el) {
            return
        }

        observer.observe(el)

        return () => {
            observer.unobserve(el)
        }
    }, [target, enabled, root, threshold, rootMargin, onIntersect])
}

export default useIntersectionObserver