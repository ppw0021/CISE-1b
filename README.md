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

## Gallery

![Log in](https://github.com/user-attachments/assets/8db728f1-bac1-496a-85a2-aee8694e8cd8)

![Register](https://github.com/user-attachments/assets/4794186c-d61c-4183-b8df-aa41a4355efa)

![Browse](https://github.com/user-attachments/assets/eb1693c7-be4d-47c7-bb60-15b545fac9de)

![Search](https://github.com/user-attachments/assets/209ed552-7972-456d-acfc-29e08578d698)

![Mod](https://github.com/user-attachments/assets/ba38b3b2-c32e-4eb4-a71b-296e6af76dd1)

![Submit](https://github.com/user-attachments/assets/bfd753f2-d033-4dbd-b737-810fb84ec262)
