# Note-taking-App 

Personal note-taking app built with **React**, **Tailwind CSS**, and **Firebase Auth**.  
Features include **user registration, login, password reset, and private note management**.  
Utilizes modern JavaScript (**ES6+**), **React Hook Form**, and **TanStack Query/Mutation hooks** for efficient state and data handling.

🔗 [GitHub Projesi](https://github.com/MuhammedZeki/Note-taking-App)

---

## 📑 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [User Management](#user-management)
  - [Sign Up](#sign-up)
  - [Log In](#log-in)
  - [Password Reset](#password-reset)
- [Admin Panel Access](#admin-panel-access)
- [Developer](#developer)

---

## ✨ Features

- User registration and login (Firebase Auth)
- Password reset / Forgot password functionality
- Add, edit, and delete personal notes
- User-specific notes (each user can only see their own notes)
- Form handling and validation using React Hook Form
- State and data management with TanStack Query / Mutation hooks
- Responsive design for mobile and desktop (Tailwind CSS)
- Built with modern JavaScript (ES6+)


---

## 🧰 Technologies Used

- [React](https://reactjs.org/) – Frontend library for building UI
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Firebase Authentication](https://firebase.google.com/docs/auth) – User authentication (email/password, password reset)
- [React Hook Form](https://react-hook-form.com/) – Form handling and validation
- [TanStack Query / Mutation](https://tanstack.com/query/latest) – Efficient state and data management
- Modern JavaScript (ES6+) – Clean and modular coding


---

## ⚙️ Installation

1. Clone this repository:

```bash
git clone https://github.com/MuhammedZeki/Note-taking-App.git
cd Note-taking-App
```

2. Install the required packages:


```bash
npm install
```

3. Define environment variables in a `.env.local` file (example file can be provided):

```env
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

4. Uygulamayı başlatın:

```bash
npm run dev
```

---

## 🧪 Usage

- On the main page, view your personal notes.
- Add new notes, edit existing ones, or delete notes you no longer need.
- Each user can only see their own notes after logging in.
- Use the password reset feature if you forget your password.
- Changes are updated in real-time and synced with Firebase.


---

## 🔐 Test Login

To access the admin panel:

📍 `http://localhost:5173/sign-in`  
🧑 **Email:** `info@noteapp.com.tr`  
🔑 **Password:** `Info123$`

> ⚠️ These credentials are for development purposes only. Make sure to change them in production for security!
---

## 👨‍💻 Developer

**Muhammed Zeki**  
🔗 [My GitHub Profile](https://github.com/MuhammedZeki)

