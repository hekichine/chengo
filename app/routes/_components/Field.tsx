interface FieldProps {
    label: string;
    value: string;
    type?: string;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    classList?: string;
}

export default function Field({ label, value, type="text", onChange, placeholder, classList }:FieldProps ) {
    return (
        <div className={`field-group ${classList}`}>
            <label htmlFor={`${label}-${value}`} className="text-base capitalize text-gray-500 select-none" >{label}</label>
            <input
                id={`${label}-${value}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="block mt-2 w-full border p-3 rounded"
            />
        </div>
    );
}
