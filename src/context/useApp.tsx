import { useContext } from "react"
import { AppContext } from "./AppContext"

const useApp = ()=> {
    return useContext(AppContext);
}

export default useApp