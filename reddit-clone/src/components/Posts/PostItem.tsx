import { Post } from "@/atoms/postAtom";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from "react-icons/io5";

type Props = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: (post: Post, vote: number) => void;
    onDeletePost: (post: Post) => Promise<boolean>;
    onSelectPost: () => void;
}

const PostItem = (props: Props) => {
    const username = props.post.creatorDisplayName.replace(/\S+$/, '').replace(/ /g, '');
    const postDate = new Date(props.post.createdAt?.seconds * 1000).toLocaleDateString("en-UK", {
        day: "numeric", month: "long", year: "numeric"
    })
    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            const success = await props.onDeletePost(props.post);

            if (!success) {
                throw new Error("Failed to delete post");
            }

        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div
            className="bg-white flex flex-row gap-4 my-4 mx-auto max-w-4xl w-5/6 rounded-lg py-8 px-6 tracking-wide">
            <div className="flex flex-col items-center gap-2 bg-gray-100 px-3 py-2">
                {props.userVoteValue === 1 ? (
                    <IoArrowUpCircleSharp className="text-2xl text-orange-500 cursor-pointer" />
                ) : (
                    <IoArrowUpCircleOutline className="text-2xl text-gray-400 cursor-pointer" onClick={() => props.onVote(props.post, 1)} />
                )}
                <p>{props.post.voteStatus}</p>
                {props.userVoteValue === -1 ? (
                    <IoArrowDownCircleSharp className="text-2xl text-gray-500 cursor-pointer" />
                ) : (
                    <IoArrowDownCircleOutline className="text-2xl  text-gray-400 cursor-pointer" onClick={() => props.onVote(props.post, 1)} />
                )}
            </div>
            <div className="w-full pr-2">
                <div className="flex flex-row justify-between text-gray-600 text-sm tracking-normal">
                    <p>Posted by u/{username}</p>
                    <p>{postDate}</p>
                </div>
                <p
                    className="text-lg font-medium text-gray-700 py-1">
                    {props.post.title}
                </p>
                <p
                    className="text-gray-700">
                    {props.post.body}
                </p>
                <div className="flex flex-row items-center gap-4 text-gray-500 py-3">
                    <div className="flex flex-row items-center cursor-pointer gap-1">
                        <BsChat />
                        <p>{props.post.numberOfComments}</p>
                    </div>
                    <div className="flex flex-row items-center cursor-pointer gap-1">
                        <IoArrowRedoOutline />
                        <p>Share</p>
                    </div>
                    <div className="flex flex-row items-center cursor-pointer gap-1">
                        <IoBookmarkOutline />
                        <p>Save</p>
                    </div>
                    {props.userIsCreator && (
                        <div
                            className="flex flex-row items-center cursor-pointer gap-1"
                            onClick={handleDelete}
                        >
                            <AiOutlineDelete />
                            <p>Delete</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default PostItem