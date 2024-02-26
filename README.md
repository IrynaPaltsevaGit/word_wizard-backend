# Project Title
WordWizard UA-ENG

## Overview

WordWizard UA-ENG – your go-to application for mastering English vocabulary through intuitive and engaging word cards. This app is specifically designed for Ukrainians seeking an effective and personalized way to enhance their English language skills. Whether you're a beginner or looking to expand your existing vocabulary, WordWizard UA-ENG provides a tailored and user-friendly experience.

### Problem

A significant number of Ukrainians arriving in Canada lack English proficiency, hindering their communication, integration, and access to opportunities. Limited English vocabulary impedes everyday conversations, making it difficult for newcomers to express themselves and comprehend others. Existing language apps don't cater specifically to their needs, making the language learning journey less effective and engaging.

## User Profile

- Ukrainian Learners of English:
  - Individuals with varying proficiency levels in English
  - Those aiming to expand their English vocabulary in a targeted manner
  - Users seeking an intuitive and visually appealing learning experience

## Implementation

### Tech Stack

- React
- MySQL
- Express
- SASS
  
- Server libraries:
    - knex
    - express
    - cors
    - jsonwebtoken
    - dotenv
    - mysql2

### APIs
- An external Google API used to translate words from English to Ukrainian

### Data

![](sql-diagram.png)

### Endpoints

**POST /auth/signup**

- Add a user account

Parameters:
- nickname: User's nickname as a string
- email: User's email as a string
- password: User's provided password as a password

Response:
```
{
  "id": 20,
  "nickname": "NiceGuy",
  "email": "alex@google.com",
  "password": "asdff1234",
  "created_at": "2024-02-26T03:06:09.000Z",
  "updated_at": "2024-02-26T03:06:09.000Z"
}
```

**POST /auth/login**

- Login a user

Parameters:
- email: User's email as a string
- password: User's provided password as a password
- token: JWT used to add "visited" boolean

Response:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsIm5pY2tuYW1lIjoiYWNvdyIsImlhdCI6MTcwODkxNjg5NX0.tPql260kdtPa98A9OwYEo6R0CKakBrD20jsSqOZUZ7U",
  "user": {
    "id": 20,
    "nickname": "NiceGuy",
    "email": "alex@google.com",
    "password": "asdff1234",
    "created_at": "2024-02-26T03:06:09.000Z",
    "updated_at": "2024-02-26T03:06:09.000Z"
  }
```

**POST /auth/profile**

- Check, if a user is loged in

Parameters:
- email: User's email as a string
- password: User's provided password as a password
- token: JWT used to add "visited" boolean

Response:
```
{
    "id": 1, 
    "nickname": 'Alex', 
    "iat": 1708918766
  }
```

**GET /vocabulary**

- When the user is logged in, get all the word cards with progress < 20 created for this user

Parameters:
- id: User id as number
- token: JWT used to add "visited" boolean
- limit: limit of words fetched as a number

Response:
```
[
    {
        "id": 1,
        "word": "Hello",
        "translation": "Привіт",        
        "date": "2024-01-01 10:10:10"
        "progress": 5,
        "notes": "This word is very popular",
    },
    ...
]
```

**POST /vocabulary/new**

- Logged in user can add new word to the vocabulary

Parameters:
- id: User id as number
- word: New word as a string
- translation: Word translation from external API as a string
- notes: User's notes as a string
- token: JWT used to add "visited" boolean

Response:
```
[
    {
        "id": 87,
        "user_id": 1,
        "word": "hello",
        "translation": "привіт",
        "progress": 0,
        "notes": "This word is very popular",
        "created_at": "2024-02-26T03:12:33.000Z",
        "updated_at": "2024-02-26T03:12:33.000Z"
    },
    ...
]
```
**DELETE /vocabulary/:id**

- Logged in user can delete any word from the vocabulary

Parameters:
- id: User id as number
- word: id of the word as a number
- token: JWT used to add "visited" boolean

Response:
```
[
    {
        "success": "true"       
    },
    ...
]
```

**GET /trainings**

- Logged in user can have access to various trainings.

Parameters:
- id: User id as number
- word: word as a string
- translation: translation as a string
- progress: number as a number
- number of items fetched (depends on a training, varies between 10 and 40 items) as a number
- token: JWT used to add "visited" boolean

Response:
```
[
    {
        "word": "Hello",
        "translation": "Привіт",
        "progress": "5"
    },
    ...
]
```
**PUT /trainings/progress**

- After each training the progress of words are updated.

Parameters:
- id: User id as number
- word_id: Word id as a nubmer
- progress: number as a number
- token: JWT used to add "visited" boolean

Response:
```
[
    {
        "success": "true"       
    },
    ...
]
```

### Auth

- JWT auth
    - Added after core features have first been implemented
    - Store JWT in sessionStorage, remove when a user closes a tab

## Roadmap

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 30 sample word cards for 1 user

- Deploy client and server projects so all commits will be reflected in production

  -Features:
    - Create POST /vocabulary/new endpoint 
    - Add rating system, calculated for user automatically
    - Create GET /vocabulary endpoint
    - Create DELETE /vocabulary/:id endpoint
    - Create GET /trainings endpoint
    - Fetch no more than limit(sent by user) words using GET /trainings endpoint and rating system
    - Create POST /auth/profile endpoint to check if user is loged in
    - Create POST /auth/signup endpoint

- Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in session storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves
- Forgot password functionality
- Ability to edit translation

