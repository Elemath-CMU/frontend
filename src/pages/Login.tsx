import { useState } from "react";
import FullScreenCloudBackground from "../components/FullScreenCloudBackground";
import BorderedButton from "../components/button/BorderedButton";
import { useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate();
    const [users] = useState<string[]>(() => {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            return JSON.parse(savedUsers);
        } else {
            return [];
        }
    });
    const [newUserName, setNewUserName] = useState<string>("");

    function renderUser(index: number, name: string) {
        return (
            <div key={index} className="flex flex-col items-center gap-3">
                <button type="button" title={name} className="size-25 rounded-[20px] bg-linear-to-b from-[#E8E2F8] to-[#C6CDF9] cursor-pointer" onClick={() => {
                    navigate("/map")
                }} />
                <div className="text-primary text-sm font-semibold">{name}</div>
            </div>
        );
    }

    return (
        <FullScreenCloudBackground>
            <div className="flex h-full w-full justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="text-4xl text-primary font-bold">เธอชื่ออะไร?</div>
                    <div className="flex gap-8">{users.map((user, index) => renderUser(index, user))}</div>
                    <input type="text" title="name" placeholder="ฉันชื่อ..." className="w-100 px-5 py-4 text-primary text-base font-semibold bg-white rounded-full shadow-[0_0_12px_0_rgba(175,168,207,0.5)]" value={newUserName} onChange={(e) => { setNewUserName(e.target.value) }} />
                    <BorderedButton onClick={() => {
                        if (newUserName.trim() === "") {
                            alert("ใส่ชื่อของเธอก่อนนะ!");
                        } else {
                            const updatedUsers = [...users, newUserName.trim()];
                            localStorage.setItem("users", JSON.stringify(updatedUsers));
                            navigate("/intro", { state: { name: newUserName } })
                        }
                    }}>ตกลง</BorderedButton>
                </div>
            </div>
        </FullScreenCloudBackground>
    );
}

export default Login;
