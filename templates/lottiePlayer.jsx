import React, { useEffect, useRef } from 'react';
import Lottie from 'libraries/lottie.min';
export default function LottiePlayer({ _id, _lottie, onDOMLoaded, onReady, onFail }) {
  const lottieContainer = useRef(null);
  const animation = useRef(null);
  const onDataReady = () => {
    onReady(animation.current);
  };
  useEffect(() => {
    animation.current = Lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: _lottie.src
    });
    animation.current.addEventListener('DOMLoaded', onDOMLoaded);
    animation.current.addEventListener('data_ready', onDataReady);
    animation.current.addEventListener('data_failed', onFail);

    return () => {
      animation.current.removeEventListener('DOMLoaded', onDOMLoaded);
      animation.current.removeEventListener('data_ready', onReady);
      animation.current.removeEventListener('data_failed', onFail);
      animation.current.destroy();

    };
  }, [_lottie.src, lottieContainer]);

  return (
    <div className="sliderlottie__lottieplayer">
      <div id={`${_id}-lottie`} ref={lottieContainer}></div>
    </div>
  );
}
