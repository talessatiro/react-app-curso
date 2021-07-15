import './styles.css';

export const TextInput = ({ inputValue, actionFn }) => {
    return (
        <input type="search"
            className="text-input"
            value={inputValue}
            placeholder="Type your search"
            onChange={actionFn}
        />
    )
}