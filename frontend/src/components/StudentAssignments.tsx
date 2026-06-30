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
    const [courses, setCourses] = useState<Course[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedCourse, setSelectedCourse] =
        useState<number | null>(null);

    useEffect(() => {
        loadCourses();
    }, []);

    async function loadCourses() {
        try {
            const response = await getMyEnrollments();
            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadAssignments(courseId: number) {
        try {
            const response =
                await getCourseAssignments(courseId);

            setAssignments(response.data);
            setSelectedCourse(courseId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-5">
                My Courses
            </h2>

            {courses.length === 0 ? (
                <p>No enrolled courses.</p>
            ) : (
                courses.map((course) => (
                    <div
                        key={course.id}
                        className="border rounded p-4 mb-3"
                    >
                        <h3 className="font-bold">
                            {course.title}
                        </h3>

                        <p>
                            {course.description}
                        </p>

                        <button
                            onClick={() =>
                                loadAssignments(
                                    course.id
                                )
                            }
                            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                        >
                            View Assignments
                        </button>
                    </div>
                ))
            )}

            {selectedCourse && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Assignments
                    </h2>

                    {assignments.length === 0 ? (
                        <p>
                            No assignments for this
                            course.
                        </p>
                    ) : (
                        assignments.map(
                            (assignment) => (
                                <div
                                    key={assignment.id}
                                    className="border rounded p-4 mb-4"
                                >
                                    <h3 className="font-bold">
                                        {assignment.title}
                                    </h3>

                                    <p>
                                        {assignment.description}
                                    </p>

                                    <p className="mt-2 text-sm">
                                        Due:{" "}
                                        {new Date(
                                            assignment.due_date
                                        ).toLocaleString()}
                                    </p>

                                    <SubmissionForm
                                        assignmentId={
                                            assignment.id
                                        }
                                    />
                                </div>
                            )
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentAssignments;