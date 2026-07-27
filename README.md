# Centre Lead Tracker

## Overview

Centre Lead Tracker is a Full Stack web application developed to manage customer enquiries and follow-ups across multiple learning centres. The application helps staff create, manage, assign, and track leads from initial enquiry until conversion or closure.

This project was developed using React.js, Node.js, Express.js, and MySQL following REST API architecture.

---

# Features

- User Authentication
- Dashboard with Lead Statistics
- Create, View, Edit and Archive Leads
- Follow-up Management
- Lead Status Tracking
- Search & Filter Leads
- CSV Export
- Responsive UI
- Input Validation
- Duplicate Phone Number Prevention
- Bulk Status Update (Candidate Rule)

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS / Tailwind CSS

## Backend

- Node.js
- Express.js

## Database

- MySQL

---

# Project Structure

```
Centre-Lead-Tracker
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── config
│   └── package.json
│
├── database
│   ├── schema.sql
│   └── seed.sql
│
└── README.md
```

---

# System Architecture

```
React Frontend
      │
      ▼
Express REST API
      │
      ▼
MySQL Database
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/vaibhavibhaud04-prog/Centre-Lead-Tracker.git
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

# Environment Variables

Create a `.env` file inside the server folder.

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=centre_lead_tracker

JWT_SECRET=your_secret_key
```

---

# REST API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/login |
| POST | /api/auth/register |

## Leads

| Method | Endpoint |
|---------|----------|
| GET | /api/leads |
| POST | /api/leads |
| PUT | /api/leads/:id |
| DELETE | /api/leads/:id |

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard |

## Follow-ups

| Method | Endpoint |
|---------|----------|
| POST | /api/followups |
| GET | /api/followups/:leadId |

## Export

| Method | Endpoint |
|---------|----------|
| GET | /api/export/csv |

---

# Database Design

Main Tables

- Users
- Leads
- FollowUps

Lead Fields

- Parent Name
- Child Name
- Child Age
- Phone Number
- Email
- Preferred Centre
- Source
- Assigned Owner
- Lead Status
- Next Follow-up Date
- Notes

---

# Validation

- Required field validation
- Email validation
- Phone number validation
- Duplicate active phone number prevention
- Closed leads cannot be edited except Notes

---

# Decision Log

## Decision 1

**Issue**

Users may enter the same phone number in different formats.

**Assumption**

Phone numbers are normalized by removing spaces, +91, and leading zeros.

**Reason**

Prevents duplicate active leads.

---

## Decision 2

**Issue**

Should converted leads remain editable?

**Assumption**

Converted and Lost leads are treated as closed.

**Reason**

Maintains data integrity and follows assignment requirements.

---

## Decision 3

**Issue**

How should timestamps be exported?

**Assumption**

UI displays Asia/Kolkata time while CSV exports UTC (ISO 8601).

**Reason**

Maintains consistency and follows assignment requirements.

---

# Database Indexes

Indexes added on:

- Phone Number
- Lead Status
- Assigned Owner
- Next Follow-up Date

These indexes improve search and filtering performance.

---

# Testing

Basic automated tests include:

- Login API
- Lead Creation
- Lead Validation
- Duplicate Phone Validation
- Dashboard API

---

# Known Limitations

- No email notification integration.
- Role-based permissions can be enhanced.
- Limited analytics dashboard.

---

# Future Improvements

- Email & SMS notifications
- Calendar integration
- Advanced reports
- Real-time notifications
- Role-based access control
- Dark Mode

---

# AI Usage Note

AI Tool Used

- ChatGPT

Used For

- Requirement clarification
- README documentation
- Debugging
- Code explanation

Suggestion Rejected

Initially duplicate phone validation only compared raw values. The implementation was improved by normalizing phone numbers before comparison.

---

# Author

**Vaibhavi Bhaud**

B.Sc. Information Technology

Mumbai University

---

# GitHub Repository

https://github.com/vaibhavibhaud04-prog/Centre-Lead-Tracker