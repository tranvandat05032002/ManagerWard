"use client";

import { useState, useEffect } from "react";
import { FiDatabase, FiRefreshCw, FiArrowLeft, FiList } from "react-icons/fi";

interface Collection {
    name: string;
    count?: number;
    size?: string;
}

export default function ListCollection() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchCollections = async () => {
        try {
            setIsLoading(true);
            setError("");

            // TODO: Replace with actual API call
            // const response = await fetch('/api/collections');
            // const data = await response.json();

            // Simulate API call with mock data
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockData: Collection[] = [
                { name: "provinces", count: 63, size: "2.3 MB" },
                { name: "districts", count: 713, size: "15.7 MB" },
                { name: "wards", count: 11162, size: "89.2 MB" },
                { name: "users", count: 1250, size: "3.1 MB" },
                { name: "logs", count: 45678, size: "67.8 MB" },
                { name: "settings", count: 15, size: "0.5 MB" },
                { name: "backups", count: 8, size: "12.4 MB" },
                { name: "temp_data", count: 0, size: "0.1 MB" },
            ];

            setCollections(mockData);
        } catch (err) {
            setError("Không thể tải danh sách collection. Vui lòng thử lại.");
            console.error("Error fetching collections:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchCollections();
        setIsRefreshing(false);
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                        <FiDatabase className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Danh Sách Collection
                    </h1>
                    <p className="text-gray-600">
                        Hiển thị tất cả collection trong database
                    </p>
                </div>

                {/* Back Button */}
                <div className="mb-6">
                    <a
                        href="/"
                        className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại trang chủ
                    </a>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {/* Header with refresh button */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <FiList className="w-5 h-5 text-primary mr-2" />
                            <h2 className="text-xl font-semibold text-gray-900">
                                Collections ({collections.length})
                            </h2>
                        </div>
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className={`flex items-center cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors ${isRefreshing
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2'
                                }`}
                        >
                            <FiRefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                            {isRefreshing ? 'Đang tải...' : 'Làm mới'}
                        </button>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-lg text-gray-600">Đang tải danh sách collection...</span>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Có lỗi xảy ra</h3>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={handleRefresh}
                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                            >
                                Thử lại
                            </button>
                        </div>
                    )}

                    {/* Collections List */}
                    {!isLoading && !error && collections.length > 0 && (
                        <div className="grid gap-4">
                            {collections.map((collection, index) => (
                                <div
                                    key={collection.name}
                                    className="cursor-pointer border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mr-4">
                                                <FiDatabase className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 capitalize">
                                                    {collection.name.replace(/_/g, ' ')}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {collection.count?.toLocaleString()} documents
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-gray-900">
                                                {collection.size}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Size
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && collections.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiDatabase className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có collection nào</h3>
                            <p className="text-gray-600">Database hiện tại không có collection nào.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Tổng cộng {collections.length} collection được tìm thấy
                    </p>
                </div>
            </div>
        </main>
    );
}
