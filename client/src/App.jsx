// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import About from "./pages/About.jsx";
import Faq from "./pages/Faq.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import Subscription from "./pages/Subscription.jsx";
import Live from "./pages/Live.jsx";
import Recordings from "./pages/Recordings.jsx";
import Notifications from "./pages/Notifications.jsx";
import Profile from "./pages/Profile.jsx";
import Billing from "./pages/Billing.jsx";
import Logout from "./pages/Logout.jsx";
import SelectedCourse from "./pages/SelectedCouse.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="subscription" replace />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="live" element={<Live />} />
        <Route path="recordings" element={<Recordings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="billing" element={<Billing />} />
        <Route path="logout" element={<Logout />} />
        <Route path="selected-course/:id" element={<SelectedCourse />} />
      </Route>
    </Routes>
  );
}
