import QuestionView from 'core/js/views/questionView';

class SliderLottieView extends QuestionView {
  preinitialize() {
    this.onSelectItem = (...args) => this.model.selectItem(...args);
    this.onLottieReady = (...args) => this.model.onLottieReady(...args);
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  onDOMLoaded () {
    this.setReadyStatus();
  }

  onFail() {
    this.setReadyStatus();
  }

  resetQuestion() {
    this.model.selectItem(0);
  }
}

SliderLottieView.template = 'sliderLottie.jsx';

export default SliderLottieView;
