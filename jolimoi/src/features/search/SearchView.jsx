import { useEffect } from "react"
import { useState } from "react"
import api from "../../api/axios"
import "./search.css"

function SearchView() {

    const [input, setInput] = useState("")
    const [results, setResults] = useState([])
    const [noMatch, setNoMatch] = useState("")


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
                return e
            }
        }
        getData()

    }

    const CapLetterFirst = (srt) => {
        const capLetter = srt.split("")[0].toUpperCase()
        const newString = capLetter + srt.slice(1, srt.length)
        return newString
    }


    const handleEvent = (e) => {
        if (e.key === "Enter") {
            search(input)
        }
        if (e.type === "click") {
            search(input)
        }
    }

    useEffect(() => {
        if (input.length === 0) {
            setResults([])
            setNoMatch("")
        }
        if (input.length > 3) {
            search(input)

        }


    }, [input])



    return (
        <div className="search">
            <div className="search_bar">
                <input id="input" type="text" onChange={(e) => setInput(e.target.value.replace(/ /g, '+'))} onKeyDown={handleEvent} className="search_input" />
                <button type="button" onClick={(e) => handleEvent(e)} className="search_button">Search</button>
            </div>
            <ul className="search_result">
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

export default SearchView