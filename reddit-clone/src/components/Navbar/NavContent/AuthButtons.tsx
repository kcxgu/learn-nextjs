import { authModalState } from "@/atoms/authModalAtom"
import { useSetRecoilState } from "recoil"

const AuthButtons = () => {

    const setAuthModalState = useSetRecoilState(authModalState);

    return (
        <div className="flex flex-row gap-2">
            <button
                className="border border-blue-500 text-blue-500 rounded-xl py-1 px-4 hover:opacity-80"
                type="button"
                onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
                Log In
            </button>
            <button
                className="bg-blue-500 text-white rounded-xl py-1 px-4 hover:opacity-80"
                onClick={() => setAuthModalState({ open: true, view: "signup" })}
            >
                Sign Up
            </button>
        </div>
    )
}

export default AuthButtons