const axios = require("axios");
const gateways = require("./nodes.json");

// Example hash for an image
const imageHash = "QmR2S8BouhseEsHC5cc4KKtUobrWXkAEd48rqAKWayMiy5";

async function axiosCall(url) {
  try {
    const response = await axios.get(url, { timeout: 3000 });
    return response.data;
  } catch (error) {
    return false;
  }
}

async function checkImageSupport(gateway) {
  try {
    const url = `${gateway}${imageHash}`;
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 9000 });
    const contentType = response.headers['content-type'];
    return contentType && contentType.startsWith('image/');
  } catch (error) {
    return false;
  }
}

async function getGateway() {
  // Shuffle the gateways array using the Fisher-Yates algorithm
  for (let i = gateways.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gateways[i], gateways[j]] = [gateways[j], gateways[i]];
  }

  for (const gateway of gateways) {
    const trimmedGateway = gateway.trim();

    try {
      const checkIPFSr = await axiosCall(`${trimmedGateway}QmXXDGe9cCkdc4GJo1xfWhsE2B7pEUR8vBcUvtjh6vzZNB`);

      if (checkIPFSr && checkIPFSr.server) {
        console.log(`GOOD : ${trimmedGateway}`);
        const supportsImage = await checkImageSupport(trimmedGateway);
        
        if (supportsImage) {
          console.log(`Supports image: ${trimmedGateway}`);
          return trimmedGateway;
        } else {
          console.log(`Does not support image: ${trimmedGateway}`);
        }
      } else {
        console.log(`BAD : ${trimmedGateway}`);
      }
    } catch (error) {
      console.error(`Error with gateway ${trimmedGateway}: ${error.message}`);
    }
  }

  return null;
}

module.exports = { getGateway };
