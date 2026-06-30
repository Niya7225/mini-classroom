import api from "./axios";

export const getCourseAssignments = (
    courseId: number
) => {
    const token = localStorage.getItem("token");

    return api.get(
        `/courses/${courseId}/assignments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};