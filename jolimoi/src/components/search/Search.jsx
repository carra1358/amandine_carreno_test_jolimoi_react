import { useEffect } from "react"
import { useState } from "react"
import api from "../../api/axios"
import "./search.css"

/**
 * Component that handles search bar and search results list
 * @return React.element
 */
function Search() {

    // search input value
    const [input, setInput] = useState("")
    // search results
    const [results, setResults] = useState([])
    // error message
    const [noMatch, setNoMatch] = useState("")

    /**
     * Function that handles api calls and result update
     * @param {string} input value of input
     * @return array
     */
    const search = (input) => {
        if (input.length === 0) {
            setResults([])
            setNoMatch("")

        }
        const getData = async () => {
            try {
                await api.get(`/product?q=${input}`)
                    .then(res => {
                        if (res.status === 200 && res.data.length === 0) {
                            setNoMatch("There is no correspondance to your search")
                        }
                        if (res.status === 200 && res.data.length > 0) {
                            setResults(res.data)
                            setNoMatch("")
                        }
                    })

            } catch (e) {
                if (e.status === 500) {
                    setNoMatch("ERR 500: A problem occurs during your search, please try again later")
                } if (e.status === 400) {
                    setNoMatch("ERR 400: A problem occurs  during your search, please try again later")
                }
            }
        }
        getData()

    }

    // return new string with first letter in uppercase
    const CapLetterFirst = (srt) => {
        const capLetter = srt.split("")[0].toUpperCase()
        const newString = capLetter + srt.slice(1, srt.length)
        return newString
    }

    // handle search on click or keyDown Enter
    const handleEvent = (e) => {
        if (e.key === "Enter") {
            setInput("")
            search(input)
        }
        if (e.type === "click") {
            setInput("")
            search(input)
        }
    }

    // handle input mounted, updated and unmouted
    useEffect(() => {
        if (input.length === 0) {
            setResults([])
            setNoMatch("")
        }
        if (input.length > 3) {
            setResults([])
            search(input)

        }

        return (() => {
            setResults([])
            setNoMatch("")
            setInput("")
        })

    }, [input])



    return (
        <div className="search">
            <div className="search_bar">
                <input data-testid="input" type="text" onChange={(e) => setInput(e.target.value.replace(/ /g, '+'))} onKeyDown={handleEvent} className="search_input" />
                <button type="button" data-testid="button" onClick={(e) => handleEvent(e)} className="search_button" >Search</button>
            </div>
            <ul className="search_result" data-testid="results">
                {
                    results.length > 0 ?
                        results.slice(0, 5).map(product => {
                            return <li key={product.id} className="search_results_items">{CapLetterFirst(product?.brand)} - <span className="search_result_item_name">{CapLetterFirst(product?.name)}</span></li>
                        }) : null
                }

                <p>{noMatch}</p>
            </ul>

        </div>
    )
}

export default Search