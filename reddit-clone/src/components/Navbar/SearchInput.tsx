import React from "react"

type SearchInputProps = {}

const SearchInput = (props: SearchInputProps) => {
    return (
        <div className="w-1/2 max-w-xl">
            <input
                className="w-full border border-gray-200 rounded-lg py-1 px-3 font-light"
                type="text"
                placeholder="Search Reddit"
            />
        </div>
    )
}

export default SearchInput