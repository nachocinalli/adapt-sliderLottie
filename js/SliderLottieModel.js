import QuestionModel from 'core/js/models/questionModel';

export default class SliderLottieModel extends QuestionModel {
  init() {
    QuestionModel.prototype.init.call(this);

    if (this.get('_items').length > 0) {
      this.setupModel();
    }
  }

  setupModel() {
    this.setupModelItems();
    this.selectItem(0);
  }

  reset(type = 'hard', canReset = this.get('_canReset')) {
    const wasReset = super.reset(type, canReset);
    if (!wasReset) return false;
    this.deselectAllItems();
    this.selectItem(0);
    return true;
  }

  setupModelItems() {

    const answer = this.get('_correctAnswer');
    const range = this.get('_correctRange');

    this.get('_items').forEach((item, index) => {
      item.value = index;
      item.selected = false;
      item.correct = answer ? index === Number(answer) : (index >= range._bottom && index <= range._top);
    });
  }

  onLottieReady(totalFrames) {
    const items = new Array(totalFrames).fill(0).map((_, index) => ({ title: index.toString() }));
    this.set('_items', items);
    this.setupModel();
  }

  selectItem(itemIndex) {
    this.deselectAllItems();
    const item = this.get('_items')[itemIndex];
    if (!item) return;
    item.selected = true;
    this.set('_selectedItem', item);
  }

  deselectAllItems() {
    this.get('_items').forEach(item => (item.selected = false));
  }

  storeUserAnswer() {
    this.set('_userAnswer', this.get('_selectedItem').value);
  }

  canSubmit() {
    return true;
  }

  isCorrect() {
    const numberOfCorrectAnswers = this.get('_items').filter(({ selected, correct }) => selected && correct).length;
    this.set('_isAtLeastOneCorrectSelection', numberOfCorrectAnswers > 0);
    this.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);

    return this.get('_isAtLeastOneCorrectSelection');
  }

  isPartlyCorrect() {
    return this.get('_isAtLeastOneCorrectSelection');
  }

  setScore() {
    const numberOfCorrectAnswers = this.get('_numberOfCorrectAnswers');
    const questionWeight = this.get('_questionWeight');
    const score = questionWeight * numberOfCorrectAnswers;
    this.set('_score', score);
  }

  getResponse() {
    return this.get('_userAnswer').toString();
  }

  getResponseType() {
    return 'numeric';
  }

  getCorrectAnswers() {
    const answerSingle = this.get('_correctAnswer');
    const answers = [];
    if (answerSingle) {
      return [ answerSingle ];
    }
    const answerMultiple = this.get('_correctRange');
    if (!answerMultiple) {
      return answers;
    }
    const bottom = answerMultiple._bottom;
    const top = answerMultiple._top;
    if (bottom === undefined || top === undefined) {
      return answers;
    }
    let answer = bottom;
    const step = 1;
    while (answer <= top) {
      answers.push(answer);
      answer += step;
    }
    return answers;
  }
}
