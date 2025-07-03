"use client";
import { useState } from "react";
import { FiDatabase } from "react-icons/fi";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [databaseUrl, setDatabaseUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!databaseUrl.trim()) {
      setError("Vui lòng nhập link database");
      return;
    }

    // Validate URL format
    try {
      new URL(databaseUrl);
    } catch {
      setError("Link database không hợp lệ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement API call to validate and store database URL
      console.log("Database URL:", databaseUrl);

      // Redirect to update page or show success message
      router.push('/list-collection');
      alert("Kết nối database thành công!");
    } catch (err) {
      setError("Không thể kết nối đến database. Vui lòng kiểm tra lại link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
            <FiDatabase className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cập Nhật/Tỉnh/Huyện Xã
          </h1>
          <p className="text-gray-600">
            Nhập link database để bắt đầu cập nhật dữ liệu
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="databaseUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Link Database
              </label>
              <input
                type="url"
                id="databaseUrl"
                value={databaseUrl}
                onChange={(e) => {
                  setDatabaseUrl(e.target.value);
                  setError(""); // Clear error when user types
                }}
                placeholder="https://example.com/database"
                className={`w-full px-4 py-3 border outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error ? 'border-red-300' : 'border-gray-300'
                  }`}
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full cursor-pointer py-3 px-4 rounded-lg font-medium text-white transition-colors ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2'
                }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang kết nối...
                </div>
              ) : (
                'Kết Nối Database'
              )}
            </button>
          </form>

          {/* Help text */}
          <div className="mt-6 p-4 bg-primary-light rounded-lg">
            <h3 className="text-sm font-medium text-primary-dark mb-2">
              💡 Hướng dẫn
            </h3>
            <ul className="text-sm text-primary-dark space-y-1">
              <li>• Nhập link database hợp lệ (VD: https://api.example.com/db)</li>
              <li>• Đảm bảo database có quyền truy cập</li>
              <li>• Hệ thống sẽ kiểm tra kết nối trước khi tiếp tục</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Hệ thống cập nhật dữ liệu hành chính Việt Nam
          </p>
          <a
            href="/list-collection"
            className="inline-flex items-center text-primary hover:text-primary-hover transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Xem danh sách collection
          </a>
        </div>
      </div>
    </main>
  );
}
