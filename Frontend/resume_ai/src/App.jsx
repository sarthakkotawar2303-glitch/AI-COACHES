import './App.css'
import { RouterProvider } from 'react-router'
import router from './App.Router'
import { AuthProvider, AuthContext } from './features/auth/state/auth.context'
import { useContext } from 'react'
import { InterviewProvider } from './features/interview/state/interviewContext'

function AppContent() {
  const { isLoggingOut } = useContext(AuthContext);
  
  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-zinc-300">
          <div className="relative z-10 flex flex-col items-center animate-fade-scale text-center px-4">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-300 rounded-full animate-spin mb-4"></div>
            <h2 className="text-sm font-semibold text-zinc-100 tracking-wide">Signing Out...</h2>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">Clearing your session cache and securing your workspace</p>
          </div>
        </div>
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
