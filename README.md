<h1 align="center">
  🚀 XFOLIO – Instant Portfolio Builder
</h1>

<p align="center">
  Effortlessly generate a professional, responsive portfolio or resume with a simple form-based UI. No coding required!
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

<p align="center">
  <strong>🔗 Live Demo:</strong> <em>Coming Soon...</em>
</p>

---

## 📦 About The Project

*XFOLIO* is a full-stack, responsive portfolio builder designed to help you create a stunning online presence in minutes. Built with *React* and *MongoDB*, it provides a seamless experience for generating professional portfolios and resumes. Simply fill out a form, choose a template, and your personalized site is ready to share.

You can preview your site in real-time, share it with a QR code, and export the final version as a *PDF* document, a traditional *resume, or a static **ZIP* bundle for easy hosting.

---

## ✨ Key Features

* *Multiple Templates:* Choose from a variety of sleek, modern templates to match your personal style.
* *Real-time Preview:* Instantly see how your portfolio looks as you add or edit information.
* *Section-Based UI:* Easily populate standard portfolio sections:
    * ✅ About Me
    * ✅ Skills
    * ✅ Experience
    * ✅ Projects
    * ✅ Education
    * ✅ Contact Info
* *Responsive Design:* Looks great on all devices, from mobile phones to desktops.
* *Light/Dark Mode:* A built-in theme toggle for comfortable viewing.
* *Multiple Export & Sharing Options:*
    * 📄 Download your visual portfolio as a *PDF* (via jsPDF).
    * 📝 *Download Resume:* Generate and download a classic, professional resume.
    * 🗂 Export as a static *ZIP* bundle for hosting anywhere (via jsZip).
    * 🔗 *QR Code Sharing:* Instantly generate a QR code to share a link to your portfolio (via jsZip).
* *Persistent Storage:* Your data is securely stored in a MongoDB database.

---

## 🔧 Tech Stack

Our project uses the MERN stack along with other modern libraries to deliver a seamless user experience.

| Purpose | Technology |
| :--- | :--- |
| *Frontend* | React.js, HTML5, CSS3 |
| *Backend* | Node.js, Express |
| *Database* | MongoDB (with Mongoose) |
| *PDF & Resume Export* | jsPDF |
| *ZIP Bundling & QR Sharing*| jsZip |

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* [Node.js](https://nodejs.org/) (which includes npm)

### Installation & Setup

1.  *Clone the Repository*
    ```bash
    git clone https://github.com/Yagami-light45/XFolio-Porfolio-Builder.git

    cd Instant-Portfolio-Builder-Web-App
    

2.  *Setup the Backend*
    ```bash
    cd backend

    npm install
    
    Create a .env file in the backend directory and add your environment variables:
    env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    

3.  *Setup the Frontend*
    ```bash
    cd ..

    npm install
    

4.  *Run the Development Servers*
    * To start the *Backend Server* (runs on http://localhost:5000):
        ```bash
        node server.js
        
    * To start the *Frontend Development Server* (runs on http://localhost:3000 or another port):
        ```bash
        npm start
        

---

## 👥 Meet the Team

This project was developed by a passionate team of developers under the guidance of our mentor.

* *Mentor:* Satwik
 
* *Team Members:*
    * Aryan Chaturvedi
    * Harshith Pasupuleti
    * K.A. Karthik Reddy
    * S. Chakradhar Reddy

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are *greatly appreciated*.

Found a bug or have a feature request? Please *[open an issue](https://github.com/Yagami-light45/Instant-Portfolio-Builder-Web-App/issues)* to discuss it.

If you wish to contribute code:
1.  *Fork* the Project
2.  Create your Feature Branch (git checkout -b feature/AmazingFeature)
3.  Commit your Changes (git commit -m 'Add some AmazingFeature')
4.  Push to the Branch (git push origin feature/AmazingFeature)
5.  Open a *Pull Request*

Don't forget to give the project a star! Thanks again!