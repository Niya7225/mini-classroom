import { useEffect, useState } from "react";

import { getCourseAssignments } from "../api/courses";
import TeacherSubmissions from "./TeacherSubmissions";

interface Assignment {
    id: number;
    title: string;
    description: string;
    due_date: string;
}

interface Props {
    courseId: number;
}

function CourseAssignments({ courseId }: Props) {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);

    useEffect(() => {
        loadAssignments();
    }, [courseId]);

    async function loadAssignments() {
        const data = await getCourseAssignments(courseId);
        setAssignments(data);
    }

    function toggleSubmissions(assignmentId: number) {
        setSelectedAssignment(
            selectedAssignment === assignmentId
                ? null
                : assignmentId
        );
    }

    return (
        <div className="border rounded-xl p-6 shadow mt-5">
            <h2 className="text-xl font-bold mb-4">
                Assignments
            </h2>

            {assignments.map((assignment) => (
                <div
                    key={assignment.id}
                    className="border rounded-lg p-4 mb-3"
                >
                    <h3 className="font-semibold">
                        {assignment.title}
                    </h3>

                    <p className="mt-2">
                        {assignment.description}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                        Due: {new Date(assignment.due_date).toLocaleString()}
                    </p>

                    <button
                        onClick={() => toggleSubmissions(assignment.id)}
                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {selectedAssignment === assignment.id
                            ? "Hide Submissions"
                            : "View Submissions"}
                    </button>

                    {selectedAssignment === assignment.id && (
                        <TeacherSubmissions
                            assignmentId={assignment.id}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default CourseAssignments;