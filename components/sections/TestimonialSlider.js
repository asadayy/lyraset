'use client';

import { useCallback, useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Icon from '@/components/Icon';
import MediaImage from '@/components/MediaImage';
import '@/styles/testimonials.scss';

/**
 * Swipeable testimonial carousel (navy). Spring-physics drag via Framer Motion,
 * dot pagination, prev/next controls, and auto-advance that pauses on hover.
 * Supports N testimonials.
 */
export default function TestimonialSlider({ testimonials = [], data = {} }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  if (!count) return null;

  return (
    <section
      className="section section--dark testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="glow-blob testimonials__glow" aria-hidden="true" />
      <div className="container-x">
        <div className="testimonials__head">
          <div>
            {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
            <h2 className="display-lg">{data.heading || 'What clients say'}</h2>
          </div>
          {count > 1 && (
            <div className="testimonials__controls">
              <button onClick={() => go(index - 1)} aria-label="Previous testimonial">
                <Icon name="chevron-left" size={22} />
              </button>
              <button onClick={() => go(index + 1)} aria-label="Next testimonial">
                <Icon name="chevron-right" size={22} />
              </button>
            </div>
          )}
        </div>

        <LazyMotion features={domAnimation}>
          <div className="testimonials__viewport">
            <m.div
              className="testimonials__track"
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 34 }}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) go(index + 1);
                else if (info.offset.x > 80) go(index - 1);
              }}
            >
              {testimonials.map((t) => (
                <figure className="testimonial-card" key={t._id || t.author}>
                  <Icon name="quote" size={40} className="testimonial-card__quote" />
                  {t.headline && <p className="testimonial-card__headline">{t.headline}</p>}
                  <blockquote className="testimonial-card__body">“{t.quote}”</blockquote>
                  <figcaption className="testimonial-card__author">
                    <span className="testimonial-card__avatar">
                      <MediaImage media={t.avatar} label={t.author} ratio="1" rounded />
                    </span>
                    <span>
                      <span className="testimonial-card__name">{t.author}</span>
                      <span className="testimonial-card__role">{t.role}</span>
                    </span>
                    {t.rating > 0 && (
                      <span className="testimonial-card__stars" aria-label={`${t.rating} out of 5`}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Icon key={i} name="star" size={16} />
                        ))}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </m.div>
          </div>
        </LazyMotion>

        {count > 1 && (
          <div className="testimonials__dots" role="tablist">
            {testimonials.map((t, i) => (
              <button
                key={t._id || i}
                className={`testimonials__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
