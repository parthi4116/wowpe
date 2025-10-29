# UPI Wallet Interface (Angular 16)

A simple UPI wallet simulation built with **Angular 16**, allowing users to add money, send transactions, and view history — based on role-based permissions.

---

## Tech Stack

- **Angular 16**
- **HTML, CSS, TypeScript**
- **Angular Material, BOOTSRAP**
 

---

## concepts Used
   - Routing – For navigation between components (Login ,Registration, Transactions, etc.)
   - Reactive Forms – Used in Login, Add Balance, and Send Money forms
   - Service & Dependency Injection – Centralized UserService for handling API logic
   - HTTPClient & Interceptors – For Setting LocalStorage
   - NgIf / NgFor / Pipes – Core Angular directives for dynamic rendering
   - DatePipe – Formatting dates in templates
   - Titlecase – Formatting upperCase in templates
   - Dynamic Components – Used in search, pagination, header, filter
   - MatDialog (Angular Material) – For popup modal forms
   - Toaster Notifications – Feedback on actions like success/failure
   - Pagination Logic – Custom frontend pagination with currentPage, totalPages
   - Search & Filter Functionality – Client-side filtering for UPI ID and date
   - LocalStorage – Storing session data like current user and all upi transaction api datas
   - Form Validation – Required fields, UPI ID format, insufficient balance check
  

## Workflow

###  Login & Reigstration
   Users must register before accessing the wallet.


### Work Flow
- **Add Balance** → Top-up wallet
- **Send Money** → Transfer to any UPI ID
- Toaster notifications for all actions
- Input validations & UPI format check
- Transaction list with:
  - Card View
  - List View
  - Pagination
  - UPI search
  - Date filter
 

### Logout
- Logout option available in the UI

---

## 🛠️ Steps to Run the App

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/upi-wallet.git
   cd upi-wallet
   npm install
   npm start






