import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {url} from "@services/http";


export default function withAdmin(Component) {
  // TODO CREATE HOC
    const managerId = localStorage.getItem("sessionId");

    return () => {
        const history = useHistory();
        const [error, setError] = useState(false)
        useEffect(() => {
            if(!managerId){
                setError(true);
            }
            (async() => {
                try{
                    const getManger = await axios.get(`${url}/managers/${managerId}`);
                    if(getManger?.data.length === 0){
                        setError(true);
                    }
                }catch{
                    setError(true);
                }
            })()
        }, []) 

        if(error){
            return history.push("/error");
        }
        
        // const manager =  
        return  <Component />;
    }
}
