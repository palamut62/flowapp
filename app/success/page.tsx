import Link from 'next/link';

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
        <h2 className="text-3xl font-bold text-green-600">Registration Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please check your email to verify your account. Once verified, you can proceed to login.
        </p>
        <Link
          href="/login"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
