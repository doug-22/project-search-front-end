import { createContext } from "react";

const initialState = {
    data: undefined,
    facets: undefined,
    highlighting: undefined,
    filters: '',
    queryString: '',
    search: {
        type: '',
        term: '',
        toggleDate: false,
        initialDate: '',
        finalDate: ''
    }
}

const Context = createContext([initialState, () => {}]);

export default Context;
