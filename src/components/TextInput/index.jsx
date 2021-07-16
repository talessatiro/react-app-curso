import P from 'prop-types';
import './styles.css';

export const TextInput = ({ inputValue, actionFn }) => (
  <input type="search" className="text-input" value={inputValue} placeholder="Type your search" onChange={actionFn} />
);

TextInput.propTypes = {
  inputValue: P.string,
  actionFn: P.func.isRequired,
};
