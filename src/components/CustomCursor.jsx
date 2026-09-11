import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    function handleMouseMove(event) {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    }

    function handleMouseOver(event) {
      const target = event.target.closest("a, button, [role='button']");

      setIsHovering(!!target);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrame;

    function animate() {
      position.current.x += (mouse.current.x - position.current.x) * 0.15;

      position.current.y += (mouse.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        const offset = isHovering ? 20 : 10;

        cursorRef.current.style.transform = `translate(
          ${position.current.x - offset}px,
          ${position.current.y - offset}px
        )`;
      }

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/70 transition-[width,height] duration-300 ${
        isHovering ? "h-10 w-10" : "h-5 w-5"
      }`}
    />
  );
}
