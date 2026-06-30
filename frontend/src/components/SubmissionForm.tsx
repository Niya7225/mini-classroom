import { useState } from "react";
import { submitAssignment } from "../api/submission";

interface Props {
    assignmentId: number;
    onSubmitSuccess?: () => void;
}

function SubmissionForm({
    assignmentId,
    onSubmitSuccess,
}: Props) {
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    async function handleSubmit() {
        if (!content.trim()) {
            setMessage("Submission cannot be empty.");
            return;
        }

        try {
            setLoading(true);

            await submitAssignment(
                assignmentId,
                content
            );

            setMessage(
                "Assignment submitted successfully."
            );

            setContent("");

            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } catch (error: any) {
            if (error.response?.data?.detail) {
                setMessage(
                    error.response.data.detail
                );
            } else {
                setMessage(
                    "Failed to submit assignment."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
            <div className="mt-4">
                {message && (
                <p
                 className={`mb-2 ${
                     isError
                        ? "text-red-600"
                        : "text-green-600"
                 }`}
                 >
                        {message}
                </p>
            )}

            <textarea
                className="border rounded w-full p-2 mb-3"
                rows={4}
                placeholder="Enter your submission..."
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading
                    ? "Submitting..."
                    : "Submit Assignment"}
            </button>
        </div>
    );
}

export default SubmissionForm;