"use client";

import { Ref, forwardRef, useState, useEffect, useMemo } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export interface GalleryPhoto {
  src: string;
  alt: string;
  captionVi: string;
  captionEn: string;
}

type Direction = "left" | "right";

const DESKTOP_X = ["-320px", "-160px", "0px", "160px", "320px"];
const MOBILE_X = ["-30px", "-15px", "0px", "15px", "30px"];
const OFFSET_Y = ["15px", "32px", "8px", "22px", "44px"];
const DIRECTIONS: Direction[] = ["left", "left", "right", "right", "left"];

export const PhotoGallery = ({
  photos,
  animationDelay = 0.5,
}: {
  photos: GalleryPhoto[];
  animationDelay?: number;
}) => {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.15,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    },
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: prefersReduced
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 70,
            damping: 12,
            mass: 1,
            delay: custom.order * 0.15,
          },
    }),
  };

  const initialState = useMemo(
    () =>
      photos.slice(0, 5).map((photo, i) => ({
        ...photo,
        id: i + 1,
        order: i,
        y: OFFSET_Y[i],
        zIndex: 50 - i * 10,
        direction: DIRECTIONS[i],
      })),
    [photos]
  );

  const [photosState, setPhotosState] = useState(initialState);

  const sendToBack = (id: number) => {
    setPhotosState((prev) => {
      const minZIndex = Math.min(...prev.map((p) => p.zIndex));
      return prev.map((p) =>
        p.id === id ? { ...p, zIndex: minZIndex - 10 } : p
      );
    });
  };

  // The photo currently on top of the pile — its caption is shown below.
  const topPhoto = photosState.reduce((top, p) =>
    p.zIndex > top.zIndex ? p : top
  );

  return (
    <div className="mt-16 md:mt-32 relative">
      <div className="relative mb-6 h-[320px] w-full items-center justify-center flex overflow-visible">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photosState].sort((a, b) => a.zIndex - b.zIndex).map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{
                    x: isMobile ? MOBILE_X[photo.order] : DESKTOP_X[photo.order],
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={photo.alt}
                    direction={photo.direction}
                    tilt={(((photo.order * 137 + 61) % 30) / 10) + 1}
                    onActivate={() => sendToBack(photo.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Caption of the top photo */}
      <div className="flex flex-col items-center gap-2 min-h-[3.5rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={topPhoto.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-base italic text-center px-6"
            style={{ color: 'rgba(232, 195, 115, 0.85)' }}
          >
            {t(topPhoto.captionVi, topPhoto.captionEn)}
          </motion.p>
        </AnimatePresence>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0A0A8]">
          {t('Chạm hoặc kéo ảnh để xem tấm kế tiếp', 'Tap or drag a photo to see the next one')}
        </p>
      </div>
    </div>
  );
};

const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>
  ) {
    return <Image ref={ref} {...props} />;
  })
);

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  tilt = 2,
  onActivate,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
  tilt?: number;
  onActivate?: () => void;
}) => {
  // Deterministic per-photo tilt (SSR-safe — no random, no effect).
  const rotation = tilt * (direction === "left" ? -1 : 1);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.12, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        // pan-y keeps vertical page scroll working when a thumb lands here
        touchAction: "pan-y",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing border-[6px] border-white shadow-xl"
      )}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate?.();
        }
      }}
      role="button"
      aria-label={alt}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden shadow-sm bg-[#121215]">
        <MotionImage
          className={cn("object-cover")}
          fill
          src={src}
          {...props}
          alt=""
          draggable={false}
          sizes={`${width}px`}
        />
      </div>
    </motion.div>
  );
};
