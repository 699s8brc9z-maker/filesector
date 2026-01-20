'use client';

import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export default function OfflineBanner() {
    const { isOnline, wasOffline } = useNetworkStatus();

    if (isOnline && !wasOffline) return null;

    return (
        <>
            {/* Offline warning */}
            {!isOnline && (
                <div className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 py-3 text-center z-50 shadow-lg animate-slideDown">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-xl">⚠️</span>
                        <span className="font-semibold">인터넷 연결이 끊어졌습니다</span>
                        <span className="hidden sm:inline text-sm opacity-90">
                            • 연결을 확인해주세요
                        </span>
                    </div>
                </div>
            )}

            {/* Reconnection success */}
            {isOnline && wasOffline && (
                <div className="fixed top-0 left-0 right-0 bg-green-600 text-white px-4 py-3 text-center z-50 shadow-lg animate-slideDown">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-xl">✅</span>
                        <span className="font-semibold">인터넷에 다시 연결되었습니다</span>
                    </div>
                </div>
            )}
        </>
    );
}
