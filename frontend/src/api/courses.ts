import api from "./axios";

export interface CourseData {
    title: string;
    description: string;
}

export const createCourse = (course: CourseData) => {
    const token = localStorage.getItem("token");

    return api.post("/courses", course, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getMyCourses = () => {
    const token = localStorage.getItem("token");

    return api.get("/courses/my-teaching", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateCourse = (
    id: number,
    course: CourseData
) => {
    const token = localStorage.getItem("token");

    return api.put(`/courses/${id}`, course, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const deleteCourse = (id: number) => {
    const token = localStorage.getItem("token");

    return api.delete(`/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const getAllCourses = () => {
    return api.get("/courses");
};

export const getMyEnrollments = () => {
    const token = localStorage.getItem("token");

    return api.get("/courses/my-enrollments", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const enrollCourse = (courseId: number) => {
    const token = localStorage.getItem("token");

    return api.post(
        `/courses/${courseId}/enroll`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const unenrollCourse = (courseId: number) => {
    const token = localStorage.getItem("token");

    return api.delete(
        `/courses/${courseId}/enroll`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};