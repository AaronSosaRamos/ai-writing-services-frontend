# AI Writing Services Frontend

**AI Writing Services Frontend** is a web application that offers five advanced writing services: **Spelling Check**, **Writing Enhancement**, **Addition of Connectors**, **Textual Tone Shifts**, and **Plagiarism Check**. The frontend interacts with the backend API to deliver these services in a user-friendly interface. It’s built using **NextJS** with modern web technologies to ensure optimal performance and responsiveness.

Developed by **Wilfredo Aaron Sosa Ramos**, the project is designed to handle complex writing tasks through integration with AI models, ensuring high-quality results for users. The application is deployed on **Vercel** and integrates smoothly with a backend API to offer these writing services.

## Table of Contents

- [1. Features](#1-features)
- [2. Writing Services](#2-writing-services)
- [3. Technologies Used](#3-technologies-used)
- [4. Environment Variables](#4-environment-variables)
- [5. Installation Guide](#5-installation-guide)
- [6. How to Use](#6-how-to-use)

---

## 1. Features

**AI Writing Services Frontend** provides a comprehensive set of features, enabling users to enhance and improve their writing through advanced AI-driven tools. The key features include:

- **Spelling Check**: Detect and correct spelling errors within the user-provided text.
- **Writing Enhancement**: Improve sentence structure, grammar, and the overall flow of writing.
- **Addition of Connectors**: Automatically insert appropriate connectors to improve the cohesion and flow between paragraphs or sentences.
- **Textual Tone Shifts**: Adjust the tone of the text based on the user's needs (e.g., shift from formal to informal or vice versa).
- **Plagiarism Check**: Verify the originality of the content by checking for duplicate content across a vast database.

Each of these features is available through a clean and responsive interface, making the writing services accessible to a wide range of users, from students to professionals.

---

## 2. Writing Services

The **AI Writing Services Frontend** offers the following five writing services, designed to improve the quality and accuracy of written content:

- **Spelling Check**: Allows users to paste or type their text into the editor and checks for spelling errors, offering suggestions for corrections.
  
- **Writing Enhancement**: This service reviews the user's text and suggests improvements in grammar, sentence structure, and style. It is ideal for polishing essays, reports, and professional writing.

- **Addition of Connectors**: Enhances the coherence of a document by inserting logical connectors (e.g., "therefore", "however", "moreover"). This feature helps improve the flow of ideas in the text.

- **Textual Tone Shifts**: The user can specify whether they want to change the tone of the text, such as making it more formal or informal. This service is helpful for tailoring content to different audiences or situations.

- **Plagiarism Check**: Ensures that the content is original by checking for any plagiarized material across a large dataset. This is especially useful for students, researchers, and professionals submitting original work.

Each of these services can be accessed via simple form inputs, and the results are displayed dynamically in the application.

---

## 3. Technologies Used

**AI Writing Services Frontend** is built with a robust set of web technologies to ensure reliability, performance, and ease of use:

- **NextJS**: A powerful React framework used for server-side rendering, ensuring fast performance and SEO optimization.
- **ShadCN**: Provides reusable components and design patterns, ensuring a clean and responsive user interface.
- **axios**: A promise-based HTTP client for making API requests to the backend, enabling seamless interaction with the writing services API.
- **react-markdown**: Allows for rendering markdown content in the application, useful for displaying formatted text and content previews.
- **zod**: A TypeScript-first schema declaration and validation library, integrated with **react-hook-form** to ensure input validation across forms.
- **react-hook-form**: A library used to manage form validation and input handling efficiently within React components.
- **@hookform/resolvers**: A utility that connects **zod** with **react-hook-form**, ensuring seamless validation of user input.
- **react-toastify**: A library used to display notifications, providing feedback to the user when tasks such as submissions or checks are completed.

These technologies ensure that the frontend is scalable, performant, and user-friendly, providing a smooth experience for writing tasks.

---

## 4. Environment Variables

The **AI Writing Services Frontend** requires the following environment variables for its integration with the backend API:

- **REACT_APP_API_BASE_URL**: The base URL of the backend API that the frontend communicates with for accessing the writing services.
  
- **REACT_APP_API_KEY**: The API key used to authenticate requests to the backend, ensuring secure communication between the frontend and backend.

These environment variables must be set up correctly for the application to function. An example of the `.env.local` file:

```env
REACT_APP_API_BASE_URL=https://api.aiwritingservices.com
REACT_APP_API_KEY=your_api_key_here
```


Make sure to replace `your_api_key_here` with the actual API key provided by the backend service.

---

## 5. Installation Guide

Follow these steps to set up and run **AI Writing Services Frontend** locally:

1. **Clone the repository**:
   - Download the repository to your local machine using the following command:
     ```
     git clone https://github.com/yourusername/AIWritingServicesFrontend.git
     ```

2. **Navigate to the project directory**:
   - Enter the project folder:
     ```
     cd AIWritingServicesFrontend
     ```

3. **Install dependencies**:
   - Use npm or yarn to install the necessary packages:
     ```
     npm install
     ```

4. **Set up environment variables**:
   - Create a `.env.local` file in the root directory of the project and configure the necessary environment variables:
     ```
     REACT_APP_API_BASE_URL=https://api.aiwritingservices.com
     REACT_APP_API_KEY=your_api_key_here
     ```

5. **Run the development server**:
   - Start the application locally:
     ```
     npm run dev
     ```

6. **Build for production**:
   - To build the application for production deployment:
     ```
     npm run build
     ```

7. **Deploy**:
   - The project is deployed on **Vercel**. For custom deployment, push your code to a repository connected to Vercel or follow Vercel’s deployment instructions.

---

## 6. How to Use

Once you have set up the **AI Writing Services Frontend**, you can use the application as follows:

1. **Accessing Writing Services**:
   - Choose from one of the five services (Spelling Check, Writing Enhancement, Addition of Connectors, Textual Tone Shifts, or Plagiarism Check) from the home page or navigation menu.

2. **Submitting Text**:
   - Input your text into the designated form field. Depending on the selected service, you will be prompted to either paste text, upload a file, or type directly into the form.

3. **Receiving Feedback**:
   - Once submitted, the application sends the request to the backend API, which processes the data and returns a JSON response. The result is displayed in the application interface, and feedback is provided through **react-toastify** notifications.

4. **Adjusting Tone or Connectors**:
   - For services like Textual Tone Shifts or Addition of Connectors, users can adjust specific parameters before submission (e.g., selecting the tone they wish to shift to or requesting additional connectors).

5. **Notifications and Errors**:
   - The application will display real-time notifications of success or errors using **react-toastify**, ensuring users are informed of the status of their submissions.

This user-friendly interface allows seamless interaction with the backend services, offering immediate feedback and results for writing tasks.
