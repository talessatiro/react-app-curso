import P from 'prop-types';
import './styles.css';

export const Button = ({ text, actionFn, disabled }) => (
  <button className="button" onClick={actionFn} disabled={disabled}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  actionFn: P.func.isRequired,
  disabled: P.bool,
};
