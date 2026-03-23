"use client";

import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { useRef, useState } from "react";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERYResult;
  activeCategory?: string;
}

export function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const draggedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  const endDrag = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    pointerIdRef.current = null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Doar click stânga pentru mouse.
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const el = scrollerRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    draggedRef.current = false;
    setIsDragging(true);
    pointerIdRef.current = e.pointerId;

    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Ignorăm dacă browserul nu suportă.
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const el = scrollerRef.current;
    if (!el) return;

    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) draggedRef.current = true;

    // Scroll direct pentru drag.
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const onPointerUp = () => {
    const el = scrollerRef.current;
    if (el && pointerIdRef.current !== null) {
      try {
        el.releasePointerCapture(pointerIdRef.current);
      } catch {
        // no-op
      }
    }
    endDrag();
  };

  const onPointerCancel = () => endDrag();

  return (
    <div className="relative">
      {/* Horizontal scrolling container - full width with edge padding */}
      {/* scrollbar e ascuns doar vizual; scroll-ul rămâne activ */}
      <div
        ref={scrollerRef}
        className={`flex gap-4 overflow-x-auto py-4 pl-8 pr-4 sm:pl-12 sm:pr-6 lg:pl-10 lg:pr-8
        [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClickCapture={(e) => {
          // Dacă user-ul a tras (drag), evităm navigarea accidentală pe Link.
          if (draggedRef.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {/* Fade edges (doar estetic, nu blochează interacțiunea) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/90 via-white/60 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/60" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/90 via-white/60 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/60" />
        {/* All Products tile */}
        <Link
          href="/"
          className={`group relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
            !activeCategory
              ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
              : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
          }`}
        >
          <div className="relative h-32 w-56 sm:h-56 sm:w-80">
            {/* Imaginea unnamed.jpg ca background full */}
            <Image
              src="/unnamed.png"
              alt="Toate produsele"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
              priority
            />
            {/* Overlay pentru lizibilitate text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Category name */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-base font-semibold text-white drop-shadow-md">
                Toate produsele
              </span>
            </div>
          </div>
        </Link>

        {/* Category tiles */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          const imageUrl = category.image?.asset?.url;

          return (
            <Link
              key={category._id}
              href={`/?category=${category.slug}`}
              className={`group relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
                  : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
              }`}
            >
              <div className="relative h-32 w-56 sm:h-56 sm:w-80">
                {/* Background image or gradient fallback */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={category.title ?? "Category"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
                )}

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                {/* Category name */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-base font-semibold text-white drop-shadow-md">
                    {category.title}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
