# SPEED Application

## Overview
SPEED is a project created as part of the *Contemporary Issues in Software Engineering* paper. The application is designed to serve as an intuitive platform for engineering students to discover, evaluate, and moderate learning resources. The project was developed using the **MNNN stack** (**MongoDB, NestJS, NextJS, and Node.js**) and deployed through automated **GitHub Actions** to **Vercel** for seamless continuous integration and delivery.

## Features
- **User-friendly interface** to view, search, and manage learning resources.
- **Role-based access control (RBAC)** to ensure appropriate privileges.
- **Rating system** to allow users to evaluate content quality.
- **Moderation and approval workflows** for user-submitted content.
- **Secure authentication** using hashed passwords and session tokens.
- **Automated deployment** via **GitHub Actions**.
- **Fully responsive design** for accessibility on different devices.

---

## User Roles
The platform includes four standard user roles, each with specific permissions:

1. **Standard User**
   - View approved articles.
   - Search for resources.
   - Submit articles for review.

2. **Moderator**
   - Moderate articles submitted by users.
   - Accept or reject content based on platform guidelines.

3. **Analyst**
   - Review and approve user-submitted content.
   - Assign categories to approved articles.

4. **Administrator**
   - Has full access to all features.
   - Manage user privileges and roles.
   - Oversee moderation and analytical processes.

---

## Application Structure
### **Backend** (NestJS)
The backend is a **NestJS API** that:
- Handles requests from the frontend.
- Communicates with the **MongoDB** database to store and retrieve information.
- Uses **secure password hashing** for authentication.
- Issues **hashed session tokens** for user authentication, stored as cookies for session continuity.
- Enforces **role-based access control (RBAC)** to restrict access based on user roles.

### **Frontend** (NextJS & React)
The frontend is built using **NextJS** and **TypeScript**, leveraging the **React** library for UI components. Features include:
- A clean, responsive user interface with smooth navigation.
- **Dynamic toolbar** that updates based on user privileges.
- **Seamless user experience** with intuitive page transitions.
- Secure communication with the backend API for user authentication and data retrieval.

---

## Deployment & CI/CD
The application follows a **CI/CD pipeline** using **GitHub Actions**:
1. Code changes are pushed to the repository.
2. **Automated testing** ensures code integrity.
3. If tests pass, the application is **automatically deployed** to Vercel.
4. Users receive **seamless updates** without downtime.

---
