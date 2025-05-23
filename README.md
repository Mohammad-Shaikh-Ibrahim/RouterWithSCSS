# Patient Management System

A modern React-based patient management system that demonstrates different form handling approaches using React Hook Form and Formik.

## Features

- **Dual Form Implementation**: The project showcases two different approaches to form handling:
  - React Hook Form implementation
  - Formik implementation
- **Form Validation**: Comprehensive form validation including:
  - Required field validation
  - Name format validation (no numbers allowed)
  - Date validation (no future dates)
  - Minimum/maximum length validation
  - Multiple disorder selection validation
- **Modern UI Components**: Built with Material-UI (MUI) components
- **Styled Components**: Reusable styled components for consistent UI
- **Responsive Design**: Mobile-friendly layout
- **Date Picker**: Integrated MUI Date Picker for birth date selection
- **Form Fields**:
  - First Name
  - Last Name
  - Gender (Radio buttons)
  - Date of Birth
  - Disorders (Multiple selection)
  - Workspace Template (Dropdown)

## Technologies Used

- React
- Vite
- React Router
- Material-UI (MUI)
- Styled Components
- React Hook Form
- Formik
- Yup (for form validation)
- @mui/x-date-pickers

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd RouterWithSCSS
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
src/
├── components/
│   └── shared/
│       └── FormStyles.jsx    # Shared styled components
├── pages/
│   ├── AddPatientFormikForm.jsx    # Formik implementation
│   └── AddPatientReactHookForm.jsx # React Hook Form implementation
├── hooks/
│   └── usePatients.js       # Custom hook for patient management
└── App.jsx                  # Main application component
```

## Form Features

### Patient Information

- First and last name validation (2-50 characters, no numbers)
- Gender selection (Male/Female)
- Date of birth with future date validation
- Multiple disorder selection
- Workspace template selection

### Styling

- Consistent styling across both form implementations
- Responsive design
- Visual feedback for form validation
- Custom styled components for form elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
