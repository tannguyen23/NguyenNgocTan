# API Service Specification

## Overview

This document describes the design and requirements for a backend API service to update and maintain a real-time leaderboard for a website.

## Objectives

1. Maintain a leaderboard displaying the **top 10 users with the highest scores**.
2. Provide **real-time updates** to the leaderboard.
3. Allow users to **increase their score** after completing an action.
4. Handle score updates **securely**, preventing fraud.

---

## API Endpoints

### 1. Update Score

**Endpoint:** `/api/score/update`

**Method:** `POST`

**Description:** This API receives a request to update a user's score after they complete an action.

**Required Headers:**

- `Authorization: Bearer <token>` (Required for authentication and security, using JWT)

**Request Body:**

```json
{
  "user_id": "string",
  "increment": "integer",
  "timestamp": "ISO 8601 timestamp"
}
```

**Response:**

- `200 OK` – Score updated successfully.
- `400 Bad Request` – Invalid request data.
- `401 Unauthorized` – User is not authenticated.
- `403 Forbidden` – Request denied due to security restrictions.
- `500 Internal Server Error` – Server error.

---

### 2. Get Leaderboard

**Endpoint:** `/api/scoreboard`

**Method:** `GET`

**Description:** Returns the **top 10 users with the highest scores**.

**Response:**

```json
{
  "scoreboard": [
    {"user_id": "string", "score": "integer"},
    ...
  ]
}
```

**Response Codes:**

- `200 OK` – Data retrieved successfully.
- `500 Internal Server Error` – Server error.

---

## Security

1. **Authentication & Authorization:**

   - Use **JWT (JSON Web Token)** for user authentication.
   - Only authorized users can update scores.
   - Verify the token before processing any update requests.

2. **Data Integrity:**

   - Ensure score updates are based on **valid actions** by:
     - Verifying that the user's action is legitimate and recorded in the system.
     - Cross-checking the action with **transaction data or system logs** to prevent fraud.
     - Checking the execution time of the action to avoid duplicate requests or spam scoring.
     - Limiting the score increment based on the type of action performed.
   - Apply rate-limiting to prevent abuse and protect the system from automated attacks.
   - **Simple rate-limiting implementation:**
     - **Use Redis** to track the number of API requests per `user_id` or IP address.
     - **Set limits:** For example, allow **only 10 requests per minute**.
     - **Implementation approach:**
       - When receiving an API request, check Redis to see if the user has reached the limit.
       - If not, increase the request count and proceed with API processing.
       - If exceeded, return a `429 Too Many Requests` error.

3. **Real-Time Updates:**

   - Use **WebSockets** to push **real-time leaderboard updates**.
   - When a score update occurs, the backend **broadcasts a WebSocket signal** to all connected clients.
   - The client application **listens for WebSocket signals** and updates the leaderboard dynamically without requiring a page reload.
   - **WebSocket Security:** Ensure updates are only sent to authenticated clients.

---
