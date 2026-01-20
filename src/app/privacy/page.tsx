import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                        개인정보처리방침
                    </h1>
                    <p className="text-slate-600 mb-8">
                        최종 업데이트: 2026년 1월 20일
                    </p>

                    {/* 서문 */}
                    <section className="mb-8">
                        <p className="text-slate-700 leading-relaxed">
                            FileSector(이하 "서비스")는 이용자의 개인정보를 매우 중요하게 생각합니다.
                            본 개인정보처리방침은 서비스가 이용자의 개인정보를 어떻게 수집, 사용, 보호하는지 설명합니다.
                        </p>
                    </section>

                    {/* 제1조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제1조 (개인정보의 수집)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p className="font-semibold text-green-700">
                                ✅ FileSector는 개인정보를 수집하지 않습니다.
                            </p>
                            <p>서비스는 다음과 같은 정보를 수집하지 않습니다:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>이름, 이메일, 전화번호 등의 개인 식별 정보</li>
                                <li>회원가입 정보 (회원가입 기능 없음)</li>
                                <li>결제 정보 (무료 서비스)</li>
                                <li>위치 정보</li>
                            </ul>
                            <p className="mt-4">
                                <strong>자동 수집 정보:</strong> 서비스 개선을 위해 다음의 기술적 정보가 자동으로 수집될 수 있습니다:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>IP 주소 (보안 및 악용 방지 목적)</li>
                                <li>브라우저 종류 및 버전</li>
                                <li>접속 시간 및 방문 페이지</li>
                                <li>기기 정보 (모바일/데스크톱)</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제2조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제2조 (파일 처리 및 보안)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p className="font-semibold text-green-700">
                                ✅ 업로드된 파일은 즉시 삭제됩니다.
                            </p>
                            <p>1. <strong>파일 처리 방식:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>업로드된 파일은 변환 목적으로만 사용됩니다</li>
                                <li>다운로드 즉시 서버에서 자동 삭제됩니다</li>
                                <li>최대 1시간 후에는 모든 파일이 완전히 삭제됩니다</li>
                                <li>파일은 저장, 백업, 또는 제3자와 공유되지 않습니다</li>
                            </ul>
                            <p className="mt-4">2. <strong>보안 조치:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>HTTPS 암호화 통신</li>
                                <li>파일명 무작위화 (경로 조작 방지)</li>
                                <li>악성 파일 차단</li>
                                <li>Rate Limiting (남용 방지)</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제3조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제3조 (쿠키 사용)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>서비스는 필수적인 쿠키만 사용합니다:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong>세션 쿠키:</strong> 서비스 이용 중 임시로 생성되며, 브라우저 종료 시 삭제됩니다</li>
                                <li><strong>기능 쿠키:</strong> 사용자 설정 저장 (언어, 테마 등)</li>
                            </ul>
                            <p className="mt-4">
                                광고 쿠키나 추적 쿠키는 사용하지 않습니다.
                                향후 Google Analytics 등의 분석 도구 사용 시 별도 고지합니다.
                            </p>
                        </div>
                    </section>

                    {/* 제4조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제4조 (제3자 제공)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p className="font-semibold text-green-700">
                                ✅ 개인정보 및 파일을 제3자에게 제공하지 않습니다.
                            </p>
                            <p>
                                서비스는 이용자의 개인정보나 업로드된 파일을 어떠한 경우에도
                                제3자에게 판매, 대여, 또는 제공하지 않습니다.
                            </p>
                            <p className="mt-4">
                                <strong>예외:</strong> 법률에 의해 요구되는 경우에만 관련 기관에 제공할 수 있습니다.
                            </p>
                        </div>
                    </section>

                    {/* 제5조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제5조 (이용자의 권리)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>이용자는 다음의 권리를 가집니다:</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>개인정보 수집 거부 권리 (서비스는 개인정보를 수집하지 않음)</li>
                                <li>업로드한 파일의 즉시 삭제 요청 권리</li>
                                <li>서비스 이용 중단 권리</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제6조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제6조 (아동의 개인정보 보호)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>
                                서비스는 만 14세 미만 아동의 개인정보를 수집하지 않습니다.
                                만 14세 미만 아동이 서비스를 이용하는 경우, 법정대리인의 동의가 필요합니다.
                            </p>
                        </div>
                    </section>

                    {/* 제7조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제7조 (개인정보 보호책임자)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>
                                개인정보 보호와 관련한 문의사항이 있으시면 아래로 연락주시기 바랍니다:
                            </p>
                            <div className="bg-slate-50 p-4 rounded-lg mt-4">
                                <p><strong>개인정보 보호책임자:</strong> FileSector 운영팀</p>
                                <p><strong>이메일:</strong> privacy@filesector.com (예시)</p>
                            </div>
                        </div>
                    </section>

                    {/* 제8조 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            제8조 (개인정보처리방침의 변경)
                        </h2>
                        <div className="space-y-3 text-slate-700">
                            <p>
                                본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 변경될 수 있습니다.
                                변경 시에는 최소 7일 전에 공지하며, 중요한 변경사항의 경우 30일 전에 공지합니다.
                            </p>
                        </div>
                    </section>

                    {/* 부칙 */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                            부칙
                        </h2>
                        <p className="text-slate-700">
                            본 개인정보처리방침은 2026년 1월 20일부터 시행됩니다.
                        </p>
                    </section>

                    {/* 요약 */}
                    <section className="mb-8 bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-blue-900 mb-3">
                            📌 요약
                        </h3>
                        <ul className="space-y-2 text-blue-800">
                            <li>✅ 개인정보 수집 없음 (회원가입 불필요)</li>
                            <li>✅ 파일 즉시 삭제 (최대 1시간)</li>
                            <li>✅ 제3자 제공 없음</li>
                            <li>✅ HTTPS 암호화 통신</li>
                            <li>✅ 무료 서비스 (결제 정보 불필요)</li>
                        </ul>
                    </section>

                    {/* 하단 링크 */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="text-blue-600 hover:text-blue-700 font-medium text-center"
                            >
                                ← 홈으로 돌아가기
                            </Link>
                            <Link
                                href="/terms"
                                className="text-blue-600 hover:text-blue-700 font-medium text-center"
                            >
                                이용약관 보기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
