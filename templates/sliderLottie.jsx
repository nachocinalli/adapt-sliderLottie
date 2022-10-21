// import Adapt from 'core/js/adapt';
import React, { useState, useEffect } from 'react';
import { templates, compile, classes } from 'core/js/reactHelpers';

export default function SliderLottie(props) {
  // const ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

  const {
    _id,
    _isEnabled,
    _isInteractionComplete,
    _isCorrect,
    _isCorrectAnswerShown,
    _lottie,
    _items,
    _userAnswer,
    _selectedItem,
    onSelectItem,
    onLottieReady,
    displayTitle,
    body,
    instruction,
    ariaQuestion

  } = props;

  const [animation, setAnimation] = useState(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  const onSliderChange = (value) => {
    animation.goToAndStop(value, true);
    setCurrentFrame(value);
    onSelectItem(value);

  };
  const onReady = (anim) => {
    setAnimation(anim);
    const _totalFrames = anim.totalFrames;
    setCurrentFrame(anim.currentFrame);

    if (_lottie._useFramesAsItems || _items.length === 0) {
      setTotalFrames(_totalFrames - 1);
      onLottieReady(_totalFrames);
    }
  };
  const showCorrectAnswer = () => {
    const answers = props.model.getCorrectAnswers();
    const middleAnswer = +answers[Math.floor(answers.length / 2)];
    animation.goToAndStop(middleAnswer, true);
    setCurrentFrame(middleAnswer);
  };
  const hideCorrectAnswer = () => {
    const userAnswer = _userAnswer || _selectedItem?.value;
    animation.goToAndStop(userAnswer, true);
    setCurrentFrame(userAnswer);
  };
  useEffect(() => {
    if (!animation) return;

    _isCorrectAnswerShown ? showCorrectAnswer() : hideCorrectAnswer();

  }, [_isCorrectAnswerShown, animation, _selectedItem]);

  return (
    <div className="component__inner sliderlottie__inner">
      <templates.header {...props} />
      <div
        className={classes([
          'component__widget',
          'sliderlottie__widget',
          _lottie._useFramesAsItems && 'sliderlottie__useframes',
          !_isEnabled && 'is-disabled',
          _isInteractionComplete && 'is-complete is-submitted show-user-answer',
          _isCorrect && 'is-correct'
        ])}

        aria-labelledby={ariaQuestion ? null : (displayTitle || body || instruction) && `${_id}-header`}
        aria-label={ariaQuestion || null}
      >
        <templates.lottiePlayer {...props} onReady={onReady}/>
        <templates.sliderControl {...props} onChange={onSliderChange} _totalFrames={totalFrames} _currentFrame={currentFrame} />
      </div>
      {_items[currentFrame] &&
      <div className='sliderlottie__item'>
        {_items[currentFrame]?.title &&
        <div className='sliderlottie__item-title' dangerouslySetInnerHTML={{ __html: compile(_items[currentFrame].title) }}></div>
        }
        {_items[currentFrame].body &&
          <div className='sliderlottie__item-body' dangerouslySetInnerHTML={{ __html: compile(_items[currentFrame].body) }}></div>
        }

      </div>
      }
      <div className='btn__container'></div>
    </div>
  );
}
