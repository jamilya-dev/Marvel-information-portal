import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
  state = {
    charAll: [],
    loading: true,
    error: false,
    hover: false,
  };

  marvelService = new MarvelService();

  onHoverOn = () => {};

  componentDidMount() {
    this.marvelService.getAllCharacters().then(this.onCharAllLoaded).catch(this.onError);
  }

  onCharAllLoaded = (charAll) => {
    this.setState({ charAll, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { charAll, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner style={{ gridColumnStart: '2' }} /> : null;
    const content = !(loading || error) ? <View charAll={charAll} /> : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        <ul className="char__grid">{content}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
const View = ({ charAll }) => {
  return charAll.map((item) => {
    const hasImageNotAvailable = item.thumbnail.includes('image_not_available');
    return (
      // char__item_selected
      <li key={item.id} className="char__item">
        <img
          src={item.thumbnail}
          alt={item.name}
          style={{
            objectFit: hasImageNotAvailable ? 'contain' : 'cover',
          }}
        />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });
};
export default CharList;
