type TextInputsProps = {
    textInputs: {
        title: string;
        body: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
}

const TextInputs = (props: TextInputsProps) => {
    return (
        <>
            <input
                className="w-full py-1 px-2 border border-gray-200 rounded"
                name="title"
                placeholder="Title"
                value={props.textInputs.title}
                onChange={props.handleChange}
            />
            <textarea
                className="w-full py-1 px-2 border border-gray-200 rounded my-2"
                name="body"
                placeholder="Text (optional)"
                rows={5}
                value={props.textInputs.body}
                onChange={props.handleChange}
            />
            <button
                className="bg-blue-500 text-white py-1.5 px-4 rounded-full place-self-end hover:opacity-80"
                type="button"
                onClick={props.handleCreatePost}
            >
                Post
            </button>
        </>
    )
}

export default TextInputs