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
          {/* Glowing background orbs */}
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
          <div className="relative z-10 flex flex-col items-center animate-fade-scale text-center px-4">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-transparent border-t-red-500 border-b-red-500 rounded-full animate-spin duration-1000"></div>
              <div className="absolute inset-2 border-4 border-transparent border-l-purple-400 border-r-purple-400 rounded-full animate-spin duration-700 reverse"></div>
              <div className="text-red-400 text-2xl animate-pulse">🔒</div>
            </div>
            <h2 className="text-xl font-extrabold text-zinc-100 tracking-wide animate-pulse">Signing Out</h2>
            <p className="text-xs text-zinc-500 mt-2 max-w-xs">Clearing your session cache and securing your workspace...</p>
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
