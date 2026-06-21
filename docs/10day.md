# 10 day plan

| Day | Goal | Person A Responsibilities | Person B Responsibilities | Shared Learning Objective |
| --- | --- | --- | --- | --- |
| Day 1 | Course database + API planning | Design `Course` model, course schemas, teacher-course relationship | Design `Enrollment` model, enrollment schemas, student-course relationship | Database relationships, foreign keys, API planning |
| Day 2 | Course APIs | Build `POST /courses`, `GET /courses/my-teaching`, teacher-only checks | Build `GET /courses`, `GET /courses/{id}`, response schemas | REST API design, role-based access |
| Day 3 | Enrollment APIs | Review/test course APIs, add course permission fixes | Build `POST /courses/{id}/enroll`, `DELETE /courses/{id}/enroll`, duplicate prevention | Many-to-many relationships, authorization |
| Day 4 | Course frontend | Build teacher course creation/list UI | Build student browse/enroll/enrolled courses UI | Frontend API integration, auth token usage |
| Day 5 | Assignment database + APIs | Design `Assignment` model, build `POST /courses/{id}/assignments` | Design `Submission` model, build `GET /courses/{id}/assignments` and `GET /assignments/{id}` | Nested resources, ownership checks |
| Day 6 | Submission APIs | Build teacher submission listing endpoint | Build student submission endpoint and `GET /submissions/me` | Enrolled-user checks, protected route testing |
| Day 7 | Grading + assignment frontend | Build `PATCH /submissions/{id}/grade`, teacher grading UI | Build student assignment list/submission UI | Full assignment workflow |
| Day 8 | Integration testing + bug fixing | Test backend APIs in Postman, fix backend issues | Test frontend flows, fix UI/API integration issues | End-to-end debugging |
| Day 9 | Deployment | Deploy backend to Render, connect Supabase PostgreSQL, configure CORS/env | Deploy frontend to Vercel, configure API base URL/env | Production deployment, environment variables |
| Day 10 | Final QA + docs | Write backend/deployment README, review frontend deployment | Write frontend/user-flow README, review backend deployment | Final polish, teamwork, PR review |



Class Notes
