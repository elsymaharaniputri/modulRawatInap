//COMPONENT INPUT PROPS
interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;  // Function yang menerima string
    error?: string;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
}

const Input = ({ label, value, onChange, error, placeholder, type = "text", icon }: InputFieldProps) => {
    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="w-full sm:col-span-6">
                <label className="block text-sm/6 font-medium text-black">{label}</label>
                <div className="mt-2">
                    <div className="">
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${error ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />                    </div>
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Input

