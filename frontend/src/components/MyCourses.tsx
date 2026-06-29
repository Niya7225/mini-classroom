import { useEffect, useState } from "react";
import { getMyCourses, updateCourse, deleteCourse } from "../api/courses";
import CourseAssignments from "./CourseAssignments";

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
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

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

        await updateCourse(editingId, {
            title,
            description
        });

        setEditingId(null);
        loadCourses();
    }

    async function handleDelete(id: number) {
        await deleteCourse(id);
        loadCourses();
    }

    function toggleAssignments(courseId: number) {
        setSelectedCourse(
            selectedCourse === courseId ? null : courseId
        );
    }

    return (
        <div className="border rounded-xl p-6 shadow mt-5">
            <h2 className="text-xl font-bold mb-4">
                My Courses
            </h2>

            {courses.map((course) => (
                <div
                    key={course.id}
                    className="border rounded-lg p-4 mb-4"
                >
                    {editingId === course.id ? (
                        <>
                            <input
                                className="border p-2 rounded w-full mb-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                className="border p-2 rounded w-full mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <button
                                onClick={saveEdit}
                                className="bg-green-500 text-white px-3 py-2 rounded"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-semibold">
                                {course.title}
                            </h3>

                            <p className="mt-2">
                                {course.description}
                            </p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => startEdit(course)}
                                    className="bg-blue-500 text-white px-3 py-2 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="bg-red-500 text-white px-3 py-2 rounded"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => toggleAssignments(course.id)}
                                    className="bg-purple-500 text-white px-3 py-2 rounded"
                                >
                                    {selectedCourse === course.id
                                        ? "Hide Assignments"
                                        : "View Assignments"}
                                </button>
                            </div>

                            {selectedCourse === course.id && (
                                <CourseAssignments
                                    courseId={course.id}
                                />
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MyCourses;