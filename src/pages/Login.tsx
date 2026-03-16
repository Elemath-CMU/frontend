import { useState } from "react";
import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import BorderedButton from "../components/button/BorderedButton";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export interface User {
    name: string;
    episode: number;
    interaction: number;
}

function Login() {
    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const [users] = useState<User[]>(() => {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            return JSON.parse(savedUsers);
        } else {
            return [];
        }
    });
    const [newUserName, setNewUserName] = useState<string>("");

    function renderUser(index: number, user: User) {
        const profilePics = [
            <svg width="124" height="124" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_527_1166)">
                    <rect x="12" y="12" width="100" height="100" rx="20" fill="white" />
                </g>
                <ellipse cx="42.3043" cy="47.3546" rx="7.5" ry="11.25" transform="rotate(66.5725 42.3043 47.3546)" fill="#B5CDFF" />
                <ellipse cx="7.5" cy="11.25" rx="7.5" ry="11.25" transform="matrix(-0.397589 0.917564 0.917564 0.397589 73.5728 36)" fill="#B5CDFF" />
                <path d="M64.5 74.7972C65.8333 75.567 65.8333 77.4915 64.5 78.2613L48 87.7876C46.6667 88.5574 45 87.5951 45 86.0555V67.003C45 65.4634 46.6667 64.5011 48 65.2709L64.5 74.7972Z" fill="#FCD9DF" />
                <path d="M59 74.7972C57.6667 75.567 57.6667 77.4915 59 78.2613L75.5 87.7876C76.8333 88.5574 78.5 87.5951 78.5 86.0555V67.003C78.5 65.4634 76.8333 64.5011 75.5 65.2709L59 74.7972Z" fill="#FCD9DF" />
                <defs>
                    <filter id="filter0_d_527_1166" x="0" y="0" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="6" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.686275 0 0 0 0 0.658824 0 0 0 0 0.811765 0 0 0 0.5 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_527_1166" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_527_1166" result="shape" />
                    </filter>
                </defs>
            </svg>,
            <svg width="124" height="124" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_527_1181)">
                    <rect x="12" y="12" width="100" height="100" rx="20" fill="#FCD9DF" />
                </g>
                <ellipse cx="42" cy="62" rx="10" ry="8" transform="rotate(90 42 62)" fill="black" />
                <ellipse cx="82" cy="62" rx="10" ry="8" transform="rotate(90 82 62)" fill="black" />
                <defs>
                    <filter id="filter0_d_527_1181" x="0" y="0" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="6" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.686275 0 0 0 0 0.658824 0 0 0 0 0.811765 0 0 0 0.5 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_527_1181" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_527_1181" result="shape" />
                    </filter>
                </defs>
            </svg>,
        ];
        return (
            <div key={index} className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => {
                setCurrentUser(user);
                navigate("/map")
            }}>
                {profilePics[index % profilePics.length]}
                <div className="text-primary text-sm font-semibold">{user.name}</div>
            </div>
        );
    }

    return (
        <FullScreenCloudBackground>
            <div className="flex h-full w-full justify-center items-center touch-none">
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="text-4xl text-primary font-bold">เธอชื่ออะไร?</div>
                    <div className="flex gap-8">{users.map((user, index) => renderUser(index, user))}</div>
                    <input type="text" title="name" placeholder="ฉันชื่อ..." className="w-100 px-5 py-4 text-primary text-base font-semibold bg-white rounded-full shadow-[0_0_12px_0_rgba(175,168,207,0.5)]" value={newUserName} onChange={(e) => { setNewUserName(e.target.value) }} />
                    <BorderedButton onClick={() => {
                        if (newUserName.trim() === "") {
                            alert("ใส่ชื่อของเธอก่อนนะ!");
                        } else {
                            const name = newUserName.trim();
                            if (users.some(user => user.name === name)) {
                                alert("ชื่อนี้มีคนใช้แล้วนะ! ลองชื่ออื่นดูสิ");
                                return;
                            }
                            const updatedUsers = [...users, { name, episode: 0, interaction: 0 }];
                            localStorage.setItem("users", JSON.stringify(updatedUsers));
                            setCurrentUser(updatedUsers[updatedUsers.length - 1]);
                            navigate("/intro")
                        }
                    }}>ตกลง</BorderedButton>
                </div>
            </div>
        </FullScreenCloudBackground>
    );
}

export default Login;
