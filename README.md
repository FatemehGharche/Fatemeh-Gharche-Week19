# Contact App

A simple and elegant contact management application built with React.

## 🚀 Features

* Add, edit, delete contacts
* Bulk delete contacts
* Search contacts by name, last name, or email
* Form validation with Yup + react-hook-form
* Confirmation modals for critical actions
* Responsive and clean UI
* Reusable contact form component

## 🛠 Tech Stack

* React
* React Context API + useReducer
* react-hook-form
* Yup
* UUID (for unique contact IDs)
* CSS Modules

## 📦 Installation

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactForm.jsx
│   ├── ContactForm.module.css
│   ├── ContactItem.jsx
│   ├── ContactItem.module.css
│   ├── ContactList.jsx
│   ├── ContactList.module.css
|   ├── InputField.jsx
│   ├── InputField.module.css
│   ├── Modal.jsx
│   ├── Modal.module.css
│   ├── SearchBar.jsx
│   └── SearchBar.module.css
├── context/
│   └── ContactContext.jsx
├── App.jsx
└── index.jsx
```

## 📌 Notes

* Designed as part of Botostart Bootcamp, Azar 1403 Series.
* Developed in Week 18–19 curriculum.
* Built using Vite for fast development.
