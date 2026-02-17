import { useState } from "react";
import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import BorderedButton from "../components/button/BorderedButton";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export interface User {
  name: string;
  episodes: number;
  interactions: number;
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
        return (
            <div key={index} className="flex flex-col items-center gap-3">
                <button type="button" title={user.name} className="size-25 rounded-[20px] bg-linear-to-b from-[#E8E2F8] to-[#C6CDF9] cursor-pointer" onClick={() => {
                    setCurrentUser(user);
                    navigate("/map")
                }} />
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
                            const updatedUsers = [...users, { name, episodes: 0, interactions: 0 }];
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
