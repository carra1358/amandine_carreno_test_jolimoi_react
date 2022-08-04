//import { useEffect } from "react"
import { useEffect } from "react"
import { useState } from "react"
import api from "../../api/axios"
import "./search.css"

/**
 * Component that handles search bar and search results list
 * @return React.element
 */
function Search() {

    const initialValue = []

    // search input value
    const [input, setInput] = useState("")

    // search results
    const [results, setResults] = useState(initialValue)

    // error message
    const [noMatch, setNoMatch] = useState("")

    /**
     * Function that handles api calls and updates results
     * 
     * @return array
     */
    const search = () => {

        if (input.trim().length > 0) {
            try {
                api.get(`/product?q=${input.replace(/ /g, '+')}`)
                    .then(res => {
                        if (res.status === 200 && res.data.length === 0) {
                            setResults(() => initialValue)
                            setNoMatch("There is no correspondance to your search")
                        }
                        if (res.status === 200 && res.data.length > 0) {
                            const response = [...res.data].slice(0, 5)
                            setResults(response)
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
            search()
        }
        if (e.type === "click") {
            search()
        }
    }


    // function to reset states
    const cleanUp = () => {
        setInput("")
        setResults(() => initialValue)
        setNoMatch("")
    }

    // On mounted clear all states
    useEffect(() => {
        cleanUp()
    }, [])

    // On input updates either clear states or do a search
    useEffect(() => {

        if (input.trim() === "") {
            cleanUp()
        }
        const timer = setTimeout(() => {
            search()
        }, 500)

        return () => clearTimeout(timer)
    }, [input])





    return (
        <div className="search">
            <div className="search_bar">
                <input data-testid="input" type="search" onChange={(e) => setInput(e.target.value)} onKeyDown={handleEvent} className="search_input" />
                <button type="button" data-testid="button" onClick={(e) => handleEvent(e)} className="search_button" >Search</button>
            </div>
            <ul className="search_result" data-testid="results">
                {
                    results.length > 0 ?
                        results.map(product => {
                            return <li key={product.id} className="search_results_items">{CapLetterFirst(product?.brand)} - <span className="search_result_item_name">{CapLetterFirst(product?.name)}</span></li>
                        }) : null
                }

                <p>{noMatch}</p>
            </ul>

        </div>
    )
}

export default Search