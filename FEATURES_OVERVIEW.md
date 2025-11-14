# Digital ID - Features Overview

## 🎯 Quick Navigation

### For Users
- **Main Screen** → Access all your folders and documents
  - Tap profile icon (E) → Profile & Settings
  - Tap book icon → Documents Management
  - Tap medical icon → Emergency Access
  - Tap ellipsis on folder → Edit, Share, or Delete

### For Developers
```
client/
├── lib/                          # Core Utilities
│   ├── biometricAuth.ts         # Authentication & session management
│   ├── qrCodeUtils.ts           # QR code & sharing functionality
│   ├── documentManager.ts       # Document CRUD operations
│   └── emergencyAccess.ts       # Emergency information management
│
├── components/                   # Reusable Components
│   ├── QRCodeModal.tsx          # QR code display & sharing
│   ├── FolderOptionsMenu.tsx    # Folder actions dropdown
│   └── biometric-options.tsx    # Biometric method selector
│
└── app/screens/                 # Main Screens
    ├── biometric-setup-screen.tsx      # Setup biometrics
    ├── biometric-login-screen.tsx      # Login with biometrics
    ├── pin-setup-screen.tsx            # Setup PIN
    ├── pin-login-screen.tsx            # Login with PIN
    ├── profile-screen.tsx              # User profile & settings
    ├── documents-screen.tsx            # Document management
    ├── emergency-access-screen.tsx     # Emergency info & contacts
    ├── main.tsx                        # Main dashboard
    └── folder-details.tsx              # Card display & sharing
```

## 🔐 Authentication Flow

```
Login/Signup
    ↓
Biometric Setup (Optional)
    ├─→ Face ID/Fingerprint
    ├─→ PIN (6-digit)
    └─→ Skip (less secure)
    ↓
Main Dashboard
    ├─→ Session active (5 min timeout)
    └─→ Auto-lock on timeout
```

## 📤 Sharing Flow

```
Card/Folder
    ↓
Tap Share → QR Modal Opens
    ↓
Select Expiration Time
    ├─→ 15 minutes
    ├─→ 30 minutes
    ├─→ 1 hour
    ├─→ 2 hours
    └─→ 24 hours
    ↓
QR Code Generated
    ├─→ Share via native share
    ├─→ Screenshot to save
    └─→ Revoke access anytime
```

## 📚 Document Management Flow

```
Documents Screen
    ↓
Search or Filter by Category
    ↓
View Documents
    ├─→ Tap to view details
    ├─→ Delete document
    └─→ See expiration alerts
    ↓
Add New Document (Future)
```

## 🚨 Emergency Access Flow

```
Emergency Screen
    ↓
View Quick Access Card
    ├─→ Name
    ├─→ Blood Type
    ├─→ ID Number
    └─→ Contact Count
    ↓
Manage Emergency Contacts
    ├─→ Add Contact
    │   ├─→ Name
    │   ├─→ Relationship
    │   ├─→ Phone
    │   └─→ Email (optional)
    └─→ Delete Contact
    ↓
Edit Medical Information
    ├─→ Blood Type
    ├─→ Allergies
    ├─→ Medications
    └─→ Medical Conditions
```

## ⚡ Haptic Feedback Map

| Action | Haptic Type | Location |
|--------|-------------|----------|
| Tap button | Light | All buttons |
| Open menu | Medium | Folder options, modals |
| Selection | Selection | Category filters, options |
| Success | Success notification | Save, delete, share |
| Error | Error notification | Failed operations |
| Warning | Warning notification | Missing fields |

## 🎨 Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| Primary | #003554 | Buttons, icons, accents |
| Success | #10b981 | Success states |
| Warning | #f97316 | Expiring documents |
| Error | #ef4444 | Errors, delete actions |
| Info | #3b82f6 | Information cards |
| Background | #f9fafb | Screen backgrounds |
| Card | #ffffff | Content cards |

## 📱 Screen Components

### Main Dashboard
- User profile button (top-left)
- Quick access icons (top-right)
- Folder list with options
- Floating action buttons

### Profile Screen
- User statistics card
- Account settings section
- Data management section
- Preferences section
- Logout button

### Documents Screen
- Search bar
- Category filter pills
- Expiring documents alert
- Document list with actions

### Emergency Access Screen
- Quick access card (prominent)
- Basic information section
- Emergency contacts list
- Add contact modal

## 🔧 Configuration

### Session Timeout
Default: 5 minutes
Location: `lib/biometricAuth.ts`
```typescript
await setupSessionTimeout(5) // minutes
```

### QR Code Expiration Options
Options: 15min, 30min, 1hr, 2hrs, 24hrs
Location: `components/QRCodeModal.tsx`

### PIN Configuration
Length: 6 digits
Attempts: 3 before lockout
Location: `app/screens/pin-login-screen.tsx`

## 📦 Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| expo-local-authentication | Biometric auth | Latest |
| expo-secure-store | Secure storage | Latest |
| expo-sharing | Share functionality | Latest |
| react-native-qrcode-svg | QR generation | Latest |
| expo-haptics | Haptic feedback | Already installed |

## 🚀 Getting Started

### For Users
1. Open the app
2. Login or sign up
3. Set up biometric authentication (recommended)
4. Explore features from the main dashboard

### For Developers
1. Review `IMPLEMENTATION_SUMMARY.md` for technical details
2. Check individual utility files in `lib/` for API documentation
3. Run the app and test authentication flow first
4. Verify haptic feedback on a physical device
5. Test QR code sharing between devices

## �� Key Features Summary

✅ **Implemented and Working**
- Biometric authentication (Face ID/Fingerprint)
- PIN authentication with secure storage
- Session management with timeout
- QR code sharing with expiration
- Document management with search
- Emergency access with contacts
- Haptic feedback throughout
- Profile and settings

🔜 **Future Enhancements**
- Document creation UI
- Cloud backup
- Push notifications for expiring documents
- Family sharing
- Document scanning with OCR

## 💡 Tips

### For Best Security
1. Enable biometric authentication
2. Use a strong 6-digit PIN
3. Don't share QR codes publicly
4. Review emergency contacts regularly
5. Keep documents updated

### For Best Experience
1. Add emergency contacts immediately
2. Categorize documents properly
3. Set document expiration dates
4. Use search for quick access
5. Enable haptics for better feedback

## 🐛 Troubleshooting

**Biometric not working?**
- Check device settings
- Ensure biometric is enrolled
- Try PIN as backup

**QR code not scanning?**
- Check expiration time
- Ensure good lighting
- Try regenerating code

**Session timeout too short?**
- Can be configured in code
- Default is 5 minutes for security

**Haptics not working?**
- Only works on physical devices
- Check device haptic settings
- May not work in simulator

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-14  
**Status**: Production Ready ✅
