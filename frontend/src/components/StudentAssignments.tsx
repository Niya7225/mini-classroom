import { useEffect, useState } from "react";

import { getMyEnrollments } from "../api/courses";
import { getCourseAssignments } from "../api/assignment";

import SubmissionForm from "./SubmissionForm";

interface Course {
    id: number;
    title: string;
    description: string;
}

interface Assignment {
    id: number;
    title: string;
    description: string;
    due_date: string;
}

function StudentAssignments() {
    const [courses, setCourses] =
        useState<Course[]>([]);

    const [assignments, setAssignments] =
        useState<Assignment[]>([]);

    const [selectedCourse, setSelectedCourse] =
        useState<number | null>(null);

    useEffect(() => {
        loadCourses();
    }, []);

    async function loadCourses() {
        try {
            const response =
                await getMyEnrollments();

            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadAssignments(
        courseId: number
    ) {
        try {
            const response =
                await getCourseAssignments(
                    courseId
                );

            setAssignments(response.data);
            setSelectedCourse(courseId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">
                Assignments
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

                        <button
                            onClick={() =>
                                loadAssignments(
                                    course.id
                                )
                            }
                            className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            View Assignments
                        </button>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">
                        Course Assignments
                    </h2>

                    {assignments.length ===
                    0 ? (
                        <p>
                            No assignments
                            available.
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {assignments.map(
                                (
                                    assignment
                                ) => (
                                    <div
                                        key={
                                            assignment.id
                                        }
                                        className="bg-white rounded-xl shadow p-6 border"
                                    >
                                        <h3 className="text-xl font-bold">
                                            {
                                                assignment.title
                                            }
                                        </h3>

                                        <p className="mt-2 text-gray-600">
                                            {
                                                assignment.description
                                            }
                                        </p>

                                        <p className="mt-3 text-sm text-red-500">
                                            Due:
                                            {" "}
                                            {new Date(
                                                assignment.due_date
                                            ).toLocaleString()}
                                        </p>

                                        <div className="mt-5">
                                            <SubmissionForm
                                                assignmentId={
                                                    assignment.id
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentAssignments;