import api from "./axios";

export async function getAssignmentSubmissions(assignmentId: number) {
    const token = localStorage.getItem("token");

    const response = await api.get(
        `/assignments/${assignmentId}/submissions`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function gradeSubmission(
    submissionId: number,
    grade: number
) {
    const token = localStorage.getItem("token");

    const response = await api.patch(
        `/submissions/${submissionId}/grade`,
        { grade },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function submitAssignment(
    assignmentId: number,
    content: string
) {
    const token = localStorage.getItem("token");

    const response = await api.post(
        `/assignments/${assignmentId}/submit`,
        {
            content
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function getMySubmissions() {
    const token = localStorage.getItem("token");

    const response = await api.get(
        "/submissions/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}