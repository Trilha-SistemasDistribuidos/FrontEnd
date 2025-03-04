function Input({ value, onChange, title, tipo, placeholder, options }) {
  return (
    <div className="w-full sm:w-3/4 md:w-2/3 flex flex-col">
      <label className="text-[#2D8C50] mb-1 flex justify-start">
        {title}:
      </label>

      {tipo === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-[#FAFAFA] mb-4 border border-[#B8DCC2] rounded"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={tipo}
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-[#FAFAFA] mb-4 border border-[#B8DCC2] rounded"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
export default Input;