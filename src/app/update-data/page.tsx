"use client";

import { useState } from "react";
import { FiArrowLeft, FiUpload, FiCheck, FiAlertCircle, FiMapPin, FiDatabase } from "react-icons/fi";

interface UpdateStatus {
    provinces: 'pending' | 'processing' | 'completed' | 'error';
    districts: 'pending' | 'processing' | 'completed' | 'error';
    wards: 'pending' | 'processing' | 'completed' | 'error';
}

export default function UpdateData() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
        provinces: 'pending',
        districts: 'pending',
        wards: 'pending'
    });
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState<string>('');

    const handleStartUpdate = async () => {
        setIsUpdating(true);
        setProgress(0);

        try {
            // Simulate updating provinces
            setCurrentStep('Đang cập nhật tỉnh/thành phố...');
            setUpdateStatus(prev => ({ ...prev, provinces: 'processing' }));
            await simulateUpdate('provinces');
            setUpdateStatus(prev => ({ ...prev, provinces: 'completed' }));
            setProgress(33);

            // Simulate updating districts
            setCurrentStep('Đang cập nhật quận/huyện...');
            setUpdateStatus(prev => ({ ...prev, districts: 'processing' }));
            await simulateUpdate('districts');
            setUpdateStatus(prev => ({ ...prev, districts: 'completed' }));
            setProgress(66);

            // Simulate updating wards
            setCurrentStep('Đang cập nhật phường/xã...');
            setUpdateStatus(prev => ({ ...prev, wards: 'processing' }));
            await simulateUpdate('wards');
            setUpdateStatus(prev => ({ ...prev, wards: 'completed' }));
            setProgress(100);

            setCurrentStep('Hoàn thành cập nhật!');
        } catch (error) {
            console.error('Update error:', error);
            setCurrentStep('Có lỗi xảy ra trong quá trình cập nhật');
        } finally {
            setIsUpdating(false);
        }
    };

    const simulateUpdate = async (type: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate random error (10% chance)
        if (Math.random() < 0.1) {
            throw new Error(`Error updating ${type}`);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <FiCheck className="w-5 h-5 text-green-500" />;
            case 'processing':
                return <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
            case 'error':
                return <FiAlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Hoàn thành';
            case 'processing':
                return 'Đang xử lý...';
            case 'error':
                return 'Lỗi';
            default:
                return 'Chờ xử lý';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600';
            case 'processing':
                return 'text-primary';
            case 'error':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                        <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Cập Nhật Dữ Liệu Hành Chính
                    </h1>
                    <p className="text-gray-600">
                        Cập nhật thông tin tỉnh, huyện, xã từ database
                    </p>
                </div>

                {/* Back Button */}
                <div className="mb-6">
                    <a
                        href="/list-collection"
                        className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại danh sách collection
                    </a>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {/* Progress Bar */}
                    {isUpdating && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Tiến độ cập nhật</span>
                                <span className="text-sm text-gray-500">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{currentStep}</p>
                        </div>
                    )}

                    {/* Update Steps */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <FiMapPin className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Tỉnh/Thành phố</h3>
                                    <p className="text-sm text-gray-500">Cập nhật danh sách tỉnh thành</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {getStatusIcon(updateStatus.provinces)}
                                <span className={`ml-2 text-sm font-medium ${getStatusColor(updateStatus.provinces)}`}>
                                    {getStatusText(updateStatus.provinces)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                    <FiMapPin className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Quận/Huyện</h3>
                                    <p className="text-sm text-gray-500">Cập nhật danh sách quận huyện</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {getStatusIcon(updateStatus.districts)}
                                <span className={`ml-2 text-sm font-medium ${getStatusColor(updateStatus.districts)}`}>
                                    {getStatusText(updateStatus.districts)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                    <FiMapPin className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phường/Xã</h3>
                                    <p className="text-sm text-gray-500">Cập nhật danh sách phường xã</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {getStatusIcon(updateStatus.wards)}
                                <span className={`ml-2 text-sm font-medium ${getStatusColor(updateStatus.wards)}`}>
                                    {getStatusText(updateStatus.wards)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center">
                        {!isUpdating ? (
                            <button
                                onClick={handleStartUpdate}
                                className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                            >
                                <FiUpload className="w-5 h-5 mr-2" />
                                Bắt đầu cập nhật
                            </button>
                        ) : (
                            <div className="text-center">
                                <div className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg">
                                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                                    Đang cập nhật...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="mt-8 p-4 bg-primary-light rounded-lg">
                        <h3 className="text-sm font-medium text-primary-dark mb-2">
                            💡 Thông tin
                        </h3>
                        <ul className="text-sm text-primary-dark space-y-1">
                            <li>• Quá trình cập nhật sẽ diễn ra tuần tự: Tỉnh → Huyện → Xã</li>
                            <li>• Dữ liệu sẽ được đồng bộ từ database đã kết nối</li>
                            <li>• Không tắt trang trong quá trình cập nhật</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Hệ thống cập nhật dữ liệu hành chính Việt Nam
                    </p>
                </div>
            </div>
        </main>
    );
} 