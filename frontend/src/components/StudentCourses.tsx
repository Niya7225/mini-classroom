import { useEffect, useState } from "react";

import {
    getAllCourses,
    getMyEnrollments,
    enrollCourse,
    unenrollCourse,
} from "../api/courses";

interface Course {
    id: number;
    title: string;
    description: string;
    teacher?: {
        id: number;
        name: string;
    };
}

function StudentCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] =
        useState<Course[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const allCourses =
                await getAllCourses();

            const myCourses =
                await getMyEnrollments();

            setCourses(allCourses.data);
            setEnrolledCourses(myCourses.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEnroll(id: number) {
        try {
            await enrollCourse(id);
            loadData();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUnenroll(id: number) {
        try {
            await unenrollCourse(id);
            loadData();
        } catch (error) {
            console.error(error);
        }
    }

    function isEnrolled(courseId: number) {
        return enrolledCourses.some(
            (course) => course.id === courseId
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">
                Browse Courses
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-xl shadow p-6 border"
                    >
                        <h2 className="text-xl font-bold">
                            {course.title}
                        </h2>

                        <p className="text-gray-600 mt-2">
                            {course.description}
                        </p>

                        {course.teacher && (
                            <p className="mt-3 text-sm text-gray-500">
                                Teacher:
                                {" "}
                                {course.teacher.name}
                            </p>
                        )}

                        {isEnrolled(course.id) ? (
                            <button
                                onClick={() =>
                                    handleUnenroll(
                                        course.id
                                    )
                                }
                                className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Unenroll
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    handleEnroll(
                                        course.id
                                    )
                                }
                                className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Enroll
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <h1 className="text-3xl font-bold mt-12 mb-8">
                My Enrolled Courses
            </h1>

            {enrolledCourses.length === 0 ? (
                <p>
                    You are not enrolled in any
                    course.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {enrolledCourses.map(
                        (course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-xl shadow p-6 border"
                            >
                                <h2 className="text-xl font-bold">
                                    {
                                        course.title
                                    }
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {
                                        course.description
                                    }
                                </p>

                                {course.teacher && (
                                    <p className="mt-3 text-sm text-gray-500">
                                        Teacher:
                                        {" "}
                                        {
                                            course
                                                .teacher
                                                .name
                                        }
                                    </p>
                                )}

                                <button
                                    onClick={() =>
                                        handleUnenroll(
                                            course.id
                                        )
                                    }
                                    className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Unenroll
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentCourses;