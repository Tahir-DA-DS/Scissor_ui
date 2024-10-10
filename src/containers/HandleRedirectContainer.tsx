import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const SERVER_ENDPOINTS = process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000";

function HandleRedirectContainer() {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState<string | null>(null);
  const { transformedUrl } = useParams<{ transformedUrl: string }>();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${SERVER_ENDPOINTS}/${transformedUrl}`);
        setDestination(res.data.destination);
      } catch (error: any) {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          setError('No response from the server.');
        } else {
          setError(`Request error: ${error.message}`);
        }
      }
    }

    getData();
  }, [transformedUrl]);

  useEffect(() => {
    if (destination) {
      window.location.replace(destination);
    }
  }, [destination]);

  if (!destination && !error) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
        <p>Redirecting, please wait...</p>
      </Box>
    );
  }

  return <p>{error && JSON.stringify(error)}</p>;
}

export default HandleRedirectContainer;
