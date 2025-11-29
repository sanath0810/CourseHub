import React, { useState, useEffect, useRef } from 'react';

const MouseParallax = ({ children, strength = 20, className = '' }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!ref.current) return;
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / (width / 2);
            const y = (e.clientY - top - height / 2) / (height / 2);
            setPosition({ x, y });
        };

        const element = ref.current;
        if (element) {
            // Attach to window to track mouse even outside the element for a smoother feel
            // or attach to element for contained effect. Let's use window for hero feel.
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-transform duration-100 ease-out ${className}`}
            style={{
                transform: `translate(${position.x * strength}px, ${position.y * strength}px)`,
            }}
        >
            {children}
        </div>
    );
};

export default MouseParallax;
