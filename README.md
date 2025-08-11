# Secure Document Vault

A **mobile-first secure storage application** built with React Native, designed for storing, organizing, and sharing sensitive documents like identification cards, certificates, and legal files.  
The app focuses on **security, speed, and offline reliability**, ensuring that critical documents are accessible anytime, anywhere.

---

## 📌 Features

- **🔒 Secure File Storage**  
  End-to-end encryption on-device before upload (AES-256). Files remain private even to the service provider.

- **📂 Categorized Organization**  
  Create folders for IDs, certificates, legal docs, and more for clean document management.

- **📶 Offline-First Access**  
  Local caching with **PouchDB** for accessing files without internet. Syncs automatically when online.

- **🛡 Multi-Factor Authentication (MFA)**  
  Periodic MFA prompts and re-authentication for sensitive actions (view, download, delete).

- **⏱ Time-Limited Secure Links**  
  Generate temporary access links with custom expiration times (e.g., 5 min, 1 hr, 24 hrs).

- **🔍 Fast Search**  
  Metadata-based search with instant results from the local cache.

---

## 🏗 Tech Stack

### **Frontend**
- [React Native](https://reactnative.dev/) — Cross-platform mobile development.
- [PouchDB](https://pouchdb.com/) — Offline-first local database with sync capabilities.
- Biometric authentication APIs (FaceID, TouchID).

### **Backend**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) — RESTful API.
- [PostgreSQL](https://www.postgresql.org/) — Metadata & user management.
- [CouchDB](https://couchdb.apache.org/) — Sync for offline-first approach.
- [Redis](https://redis.io/) — Optional caching and time-limited link tracking.

### **Cloud Infrastructure**
- [Google Cloud Storage](https://cloud.google.com/storage) — Secure file storage.
- [Google Cloud SQL](https://cloud.google.com/sql) — Managed PostgreSQL.
- [Google Cloud Functions](https://cloud.google.com/functions) — Time-limited link generation, MFA triggers.
- [Google IAM](https://cloud.google.com/iam) — Access management & role-based permissions.

---

## 🔐 Security

- **Encryption**: AES-256 for files, TLS 1.3 for network communication.
- **Authentication**: JWT + MFA.
- **Access Control**: Role-Based Access Control (RBAC).
- **Time-Limited URLs**: Signed URLs for controlled, temporary file access.
- **Device Loss Protection**: Remote logout & session invalidation.

---

## 🚀 Development Phases

### **Phase 1 — MVP**
- User registration/login with MFA.
- File upload, categorization, and retrieval.
- Offline-first access with PouchDB.

### **Phase 2 — Security & Sharing**
- Implement time-limited link sharing.
- Device loss protection features.

### **Phase 3 — Expansion**
- Batch uploads.
- Add new categories (e.g., healthcare records).

---

## 📈 Expected Benefits

- Reliable access to important files even in low connectivity.
- Peace of mind through strong encryption and MFA.
- Simple, intuitive user experience for all age groups.

---

## 🛠 Installation & Setup (Dev Environment)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/secure-document-vault.git
   cd secure-document-vault
2. **Install Dependencies**
   ```bash
   npm install

3. **Configure Environment Variables**
   ```bash
   DATABASE_URL=your_postgres_url
    COUCHDB_URL=your_couchdb_url
    GCP_PROJECT_ID=your_project_id
    GCP_BUCKET_NAME=your_bucket
    JWT_SECRET=your_secret
4. **Run the backend**
   ```bash
   cd backend
   npm start  
