Below is a 4-week LMS roadmap designed for **learning first**, not speed. The core idea is that both students rotate through backend, frontend, database, testing, Git workflow, and deployment so neither person becomes “the frontend person” or “the backend person.”

## Guiding Principles

Both members should touch every major layer:

- Backend: FastAPI routes, services, auth, validation, error handling
- Database: schema design, SQLAlchemy models, relationships, migrations
- Frontend: React pages, API integration, auth state, forms, dashboards
- Testing: Postman collections, backend tests, manual frontend testing
- GitHub: branches, pull requests, reviews, issue tracking
- Deployment: Vercel, Render, Supabase, environment variables

Work should be divided by **feature ownership**, not technical layer. For example, one member may own “Course Creation” end-to-end while the other owns “Enrollment” end-to-end, then they review each other.

---

# Feature Priority

## Build First: Core MVP

These are essential for a working LMS:

1. Project setup
2. User authentication
3. Role-based access control
4. Teacher/student dashboards
5. Course creation
6. Course listing
7. Course enrollment
8. Assignment creation
9. Assignment submission
10. Basic grading

## Stretch Goals

Leave these for after the MVP works:

1. File upload/download for materials
2. Comments/discussions
3. Rich dashboards with charts
4. Email notifications
5. Password reset
6. Advanced search/filtering
7. Admin role
8. Real-time discussion updates
9. Deployment polish and custom domains

Reason: authentication, roles, courses, enrollment, assignments, and grading teach the most important backend and database concepts. File uploads and discussions are useful, but they can slow the team down if attempted too early.

---

# Recommended Database Models

Start with these:

```text
User
- id
- name
- email
- hashed_password
- role: teacher | student
- created_at

Course
- id
- title
- description
- teacher_id -> User.id
- created_at

Enrollment
- id
- student_id -> User.id
- course_id -> Course.id
- enrolled_at

Assignment
- id
- course_id -> Course.id
- title
- description
- due_date
- created_at

Submission
- id
- assignment_id -> Assignment.id
- student_id -> User.id
- content
- file_url nullable
- grade nullable
- feedback nullable
- submitted_at

Material
- id
- course_id -> Course.id
- title
- file_url
- uploaded_at

Comment
- id
- course_id -> Course.id
- user_id -> User.id
- body
- created_at
```

For the MVP, you can delay `Material` and `Comment`.

---

# Git Branching Strategy

Use a simple industry-style workflow:

```text
main
  production-ready code only

dev
  integration branch for completed features

feature/auth-backend
feature/auth-frontend
feature/course-crud
feature/enrollment
feature/assignments
feature/grading
feature/deployment
```

## Rules

- No direct commits to `main`.
- All work happens in feature branches.
- Every feature branch opens a pull request into `dev`.
- At least one teammate must review each PR.
- Merge `dev` into `main` only at the end of each stable milestone.
- Use clear commit messages:

```text
feat: add JWT login endpoint
fix: prevent students from creating courses
docs: add Postman auth examples
test: add enrollment API tests
```

## Pull Request Checklist

Each PR should include:

- What feature was added
- API endpoints changed
- Database changes
- Screenshots if frontend changed
- Postman test proof or backend test result
- Reviewer comments resolved

---

# Code Review Responsibilities

Both members review each other every week.

## Member A reviews

- Member B’s backend route logic
- Database relationships
- Role checks
- API response shapes
- Error handling

## Member B reviews

- Member A’s SQLAlchemy models
- Frontend API integration
- Form validation
- Authentication flow
- Postman test coverage

Rotate the focus each week so both learn how to review backend, frontend, database, and tests.

---

# 4-Week Roadmap

| Week | Goal | Member A Responsibilities | Member B Responsibilities | Shared Learning Objectives |
|---|---|---|---|---|
| Week 1 | Project setup, database design, authentication | Set up FastAPI project structure, create `User` model, build registration endpoint, write Postman tests for register | Set up React + Vite app, design auth pages, create login endpoint with JWT, write Postman tests for login | FastAPI basics, SQLAlchemy models, PostgreSQL connection, JWT auth, Git branching, PR reviews |
| Week 2 | Role-based access, courses, enrollment | Build course creation/list/detail APIs, create teacher dashboard UI, review enrollment backend | Build enrollment APIs, create student course browsing UI, review course backend | REST API design, role-based permissions, foreign keys, many-to-many relationships, frontend API calls |
| Week 3 | Assignments, submissions, grading | Build assignment creation APIs and teacher assignment UI, review submission APIs | Build submission APIs and student submission UI, review assignment APIs | Nested resources, authorization rules, form handling, API error states, testing protected routes |
| Week 4 | Materials, comments, testing, deployment | Add material upload/download or grading polish, deploy backend to Render, review frontend deployment | Add comments/discussions or dashboard polish, deploy frontend to Vercel, review backend deployment | Deployment, environment variables, Supabase PostgreSQL, CORS, production debugging, final QA |

---

# Detailed Weekly Plan

## Week 1: Setup + Authentication

**Goal:** Build the foundation of the LMS.

**Difficulty:** Medium

Authentication is difficult enough to teach real backend concepts, but small enough to finish in one week.

### Backend Tasks

- Set up FastAPI project structure:

```text
backend/
  app/
    main.py
    database.py
    models/
    schemas/
    routes/
    services/
    auth/
```

- Configure PostgreSQL connection.
- Configure SQLAlchemy.
- Create password hashing with `passlib`.
- Create JWT access token generation.
- Add current user dependency.
- Add role enum: `teacher`, `student`.

### Database Tasks

Design and implement:

- `users` table
- unique email constraint
- role column
- password hash field
- timestamps

### Frontend Tasks

- Set up React + TypeScript + Vite.
- Create pages:
  - Register
  - Login
  - Basic dashboard redirect
- Store JWT securely enough for learning purposes.
- Add API client using `fetch` or `axios`.
- Add simple auth context.

### API Endpoints

```http
POST /auth/register
POST /auth/login
GET /auth/me
```

### Deliverables

- User can register as teacher or student.
- User can log in.
- JWT is returned.
- `/auth/me` returns the current user.
- Postman collection has auth requests.
- First PR review completed by both members.

### Suggested Rotation

Member A builds registration backend and user model.

Member B builds login backend and JWT handling.

Then switch:

- Member A integrates frontend login.
- Member B integrates frontend registration.

This prevents one person from owning only backend or frontend.

---

## Week 2: Courses + Enrollment

**Goal:** Teachers can create courses; students can enroll.

**Difficulty:** Medium

This week teaches REST resources, relationships, permissions, and frontend/backend integration.

### Backend Tasks

- Create course routes.
- Add role checks:
  - only teachers can create courses
  - students can view courses
  - students can enroll
- Add enrollment routes.
- Prevent duplicate enrollments.
- Prevent teachers from enrolling as students.

### Database Tasks

Design and implement:

- `courses` table
- `enrollments` table
- relationship between teachers and courses
- relationship between students and courses
- unique constraint on `student_id + course_id`

### Frontend Tasks

- Teacher dashboard:
  - create course form
  - list own courses
- Student dashboard:
  - browse available courses
  - enroll in course
  - view enrolled courses

### API Endpoints

```http
POST /courses
GET /courses
GET /courses/{course_id}
GET /courses/my-teaching
GET /courses/my-enrolled

POST /courses/{course_id}/enroll
DELETE /courses/{course_id}/enroll
```

### Deliverables

- Teacher can create a course.
- Student can view courses.
- Student can enroll in a course.
- Teacher can view their own courses.
- Student can view enrolled courses.
- Postman tests cover teacher/student permissions.

### Suggested Rotation

Member A owns course creation end-to-end.

Member B owns enrollment end-to-end.

Then each reviews the other’s backend and database design.

---

## Week 3: Assignments + Submissions + Grading

**Goal:** Teachers create assignments; students submit work; teachers grade.

**Difficulty:** Hard

This is the most important feature week because it combines authentication, roles, relationships, ownership checks, and multiple user workflows.

### Backend Tasks

- Assignment CRUD for teachers.
- Submission creation for students.
- Submission listing for teachers.
- Grading endpoint for teachers.
- Permission checks:
  - only course teacher can create assignments
  - only enrolled students can submit
  - only course teacher can grade
  - students can only see their own submissions

### Database Tasks

Design and implement:

- `assignments` table
- `submissions` table
- relationships:
  - course to assignments
  - assignment to submissions
  - student to submissions

### Frontend Tasks

- Teacher:
  - create assignment
  - view submissions
  - enter grade and feedback
- Student:
  - view assignments
  - submit assignment
  - view grade/feedback

### API Endpoints

```http
POST /courses/{course_id}/assignments
GET /courses/{course_id}/assignments
GET /assignments/{assignment_id}

POST /assignments/{assignment_id}/submissions
GET /assignments/{assignment_id}/submissions
GET /submissions/me
PATCH /submissions/{submission_id}/grade
```

### Deliverables

- Teacher can create assignments.
- Student can submit assignments.
- Teacher can grade submissions.
- Student can view their grade.
- Backend permission checks are tested.
- Frontend handles loading, success, and error states.

### Suggested Rotation

Member A builds assignment creation backend and frontend.

Member B builds submission backend and frontend.

Then switch for grading:

- Member A reviews and improves submission logic.
- Member B builds grading endpoint and teacher grading UI.

---

## Week 4: Polish + Stretch Features + Deployment

**Goal:** Make the LMS usable, tested, and deployed.

**Difficulty:** Hard

Deployment often reveals issues with CORS, environment variables, database URLs, and production configuration.

### Backend Tasks

- Add CORS config for deployed frontend.
- Add environment variable support.
- Add error response consistency.
- Add basic backend tests.
- Deploy FastAPI app to Render.
- Connect Render to Supabase PostgreSQL.

### Database Tasks

- Move database to Supabase.
- Confirm migrations or table creation process.
- Seed test users/courses if needed.
- Verify relationships in production DB.

### Frontend Tasks

- Deploy React app to Vercel.
- Configure production API URL.
- Improve dashboards.
- Add route protection.
- Add empty/loading/error states.
- Polish forms.

### Optional Stretch Features

Choose only one or two:

```http
POST /courses/{course_id}/materials
GET /courses/{course_id}/materials
GET /materials/{material_id}/download

POST /courses/{course_id}/comments
GET /courses/{course_id}/comments
DELETE /comments/{comment_id}
```

### Deliverables

- Frontend deployed on Vercel.
- Backend deployed on Render.
- Database hosted on Supabase.
- Deployed frontend can communicate with deployed backend.
- Final Postman collection completed.
- README includes setup and deployment instructions.

### Suggested Rotation

Member A handles backend deployment first.

Member B handles frontend deployment first.

Then switch:

- Member A reviews Vercel config and frontend environment variables.
- Member B reviews Render config, Supabase connection, and CORS.

---

# Full Phase Breakdown

| Phase | Backend Tasks | Database Tasks | Frontend Tasks | API Endpoints | Deliverables | Difficulty |
|---|---|---|---|---|---|---|
| Setup | Create FastAPI app, configure CORS, create project structure | Connect PostgreSQL, configure SQLAlchemy | Create Vite React app, routing structure | Health check: `GET /health` | Backend and frontend run locally | Easy |
| Auth | Register, login, JWT, password hashing, current user dependency | `users` table | Login/register pages, auth context | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` | Working auth flow | Medium |
| Roles | Teacher/student permissions | role field in `users` | Route protection by role | protected route dependencies | Role-based dashboard routing | Medium |
| Courses | Course CRUD, teacher ownership checks | `courses` table | Teacher course creation, course list | `POST /courses`, `GET /courses`, `GET /courses/{id}` | Teachers manage courses | Medium |
| Enrollment | Enroll/unenroll, duplicate prevention | `enrollments` table | Student browse/enroll UI | `POST /courses/{id}/enroll`, `DELETE /courses/{id}/enroll` | Students enroll in courses | Medium |
| Assignments | Create/list assignments | `assignments` table | Teacher assignment UI, student assignment list | `POST /courses/{id}/assignments`, `GET /courses/{id}/assignments` | Assignments work | Hard |
| Submissions | Submit work, list submissions | `submissions` table | Student submit UI, teacher submission view | `POST /assignments/{id}/submissions`, `GET /assignments/{id}/submissions` | Students submit work | Hard |
| Grading | Grade and feedback endpoint | grade/feedback fields | Teacher grading UI, student grade view | `PATCH /submissions/{id}/grade`, `GET /submissions/me` | Basic grading system | Hard |
| Materials | Upload/download files | `materials` table | Upload/download UI | `POST /courses/{id}/materials`, `GET /courses/{id}/materials` | Course materials | Stretch |
| Comments | Add discussion comments | `comments` table | Course discussion UI | `POST /courses/{id}/comments`, `GET /courses/{id}/comments` | Simple discussion board | Stretch |
| Deployment | Render config, env vars, production CORS | Supabase production DB | Vercel config, production API URL | all endpoints tested live | Deployed LMS | Hard |

---

# Equal Learning Task Rotation

Use this rotation pattern:

| Area | Week 1 | Week 2 | Week 3 | Week 4 |
|---|---|---|---|---|
| Backend route owner | A: register, B: login | A: courses, B: enrollment | A: assignments, B: submissions | A: deployment config, B: comments/materials |
| Database owner | A: users | B: enrollments | A: assignments, B: submissions | both production DB |
| Frontend owner | B: register, A: login | A: teacher dashboard, B: student dashboard | A: teacher assignment UI, B: student submission UI | both polish |
| Testing owner | B tests A’s auth | A tests B’s enrollment | each tests other’s feature | both test deployed app |
| PR reviewer | B reviews A | A reviews B | cross-review | cross-review |

This works because each member repeatedly experiences the full cycle:

```text
schema design -> backend endpoint -> frontend integration -> testing -> PR review
```

That is much better for learning than assigning one person to React and the other to FastAPI.

---

# Suggested Weekly Milestones

## End of Week 1

- Local frontend and backend running
- PostgreSQL connected
- User registration/login works
- JWT auth works
- GitHub repo has `main`, `dev`, and feature branches
- First PRs reviewed and merged

## End of Week 2

- Teachers can create courses
- Students can enroll
- Dashboards show different data by role
- Postman collection includes role-based tests

## End of Week 3

- Teachers can create assignments
- Students can submit assignments
- Teachers can grade submissions
- Students can view grades
- Most core LMS behavior works locally

## End of Week 4

- App deployed
- Supabase database connected
- README completed
- Postman collection finalized
- Stretch feature added only if MVP is stable

---

# Reasoning Behind the Work Allocation

The allocation is balanced by **learning value**, not file count.

For example, “course enrollment” may involve fewer UI files than “teacher dashboard,” but it teaches important backend concepts:

- many-to-many relationships
- duplicate prevention
- role-based access
- ownership checks
- database constraints
- API testing

Similarly, “grading” may look like a small feature, but it teaches authorization deeply because only the correct teacher should be able to grade a submission.

By rotating feature ownership, both students learn:

- how to design a schema
- how to write protected APIs
- how to consume APIs from React
- how to debug integration issues
- how to review another developer’s code
- how to deploy real software

That is exactly the right shape for a learning-focused LMS project.
