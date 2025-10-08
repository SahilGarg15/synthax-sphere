# Test Accounts for Synthax Sphere

Use these credentials to test different user roles and dashboards:

## 🎓 Learner Account
**Email:** `learner@test.com`  
**Password:** `password123`  
**Access:** Learner Dashboard with courses, progress tracking, code playground

---

## 👨‍🏫 Mentor Account
**Email:** `mentor@test.com`  
**Password:** `password123`  
**Access:** Mentor Dashboard with:
- Upcoming mentoring sessions
- Mentee requests
- Session scheduling
- Calendar management

---

## 👑 Admin Account
**Email:** `admin@test.com`  
**Password:** `password123`  
**Access:** Admin Dashboard with:
- User management
- Course management
- Analytics & charts
- Platform statistics

---

## 🔐 Role-Based Access Control

Each dashboard is protected by role-based access control:
- Trying to access `/dashboard/admin` without admin role → ❌ Redirected to home
- Trying to access `/dashboard/mentor` without mentor role → ❌ Redirected to home
- Trying to access `/dashboard/learner` without learner role → ❌ Redirected to home

---

## 📝 Notes

- **OTP Code for 2FA:** Use `123456` (demo purposes)
- All accounts work with any email containing the role name (e.g., `john.mentor@example.com` → Mentor role)
- Password must be at least 6 characters
- Changes are persisted in localStorage

---

## 🎯 Quick Test Flow

1. **Test Learner Flow:**
   - Login as learner@test.com
   - View courses, progress, and code playground
   - Try accessing /dashboard/mentor → Should be blocked

2. **Test Mentor Flow:**
   - Logout, login as mentor@test.com
   - Click "Join Session", "Respond", "Schedule" buttons
   - View mentee requests and sessions

3. **Test Admin Flow:**
   - Logout, login as admin@test.com
   - Click "Manage Users", "Manage Courses", "View Analytics"
   - View user growth and revenue charts

---

## 🚀 Future Backend Integration

When integrating with a real backend:
- Replace mock login in `/src/api/auth.ts`
- Add JWT token handling
- Implement server-side role validation
- Add real session management
