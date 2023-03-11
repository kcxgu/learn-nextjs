import { authModalState } from "@/atoms/authModalAtom"
import { auth } from "@/firebase/clientApp";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil"
import OAuthButtons from "./OAuthButtons";

const AuthModal = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, error] = useAuthState(auth)

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }))
    }

    useEffect(() => {
        if (user) handleClose()
    }, [user])

    return (
        <>
            {modalState.open ? (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-gray-100/40 focus:outline-none">
                    <div className="relative w-auto my-5 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold text-gray-700">
                                    Log In / Sign Up
                                </h3>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <OAuthButtons />
                                </div>
                                <div className="flex items-center justify-end py-5 px-1 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="border border-gray-300 rounded-xl font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-gray-200"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default AuthModal