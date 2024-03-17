import axios from "axios"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Spinner, Box} from "@chakra-ui/react"

const SERVER_ENDPOINTS = 
    process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000";
    
function HandleRedirectContainer(){
    const {transformedUrl} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const SERVER_ENDPOINTS = 
  process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000"

  useEffect(() => {
    async function fetchOriginalUrl() {
      try {
        const response = await axios.get(`${SERVER_ENDPOINTS}/${transformedUrl}`);
        window.location.href = response.data.destination;
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchOriginalUrl();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Unable to redirect to the original URL.</div>;
  }

  return null;
}

export default HandleRedirectContainer