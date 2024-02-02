function TextAreaInput({
  name,
  className,
  value,
  onChange,
  placeholder,
  rows = 3,
}) {
  return (
    <textarea
      name="description"
      placeholder={placeholder}
      rows={rows}
      className={`p-2 border border-1 border-gray-300 rounded-md focus:outline-1 focus:outline-gray-300 resize-none ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextAreaInput;
