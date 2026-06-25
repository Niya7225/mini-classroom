import { useEffect, useState } from "react";
import { getMyCourses, updateCourse, deleteCourse } from "../api/course";

interface Course {
    id: number;
    title: string;
    description: string;
}

interface Props {
    refresh: number;
}

function MyCourses({ refresh }: Props) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        loadCourses();
    }, [refresh]);

    async function loadCourses() {
        const response = await getMyCourses();
        setCourses(response.data);
    }

    function startEdit(course: Course) {
        setEditingId(course.id);
        setTitle(course.title);
        setDescription(course.description);
    }

    async function saveEdit() {
        if (!editingId) return;
        await updateCourse(editingId, { title, description });
        setEditingId(null);
        loadCourses();
    }

    async function handleDelete(id: number) {
        await deleteCourse(id);
        loadCourses();
    }

    return (
        <div className="border rounded-xl p-6 shadow mt-5">
            <h2 className="text-xl font-bold mb-4">My Courses</h2>

            {courses.map((course) => (
                <div key={course.id} className="border rounded p-4 mb-3">
                    {editingId === course.id ? (
                        <>
                            <input
                                className="border p-2 w-full mb-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className="border p-2 w-full mb-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button onClick={saveEdit} className="bg-green-500 text-white px-3 py-1 rounded">
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="font-bold">{course.title}</h3>
                            <p>{course.description}</p>

                            <button onClick={() => startEdit(course)} className="bg-blue-500 text-white px-3 py-1 rounded mt-2 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(course.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MyCourses;