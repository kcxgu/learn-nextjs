import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth"
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const CreatePostLink = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: "login" })
            return
        }
        router.push(`/r/submit`);
    }

    return (
        <div className="flex flex-row justify-evenly items-center my-4 rounded">
            <div className="flex flex-row items-center gap-4 bg-white w-2/3 mx-auto py-2 px-4 rounded">
                {user &&
                    <FaReddit
                        style={{ fontSize: "30px" }}
                    />
                }
                <input
                    className="bg-gray-100 w-full py-1 px-2 rounded"
                    placeholder="Create Post"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default CreatePostLink