# Artistry Alley API 🎨  
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-blue)](https://www.mongodb.com/)  
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)  

A Web portfolio and art commerce API developed by Raimundo Monzon and Guillermo Iribarne as a project for "Programacion 3" class at UTN-INSPT. This production-ready REST API powers **Artistry Alley**, a virtual 3D gallery for artists and curators to showcase exhibitions and artworks. Built with the MERN stack.  

🔗 **Live Demo**: [https://artistry-alley.vercel.app](https://artistry-alley.vercel.app)  
🔗 **3D Frontend Client (Under Development)**: [Separate Repository](https://github.com/RaimundoMonzon/Artistry-Alley-FrontEnd) (WebGL/Three.js) 

---

## 📋 Table of Contents  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [API Documentation](#-api-documentation)  
- [Installation](#-installation)
- [Authentication](#-authentication)  
- [Deployment](#-deployment)  
- [License](#-license)  
- [Contact](#-contact)  

---

## 🚀 Features  
- **Exhibition Management**: Create, curate, and display virtual art exhibitions.  
- **User Roles**: Artists, Curators, and Visitors with tailored permissions.  
- **Mercado Pago Integration**: Secure payment processing for artwork purchases.  
- **Transactional Emails**: SendGrid for purchase confirmations and artist notifications.  
- **Cart System**: Cookie-based temporary cart with timeout.  
- **3D-Ready**: Optimized for integration with WebGL/Three.js frontends.  

---

## 🛠 Tech Stack  
- **Backend**:  
  - Node.js + Express  
  - MongoDB Atlas (Cloud Database)  
  - Mongoose (ODM)  
- **Authentication**:  
  - JWT (JSON Web Tokens)  
  - Bcrypt (Password Hashing)  
- **Payments**:  
  - Mercado Pago API  
- **Emails**:  
  - SendGrid (Transactional emails)  
- **Utilities**:  
  - Express Cookie-Parser (Cart management)  

---

## 📚 API Documentation  
[![Postman](https://img.shields.io/badge/Postman-API_Docs-orange)](https://documenter.getpostman.com/view/39313892/2sAY4ydLKq)  

### Key Endpoints  
| Endpoint                | Method | Description                          |  
|-------------------------|--------|--------------------------------------|  
| `/api/exhibitions`      | GET    | Fetch all exhibitions                |  
| `/api/artworks`         | POST   | Upload new artwork                   |  
| `/api/payments/checkout`| POST   | Process payments via Mercado Pago    |  
| `/api/contact`          | POST   | Contact artists (SendGrid emails)    |  

📌 **Full Details**: [Postman Documentation](https://documenter.getpostman.com/view/39313892/2sAY4ydLKq)  

---

## 📥 Installation  
1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/WillIribarne/artistry-alley.git  
   cd artistry-alley  
   ```  

2. **Install Dependencies**:  
   ```bash  
   npm install  
   ```  

3. **Set Up Environment Variables**:  
   Create a `.env` file:  
   ```env  
   PORT=3000  
   SECRETKEY=your_JWT_secret_key 
   DB_USER=your_MongoDB_user
   TOKEN_TIMEOUT=4h                       # JWT expiration  
   CART_TIMEOUT=2h                        # Cart cookie expiration  
   SENDGRID_API_KEY=your_sendgrid_key
   SENDGRID_VERIFIED_SENDER=your-email-address@some-domain.com  
   MP_ACCESS_TOKEN=your_MP_access_token
   ```  

4. **Run the Server**:  
   ```bash  
   npm start  
   ```  

## 🔒 Authentication & Security  
- **JWT Tokens**: Pass tokens in the `Authorization` header.  
  ```  
  Authorization: Bearer <token>  
  ```  
- **Cookies**: Cart data stored in encrypted cookies with a 2-hour timeout.  
- **Password Hashing**: Bcrypt for secure user credentials.  

---

## 🚀 Deployment  
Deployed on Vercel with MongoDB Atlas.  

### Steps to Deploy:  
1. **MongoDB Atlas**:  
   - Create a cluster and whitelist Vercel’s IP ranges.  
2. **Vercel**:  
   - Link your GitHub repository.  
   - Set environment variables in the Vercel dashboard.  
   - Deploy!  

---

## 📜 License  
MIT License. See `LICENSE` for details.  

---

## 📬 Contact  
- **Developers**:  
  - Raimundo Monzón: [GitHub](https://github.com/RaimundoMonzon)  
  - Guillermo Iribarne: [GitHub](https://github.com/WillIribarne)  
- **Supervisor**: Carlos E. Cimino - [Website](https://charlycimino.com/)  

---
