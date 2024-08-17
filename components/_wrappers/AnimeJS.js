import anime from 'animejs';
import {
  useEffect, useId, useMemo, useRef, useState,
} from 'react';

// See https://animejs.com/documentation/ docs
export default function Anime(rawProps = {
  initial: null,
  timeline: null,
  callback: null,
  onScroll: null,
  onVisible: null,
}) {
  const id = `anim-${(useId()).replaceAll(':', '')}`;
  const props = useMemo(() => {
    const newProps = {
      // easing: transitions.default.replace('cubic-bezier', 'cubicBezier'),
      easing: 'linear',
      ...rawProps,
    };

    if (newProps?.initial?.targets) {
      newProps.initial = {
        ...newProps.initial,
        targets: `#${id} ${newProps.initial.targets}`,
      };
    }

    return newProps;
  }, [rawProps, id]);

  const ref = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (!animation) {
      if (props.timeline) {
        setAnimation(anime.timeline(props.timeline));
      } else if (props.initial) {
        setAnimation(anime(props.initial));
      }
    }

    if (props.callback) {
      props.callback(animation);
    }

    // Events
    let onScrollEvent;

    if ((props.onScroll || props.onVisible) && ref.current && animation) {
      const duration = props.initial?.duration || props.timeline?.duration;
      onScrollEvent = () => {
        const windowHeight = window.innerHeight;
        const animationStartTarget = Math.max(
          0,
          window.pageYOffset + ref.current.getBoundingClientRect().top - windowHeight,
        );
        const animationDoneTarget = window.pageYOffset + ref.current.getBoundingClientRect().top;
        const scrollAmount = document.scrollingElement.scrollTop;
        const targetDistance = animationDoneTarget - animationStartTarget;

        // 10, 50, scrollTop: 30, duration: 1000
        let amount = (duration / targetDistance) * Math.min(
          Math.max(0, scrollAmount - animationStartTarget),
          animationDoneTarget - animationStartTarget,
        );
        amount = Math.max(0, Math.min(duration, amount));

        if (props.onVisible && !hasPlayed && (duration / targetDistance) * Math.min(
          scrollAmount - animationStartTarget,
          animationDoneTarget - animationStartTarget,
        ) >= 0) {
          setHasPlayed(true);
          animation.play();
        } else {
          const callback = props?.onScroll?.(amount);
          if (callback) {
            animation.seek(amount);
          }
        }
      };
      onScrollEvent();
      window.addEventListener('scroll', onScrollEvent);
    }

    return () => {
      if (onScrollEvent) {
        window.removeEventListener('scroll', onScrollEvent);
      }
    };
  }, [animation, setAnimation, hasPlayed, setHasPlayed, props]);

  return <div id={id} ref={ref} style={{ overflowX: 'hidden', overflow: 'visible', ...props.style }}>
    {props.children}
  </div>;
}
