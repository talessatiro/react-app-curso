import './styles.css';

export const TextInput = ({ inputValue, actionFn }) => (
    <input type="search"
        className="text-input"
        value={inputValue}
        placeholder="Type your search"
        onChange={actionFn}
    />
);