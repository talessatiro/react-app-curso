import './styles.css';

export const Button = ({ text, actionFn, disabled }) => (
    <button
        className="button"
        onClick={actionFn}
        disabled={disabled}>
        {text}
    </button>
);