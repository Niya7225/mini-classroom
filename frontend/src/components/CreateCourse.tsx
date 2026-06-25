import { useState } from "react";
import { createCourse } from "../api/course";

interface Props {
    onCourseCreated: () => void;
}

function CreateCourse({ onCourseCreated }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        await createCourse({ title, description });

        setTitle("");
        setDescription("");
        onCourseCreated();

        setMessage("Course created successfully");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className="border rounded-xl p-6 shadow mt-5">
            <h2 className="text-xl font-bold mb-4">Create Course</h2>

            {message && (
                <p className="text-green-600 mb-3">{message}</p>
            )}

            <input
                className="border p-2 rounded w-full mb-3"
                placeholder="Course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="border p-2 rounded w-full mb-3"
                placeholder="Course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create
            </button>
        </div>
    );
}

export default CreateCourse;