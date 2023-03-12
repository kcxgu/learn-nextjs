import { Post, postState } from "@/atoms/postAtom"
import Posts from "@/components/Posts/Posts";
import TextInputs from "@/components/Posts/TextInputs"
import { auth, firestore } from "@/firebase/clientApp"
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useSetRecoilState } from "recoil";

type Props = {}

const submit = (props: Props) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: "",
    });
    const [error, setError] = useState("");

    const setPostItems = useSetRecoilState(postState);

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreatePost = async () => {
        try {
            if (user) {
                const postDocRef = await addDoc(collection(firestore, "posts"), {
                    creatorId: user.uid,
                    creatorDisplayName: user.displayName!,
                    title: textInputs.title,
                    body: textInputs.body,
                    numberOfComments: 0,
                    voteStatus: 0,
                    createdAt: serverTimestamp(),
                    editedAt: serverTimestamp(),
                });
            }

            router.back();
        } catch (error: any) {
            console.log("handleCreatePost error", error.message);
            setError("Cannot submit your post right now, please try again later")
        }
    }

    return (
        <div>
            <div className="bg-white flex flex-col items-center justify-center my-4 mx-auto max-w-4xl w-5/6 rounded-lg py-8">
                <p className="pb-4 text-gray-700 uppercase text-sm font-medium tracking-wide">Create a post</p>
                <form className="flex flex-col items-center justify-center gap-2 max-w-4xl w-full px-8 mx-auto tracking-wide">
                    <TextInputs textInputs={textInputs} handleChange={handleChange} handleCreatePost={handleCreatePost} />
                </form>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
            <Posts />
        </div>
    )
}

export default submit