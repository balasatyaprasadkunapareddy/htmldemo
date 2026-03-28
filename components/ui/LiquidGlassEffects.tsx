"use client";

import { useEffect } from "react";

export function LiquidGlassEffects() {
  useEffect(() => {
    // Magnetic 3D Tilt Effect for Glass Cards
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      target.style.transform = `
        perspective(900px)
        rotateX(${y * -6}deg)
        rotateY(${x * 6}deg)
        scale(1.02)
      `;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = "";
    };

    // Apply to glass cards with hover attribute
    const glassCards = document.querySelectorAll(".glass[data-tilt='true']");
    glassCards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove as EventListener);
      card.addEventListener("mouseleave", handleMouseLeave as EventListener);
    });

    // Magnetic Button Effect
    const handleButtonMove = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleButtonLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transform = "";
    };

    // Apply to buttons with magnetic class
    const magneticButtons = document.querySelectorAll(".magnetic-button");
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", handleButtonMove as EventListener);
      btn.addEventListener("mouseleave", handleButtonLeave as EventListener);
    });

    // Number Animation for counters
    const animateValue = (el: HTMLElement, start: number, end: number, duration: number = 800) => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        el.textContent = current.toString();

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    // Observe counter elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const endValue = parseInt(el.getAttribute("data-value") || "0");
            animateValue(el, 0, endValue);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    const counters = document.querySelectorAll(".counter[data-value]");
    counters.forEach((counter) => observer.observe(counter));

    // Cleanup
    return () => {
      glassCards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove as EventListener);
        card.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      });
      magneticButtons.forEach((btn) => {
        btn.removeEventListener("mousemove", handleButtonMove as EventListener);
        btn.removeEventListener("mouseleave", handleButtonLeave as EventListener);
      });
      counters.forEach((counter) => observer.unobserve(counter));
    };
  }, []);

  return null;
}
