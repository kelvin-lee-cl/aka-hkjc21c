import { useEffect, useMemo, useRef, useState } from 'react'
import './Slider.css'

type SliderProps = {
    images: string[]
    altPrefix?: string
}

export default function Slider({ images, altPrefix = 'slide' }: SliderProps) {
    const validImages = useMemo(() => images.filter(Boolean), [images])
    const [index, setIndex] = useState(0)
    const timerRef = useRef<number | null>(null)
    const isPausedRef = useRef(false)

    if (validImages.length === 0) return null

    const go = (delta: number) => {
        setIndex((prev) => (prev + delta + validImages.length) % validImages.length)
    }
    const goto = (i: number) => setIndex(i)

    // Auto-advance
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return
        const start = () => {
            if (timerRef.current !== null || isPausedRef.current) return
            timerRef.current = window.setInterval(() => {
                setIndex((prev) => (prev + 1) % validImages.length)
            }, 4000)
        }
        const stop = () => {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
        start()
        return () => stop()
    }, [validImages.length])

    const handleMouseEnter = () => {
        isPausedRef.current = true
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
        }
    }
    const handleMouseLeave = () => {
        isPausedRef.current = false
        if (timerRef.current === null) {
            timerRef.current = window.setInterval(() => {
                setIndex((prev) => (prev + 1) % validImages.length)
            }, 4000)
        }
    }

    return (
        <div className="slider" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="slider__nav slider__nav--left" aria-label="Previous" onClick={() => go(-1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="slider__viewport">
                <img className="slider__img" src={validImages[index]} alt={`${altPrefix} ${index + 1}`} />
            </div>
            <button className="slider__nav slider__nav--right" aria-label="Next" onClick={() => go(1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="slider__dots">
                {validImages.map((_, i) => (
                    <button
                        key={i}
                        className={`slider__dot${i === index ? ' is-active' : ''}`}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => goto(i)}
                    />
                ))}
            </div>
        </div>
    )
}


