import { useEffect, useState } from 'react';

export function useFetch (url) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [order, setOrder] = useState("");
  
  
    useEffect( () => {
      //Associate AbortController w/ fetch request, then use it to stop fetch
      // const abortCont = new AbortController();
  
      fetch(url)//, { signal: abortCont.signal })
        .then(res => {
          if(!res.ok) {
                throw Error('Could not fetch data'); //reached server and got a response
          }
          return res.json()
        })
        .then(
          (result) => {
            setIsLoaded(true);
            setOrder(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // if(error.name === 'AbortError') {
            //   console.log('fetch aborted');
            // }
            // else {
              setIsLoaded(true);
              setError(error);
            // }
          }
        ).catch(err => console.log(err))
  
        //useEffect cleanup + abort controller to avoid trying to update the state of unmounted component
        // but without react-router ...
        //return () => abortCont.abort();
    }, [])

    return [order, isLoaded, error];
}