# ipfs-gateway

Get working IPFS Gateway

### Install

```
npm i get-ipfs-gateway
```

### Usage

```javascript
const { getGateway } = require('get-ipfs-gateway');

async function test() {
	const gateways = await getGateway();
	console.log(gateways);
}

test();
```
