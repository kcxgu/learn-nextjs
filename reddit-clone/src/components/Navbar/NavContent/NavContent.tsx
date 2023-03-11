import AuthModal from '@/components/Modal/Auth/AuthModal'
import { auth } from '@/firebase/clientApp';
import { signOut, User } from 'firebase/auth';
import AuthButtons from './AuthButtons'
import Icons from './Icons';
import { FaRedditSquare } from "react-icons/fa";

type NavContentProps = {
    user?: User | null;
}

const NavContent = (props: NavContentProps) => {
    console.log(props.user)
    return (
        <>
            <AuthModal />
            <div className="flex flex-row gap-2">
                {props.user ?
                    <>
                        <Icons />
                        <div className="hidden lg:flex flex-row items-center gap-2 pl-2 pr-1">
                            <FaRedditSquare style={{ fontSize: "24px" }} />
                            <p>{props.user?.displayName}</p>
                        </div>
                        <button className="bg-blue-500 text-white rounded-xl py-1 px-1 px-2 md:px-4 hover:opacity-80" onClick={() => signOut(auth)}>Log Out</button>
                    </>
                    :
                    <AuthButtons />
                }
            </div>
        </>
    )
}

export default NavContent