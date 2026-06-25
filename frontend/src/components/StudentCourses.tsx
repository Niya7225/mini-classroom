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
}

function StudentCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const allCourses = await getAllCourses();
        const myCourses = await getMyEnrollments();

        setCourses(allCourses.data);
        setEnrolledCourses(myCourses.data);
    }

    async function handleEnroll(id: number) {
        await enrollCourse(id);
        loadData();
    }

    async function handleUnenroll(id: number) {
        await unenrollCourse(id);
        loadData();
    }

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">
                Browse Courses
            </h2>

            {courses.map((course) => (
                <div
                    key={course.id}
                    className="border rounded p-4 mb-3"
                >
                    <h3 className="font-bold">
                        {course.title}
                    </h3>

                    <p>{course.description}</p>

                    <button
                        onClick={() => handleEnroll(course.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                    >
                        Enroll
                    </button>
                </div>
            ))}

            <h2 className="text-2xl font-bold mt-8 mb-4">
                My Enrolled Courses
            </h2>

            {enrolledCourses.map((course) => (
                <div
                    key={course.id}
                    className="border rounded p-4 mb-3"
                >
                    <h3 className="font-bold">
                        {course.title}
                    </h3>

                    <p>{course.description}</p>

                    <button
                        onClick={() => handleUnenroll(course.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                    >
                        Unenroll
                    </button>
                </div>
            ))}
        </div>
    );
}

export default StudentCourses;