import { useState } from "react"
import "./search.css"

function SearchView() {

    const [input, setInput] = useState("")
    // eslint-disable-next-line
    const [results, setResult] = useState([])

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log(input)
        }
    }

    return (
        <div className="search">
            <div className="search_bar">
                <input id="input" type="text" onChange={(e) => setInput(e.target.value.replace(/ /g, '+'))} onKeyDown={handleKeyDown} className="search_input" />
                <button type="button" onClick={() => console.log(input)} className="search_button">Search</button>
            </div>
            <ul className="search_result">
                {
                    results.length > 0 ? <li></li> : null
                }
            </ul>
        </div>
    )
}

export default SearchView