'use client';

import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxImage {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: ParallaxImage[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const prefersReduced = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Reduced motion: show the collage as a single static screen instead
	// of a 300vh scroll-zoom sequence. CSS-only (motion-safe) so the
	// server and client markup stay identical — no hydration divergence.
	return (
		<div ref={container} className="relative h-[100dvh] motion-safe:h-[300vh]">
			<div className="sticky top-0 h-[100dvh] overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={prefersReduced ? undefined : { scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw]">
								<Image
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									fill
									sizes="(max-width: 768px) 90vw, 60vw"
									loading={index === 0 ? 'eager' : 'lazy'}
									className="bg-[#121215] object-contain"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
