## Week 1 Task Breakdown

**Goal:** Set up the project foundation and complete authentication.

| Day | Person A | Person B | Shared Output |
|---|---|---|---|
| Day 1 | Create GitHub repo, set up `backend/` FastAPI structure, add `GET /health` route | Set up `frontend/` with React + TypeScript + Vite, install routing and API client setup | Repo has working frontend and backend folders |
| Day 2 | Configure PostgreSQL connection, SQLAlchemy base/session setup, create `User` model | Create frontend pages: Login, Register, Dashboard placeholder | Backend can connect to DB; frontend pages exist |
| Day 3 | Build `POST /auth/register`, password hashing, user validation | Build `POST /auth/login`, JWT creation, login response schema | Register and login APIs work locally |
| Day 4 | Create `GET /auth/me`, current-user dependency, protected route logic | Add frontend auth context, token storage, login/register API calls | Logged-in user can be identified from token |
| Day 5 | Integrate frontend Register page with backend register API | Integrate frontend Login page with backend login API and dashboard redirect | Full register/login flow works from UI |
| Day 6 | Write Postman tests for register and `/auth/me` | Write Postman tests for login and invalid credentials | Postman collection covers auth flow |
| Day 7 | Open PR for backend auth setup and review Person B’s frontend/JWT work | Open PR for frontend auth setup and review Person A’s backend/user model work | PRs reviewed, merged into `dev`, Week 1 README updated |

## Person A Responsibilities

| Area | Tasks |
|---|---|
| Backend | FastAPI setup, project structure, health route |
| Database | PostgreSQL connection, SQLAlchemy setup, `User` model |
| Auth | Registration endpoint, password hashing, `/auth/me`, current user dependency |
| Frontend | Register page API integration |
| Testing | Postman tests for register and `/auth/me` |
| GitHub | PR for backend foundation/auth, review Person B’s PR |

## Person B Responsibilities

| Area | Tasks |
|---|---|
| Frontend | React + TypeScript + Vite setup, routing, Login/Register/Dashboard pages |
| Backend | Login endpoint, JWT token generation, login schemas |
| Auth | Frontend auth context, token storage, dashboard redirect |
| Frontend Integration | Login page API integration |
| Testing | Postman tests for login and invalid credentials |
| GitHub | PR for frontend auth/JWT work, review Person A’s PR |

## Week 1 API Endpoints

```http
GET /health
POST /auth/register
POST /auth/login
GET /auth/me
```

## Important Rotation Note

Person A starts more backend-heavy, while Person B starts more frontend-heavy, but both write backend code in Week 1:

- Person A writes registration and current-user backend logic.
- Person B writes login and JWT backend logic.

Then both integrate frontend pages and review each other’s backend work.