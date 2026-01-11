import { useLocation, useNavigate } from "react-router";
import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import { useEffect, useMemo, useState } from "react";
import StoryLine from "../components/StoryLine";

type IntroState = {
    dialogue: string;
} | {
    specialInteraction: () => void;
}

function Intro() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [panelOpened, setPanelOpened] = useState<boolean>(false);
    const states: IntroState[] = useMemo(() => [
        {
            dialogue: 'สวัสดี! ยินดีต้อนรับเข้าสู่โรงงานผลิตของเล่นของเรานะ'
        },
        {
            dialogue: 'เธอเป็นภูติที่มาใหม่สินะ คงจะเรียนรู้การทำของเล่นมาแล้วสินะ'
        },
        {
            specialInteraction: () => {
                setPanelOpened(true);
            }
        },
        {
            dialogue: 'อะไรนะ! ยังไม่เคยเรียนเหรอ... งั้นก็ไม่เป็นไร ฉันจะสอนเธอเอง!'
        },
        {
            specialInteraction: () => {
                navigate("/game");
            }
        }
    ], [navigate]);
    const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);

    useEffect(() => {
        const currentState = states[currentStateIndex];

        if ('specialInteraction' in currentState) {
            currentState.specialInteraction();
        }
    }, [currentStateIndex, states]);

    return (
        <FullScreenCloudBackground>
            <div className="flex h-full w-full justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-16">
                    <StoryLine
                        story={(() => {
                                const currentState = states[currentStateIndex];
                                if ('dialogue' in currentState) {
                                    return currentState.dialogue;
                                } else if ('specialInteraction' in currentState) {
                                    return <span className="blur-[3px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>;
                                }
                            })()}
                        onNext={() => {
                            setCurrentStateIndex((prevIndex) => {
                                if (prevIndex < states.length - 1) {
                                    return (prevIndex + 1);
                                } else {
                                    return prevIndex;
                                }
                            })
                        }}
                    />
                    <svg width="143" height="116" viewBox="0 0 143 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M125.166 49.2066C125.166 77.7285 102.391 106.527 71.4388 106.527C40.4868 106.527 17.7111 81.3208 17.7111 52.7989C17.7111 24.2769 37.2446 1.5 68.1966 1.5C99.1486 1.5 125.166 20.6846 125.166 49.2066Z" fill="white" />
                        <path d="M32.5608 62.9727C29.8491 71.1739 22.1532 76.5251 13.7742 73.7546C5.39521 70.9841 -0.49396 61.1411 2.2177 52.9399C4.92936 44.7388 13.9201 40.3364 22.2991 43.1069C30.6781 45.8773 35.2724 54.7716 32.5608 62.9727Z" fill="white" />
                        <path d="M128.332 73.7546C136.533 71.0429 143.662 61.1779 140.892 52.7989C138.121 44.4198 129.227 39.8255 121.026 42.5372C112.825 45.2489 108.422 54.2396 111.193 62.6187C113.963 70.9977 120.131 76.4663 128.332 73.7546Z" fill="white" />
                        <path d="M50.5224 87.7825C51.1243 99.3669 41.1934 109.299 28.341 109.967C15.4885 110.635 4.58163 101.785 3.97967 90.201C3.37771 78.6166 13.3087 68.6841 26.1611 68.0163C39.0135 67.3484 49.9204 76.1981 50.5224 87.7825Z" fill="white" />
                        <path d="M89.2028 87.7825C88.6009 99.3669 98.5318 109.299 111.384 109.967C124.237 110.635 135.144 101.785 135.746 90.201C136.347 78.6166 126.417 68.6841 113.564 68.0163C100.712 67.3484 89.8048 76.1981 89.2028 87.7825Z" fill="white" />
                        <path d="M68.1966 105.482C68.1966 109.702 61.0424 113.124 52.2173 113.124C43.3921 113.124 36.2379 109.702 36.2379 105.482C36.2379 101.261 43.3921 97.8395 52.2173 97.8395C61.0424 97.8395 68.1966 101.261 68.1966 105.482Z" fill="white" />
                        <path d="M103.397 105.019C103.397 109.239 96.2433 112.661 87.4181 112.661C78.593 112.661 71.4388 109.239 71.4388 105.019C71.4388 100.798 78.593 97.3763 87.4181 97.3763C96.2433 97.3763 103.397 100.798 103.397 105.019Z" fill="white" />
                        <path d="M20.1288 42.9137C5.77058 38.9767 -3.26123 53.5666 4.14949 66.0722M130.029 75.1441C144.619 95.0604 129.303 115.411 102.471 108.029C94.871 118.193 72.5965 113.124 71.207 106.64M9.45654 75.1441C-5.13329 95.0604 10.1831 115.411 37.0152 108.029C44.615 118.193 66.8895 113.124 68.279 106.64M122.85 42.9137C137.209 38.9767 146.24 53.5666 138.83 66.0722M20.0268 33.8912C30.6637 -8.71179 105.945 -9.87841 122.85 33.8912" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <ellipse cx="5.55804" cy="8.33705" rx="5.55804" ry="8.33705" transform="matrix(0.397588 0.917564 -0.917563 0.39759 59.4111 32.5325)" fill="#B5CDFF" />
                        <ellipse cx="5.55804" cy="8.33705" rx="5.55804" ry="8.33705" transform="matrix(-0.397588 0.917564 0.917563 0.39759 83.0718 32.5325)" fill="#B5CDFF" />
                        <path d="M72.5963 57.9129C73.2138 58.2695 73.2138 59.1608 72.5963 59.5174L64.954 63.9297C64.3364 64.2862 63.5645 63.8405 63.5645 63.1274V54.3028C63.5645 53.5897 64.3364 53.1441 64.954 53.5006L72.5963 57.9129Z" fill="#FCD9DF" />
                        <path d="M70.0488 57.9129C69.4313 58.2695 69.4313 59.1608 70.0488 59.5174L77.6911 63.9297C78.3087 64.2862 79.0806 63.8405 79.0806 63.1274V54.3028C79.0806 53.5897 78.3087 53.1441 77.6911 53.5006L70.0488 57.9129Z" fill="#FCD9DF" />
                    </svg>

                </div>
            </div>
            {panelOpened && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/25">
                    <button type="button" className="p-5 border-[3px] border-white rounded-[20px] bg-linear-to-b from-[#E8E2F8] to-[#C6CDF9] text-primary font-semibold cursor-pointer" onClick={() => {
                        setPanelOpened(false); setCurrentStateIndex((prevIndex) => {
                            if (prevIndex < states.length - 1) {
                                return (prevIndex + 1);
                            } else {
                                return prevIndex;
                            }
                        })
                    }}>ยังไม่เคยเรียนมาก่อนเลย...</button>
                </div>
            )}
        </FullScreenCloudBackground>
    );
}

export default Intro;
