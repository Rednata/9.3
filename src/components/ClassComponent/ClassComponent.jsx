import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber: this.randomFunc(),
    count: 0,
    newGame: false
  };

  randomFunc() {
    return Math.floor(Math.random() *
      (this.props.max - this.props.min + 1) + this.props.min);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({count: state.count + 1}));

    this.setState(state => {
      if (!state.userNumber) return state;

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали загаданное число ${state.userNumber},
        попыток ${state.count}`,
        newGame: true
      };
    });

    this.setState(() => ({userNumber: ''}));
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  onBtnHandleClick = () => {
    this.setState({
      result: 'Результат',
      count: 0,
      randomNumber: this.randomFunc(),
      newGame: false,
    });
  };

  render() {
    let btnNewGame;
    if (this.state.newGame) {
      btnNewGame = <button className={`${style.moreGame} ${style.btn}`}
        onClick={this.onBtnHandleClick}>
        Сыграть еще
      </button>;
    } else {
      btnNewGame = '';
    }
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number' id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          <button className={style.btn}>
            Угадать</button>
        </form>
        {btnNewGame}

      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number
};
