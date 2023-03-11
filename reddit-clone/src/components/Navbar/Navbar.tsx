import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import NavContent from "./NavContent/NavContent";
import SearchInput from "./SearchInput";

const Navbar = () => {
    const [user, error] = useAuthState(auth);
    return (
        <div className="bg-white py-2 px-6">
            <div className="max-w-6xl flex flex-row items-center justify-between mx-auto">
                <h1 className="text-orange-500 text-lg">Reddit</h1>
                <SearchInput />
                <NavContent user={user} />
            </div>
        </div>
    )
}

export default Navbar;