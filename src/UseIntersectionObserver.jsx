import { useState, useEffect, useRef } from "react";

function UseIntersectionObserver(options = {}){
    const [isIntersecting, setIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if(!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIntersecting(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '-100px',
                threshold: 0.1,
                ...options,
            }
        );
        observer.observe(element);
        
        return () => {
            observer.unobserve(element);
        }
    },[options]);

    return[elementRef, isIntersecting];
}

export default UseIntersectionObserver;