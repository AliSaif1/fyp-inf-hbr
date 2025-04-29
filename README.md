# Influencer Harbor

Influencer Harbor is a full-stack web and mobile application designed to connect brands with influencers for smooth collaboration, marketing campaigns, and analytics. It acts as a centralized platform where influencers can promote their services, and brands can initiate, manage, and track influencer campaigns efficiently.

---

## 🚀 Project Overview

Influencer Harbor bridges the gap between **influencers**, **brands**, and **audiences**.

It allows **brands** to:
- Hire influencers
- Launch marketing campaigns
- Analyze campaign effectiveness
- Manage contracts and reports

**Influencers** can:
- Join brand campaigns
- Share content
- Track engagement
- Withdraw earnings

**Users** can:
- Follow blogs and influencer pages
- Join interest-based groups
- Interact with posts (like, comment, share)
- Ask reviews through messages

---

## 📱 Platform

- **Mobile App**: Built with React Native
- **Web Admin Panel**: Built with React.js (MERN Stack)
- **Back-end**: Node.js + Express
- **Database**: Firebase Firestore + MongoDB

---

## 🔑 Core Functionalities

### 👤 Authentication & User Management
- Sign Up, Sign In
- Forgot Password, Email OTP Verification
- Profile Management
- Two-Factor Authentication

### 🧑‍🤝‍🧑 Group and Page Features
- Create Groups & Blog Pages
- Join Groups, Follow Pages
- Add Group Members
- Interact with Posts: Like, Comment, Share
- View News Feed (All Blogs)

### 📢 Influencer and Brand Module
- Invite Influencers, Accept/Reject Campaigns
- Initiate & Track Contracts
- Request and View Reports
- Campaign Analytics Dashboard

### 💼 Campaign Management
- Create Campaigns
- Assign Influencers
- Send and Accept Job Requests
- Modify and Cancel Contracts

### 💬 Messaging & Notifications
- Group and Private Messaging
- Real-time Notifications

### 💰 Payment System
- Add Payment Method
- Withdraw Earnings
- Pay Influencers
- Payment Confirmation Flow

### 🛠 Help Desk
- Report Query
- Modify and Resolve Query

---

## 🧠 Technologies Used

| Layer | Tech Stack |
|------|-------------|
| **Frontend (Web)** | React.js, Tailwind CSS |
| **Frontend (Mobile)** | React Native |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (for campaigns, payments users, auth, messaging) |
| **Authentication** | JWT Auth |
| **Notifications** | Sockets |
| **ML Module** | Python (Predict engagement rate using follower count, post likes, comments, etc.) |

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js
- npm or yarn
- MongoDB running locally or cloud (e.g., MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/influencer-harbor.git
cd influencer-harbor
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the necessary variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_API_KEY=your_firebase_api_key
# Add any other required configs
```

### 4. Run the Server

```bash
npm run dev
```

### 5. Run the Mobile App (React Native)

Follow React Native setup instructions for your environment:
```bash
cd mobile
npm install
npx react-native run-android
# or
npx react-native run-ios
```

---

## 👨‍💻 Authors

- **Ali Saif** – [LinkedIn](https://www.linkedin.com/in/ali-saif-ba5159223/)
- **Rizwan Sabir**
- **Hanzla Mirza**

