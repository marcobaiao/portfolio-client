import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TextInput({
  name,
  inputRef,
  type = "text",
  placeholder,
  className,
  value,
  onChange,
  onKeyDown,
  onClear,
  clear = false,
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border border-1 border-gray-400 pl-2 pr-8 py-1.5 rounded-md outline-1 outline-primary w-full`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {clear && (
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute right-1 top-1/2 text-gray-400 hover:text-gray-500 cursor-pointer"
          style={{ transform: "translate(-50%, -50%)" }}
          onClick={onClear}
        />
      )}
    </div>
  );
}

export default TextInput;
