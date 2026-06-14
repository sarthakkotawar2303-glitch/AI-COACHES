import './App.css'
import { RouterProvider } from 'react-router'
import router from './App.Router'
import { AuthProvider, AuthContext } from './features/auth/state/auth.context'
import { useContext } from 'react'
import { InterviewProvider } from './features/interview/state/interviewContext'
import Loading from './components/Loader/Loading'

function AppContent() {
  const { isLoggingOut } = useContext(AuthContext);
  
  return (
    <>
      {isLoggingOut && (
        <Loading 
          variant="fullscreen" 
          title="Signing Out..." 
          subtitle="Clearing your session cache and securing your workspace" 
        />
      )}
      <RouterProvider router={router} />
    </>
  );
}

function App() {
  return (
    <InterviewProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </InterviewProvider>
  )
}

export default App
