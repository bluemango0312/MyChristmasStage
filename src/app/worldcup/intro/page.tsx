import Link from 'next/link';

const HOME_BG = '/home-bg.png';

export default function worldcupIntroPage() {
    return (
        <main className="relative min-h-[100dvh] w-full bg-black">
            {/* 전체 화면 배경: 모바일에서는 이미지, PC에서는 숨김 */}
            <img
                src={HOME_BG}
                alt="full background"
                className="absolute inset-0 h-full w-full object-cover md:hidden"
                style={{ zIndex: 0 }}
            />

            {/* PC 바깥 여백용 단색 배경 */}
            <div
                className="absolute inset-0 hidden md:block"
                style={{ zIndex: 0, backgroundColor: '#3A0F14' }}
            />

            {/* 전체 오버레이 */}
            <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

            {/* 폰 프레임 */}
            <div className="relative z-10 mx-auto min-h-[100dvh] w-full overflow-hidden md:max-w-[390px] [container-type:inline-size]">
                {/* 폰 프레임 안 배경은 계속 이미지 */}
                <img
                    src={HOME_BG}
                    alt="home background"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ zIndex: 0 }}
                />
                {/* 콘텐츠 영역 */}
                <div className="relative flex min-h-[100dvh] items-center justify-center px-6">
                    {/* 편지지 전체 클릭 */}
                    <Link
                        href="/worldcup/play"
                        className="
                        block
                        w-[clamp(280px,90cqw,360px)]
                        transition
                        active:scale-[0.97]
                        "
                    >
                        <img
                            src="/info-letter.png"
                            alt="letter"
                            className="
                                w-full
                                select-none
                                pointer-events-none
                                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                            "
                        />
                    </Link>
                </div>
            </div>
        </main>
    )
}