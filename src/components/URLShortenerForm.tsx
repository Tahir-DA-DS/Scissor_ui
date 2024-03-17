import React, { useState } from 'react';
import { Box, InputGroup, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios'; 
import QRCode from 'qrcode.react'; 


function URLShortenerForm() {
  const [destination, setDestination] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState<{
    transformedUrl: string;
    accessCount: number;
    createdAt: string;
  } | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false); // Track whether to show analytics

  const SERVER_ENDPOINTS = 
    process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShortUrl(null);
    try {
      const resp = await axios.post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
        customAlias // Include customAlias in the request body
      });
      if (resp.data) {
        setShortUrl(resp.data);
      }
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  }

  function handleShowAnalytics() {
    setShowAnalytics(!showAnalytics);
  }

  return (
    <Box pos='relative' zIndex="2" backgroundColor="white" padding="6">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Destination URL</FormLabel>
          <Input
            onChange={(e) => setDestination(e.target.value)}
            placeholder="https://example.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Custom Alias (optional)</FormLabel>
          <Input
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="custom-alias"
          />
        </FormControl>
        <Button type='submit'>CREATE</Button>
      </form>
      {shortUrl && (
        <Box mt="4">
          <a href={`/${shortUrl.transformedUrl}`}>
            {window.location.origin}/{shortUrl.transformedUrl}
          </a>
          <br />
          <Button onClick={handleShowAnalytics}>Toggle Analytics</Button>
          {showAnalytics && (
            <Box mt="4">
              <p>Click Count: {shortUrl.accessCount}</p>
              {shortUrl.createdAt && (
                <p>Date Created: {new Date(shortUrl.createdAt).toLocaleString()}</p>
              )}
            </Box>
          )}
          <Box mt="4">
            <QRCode value={`/${shortUrl.transformedUrl}`} />
          </Box>
        </Box>
      )}
    </Box>
  );
}



// function RedirectorComponent() {
 
// }

export default URLShortenerForm;
