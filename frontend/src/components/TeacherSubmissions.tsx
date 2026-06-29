import { useEffect, useState } from "react";

import {
    getAssignmentSubmissions,
    gradeSubmission
} from "../api/submission";

interface Submission {
    id: number;
    assignment_id: number;
    student_id: number;
    content: string;
    grade: number | null;
    submitted_at: string;
}

interface Props {
    assignmentId: number;
}

function TeacherSubmissions({ assignmentId }: Props) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [grades, setGrades] = useState<Record<number, string>>({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadSubmissions();
    }, [assignmentId]);

    async function loadSubmissions() {
        const data = await getAssignmentSubmissions(assignmentId);

        setSubmissions(data);

        const initialGrades: Record<number, string> = {};

        data.forEach((submission: Submission) => {
            initialGrades[submission.id] =
                submission.grade?.toString() ?? "";
        });

        setGrades(initialGrades);
    }

    async function saveGrade(submissionId: number) {
        await gradeSubmission(
            submissionId,
            Number(grades[submissionId])
        );

        setMessage("Grade updated successfully.");

        setTimeout(() => {
            setMessage("");
        }, 3000);

        loadSubmissions();
    }

    return (
        <div className="border rounded-xl p-5 shadow mt-5">
            <h2 className="text-xl font-bold mb-4">
                Student Submissions
            </h2>

            {message && (
                <p className="text-green-600 mb-4">
                    {message}
                </p>
            )}

            {submissions.map((submission) => (
                <div
                    key={submission.id}
                    className="border rounded-lg p-4 mb-4"
                >
                    <p>
                        <strong>Student ID:</strong>{" "}
                        {submission.student_id}
                    </p>

                    <p className="mt-2">
                        <strong>Submission:</strong>
                    </p>

                    <p>{submission.content}</p>

                    <div className="mt-4 flex items-center gap-3">
                        <input
                            type="number"
                            placeholder="Grade"
                            value={grades[submission.id] ?? ""}
                            onChange={(e) =>
                                setGrades({
                                    ...grades,
                                    [submission.id]: e.target.value
                                })
                            }
                            className="border rounded p-2 w-24"
                        />

                        <button
                            onClick={() => saveGrade(submission.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save Grade
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TeacherSubmissions;