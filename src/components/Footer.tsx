import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12 px-4 mt-20">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">FileSector</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            무료 온라인 파일 변환 서비스.
                            이미지, 문서, 비디오, 오디오를 안전하고 빠르게 변환하세요.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">바로가기</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/#help" className="text-slate-400 hover:text-white transition">
                                    사용 가이드
                                </Link>
                            </li>
                            <li>
                                <Link href="/#help" className="text-slate-400 hover:text-white transition">
                                    자주 묻는 질문
                                </Link>
                            </li>
                            <li>
                                <Link href="/#help" className="text-slate-400 hover:text-white transition">
                                    지원 파일 형식
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">법적 고지</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/terms" className="text-slate-400 hover:text-white transition">
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-slate-400 hover:text-white transition">
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
                    <p>© 2026 FileSector. All rights reserved.</p>
                    <p className="mt-2">
                        파일은 다운로드 즉시 자동 삭제됩니다 • 개인정보 수집 없음 • 무료 서비스
                    </p>
                </div>
            </div>
        </footer>
    );
}
