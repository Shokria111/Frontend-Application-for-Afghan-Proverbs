import axios from 'axios';

const api_url = ''; 

export const getProverbs = async()=>{
    const res = await axios.get(`${api_url}/proverbs`);
    return res.data;
}

export const addProverb = async ()=>{
    const res = await axios.post(`${api_url}/proverbs`, proverb);
    return res.data; 
}; 

