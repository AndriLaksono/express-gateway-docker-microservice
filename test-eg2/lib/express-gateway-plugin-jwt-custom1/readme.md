# Express gateway plugin jwt custom

Express gateway plugin Jwt custom for check expiration time.

## Installation

Use the npm to install

```bash
npm install --save express-gateway-jwt-custom
```

## Usage

configuration `system.config.yml`

```yml
plugins:
    jwt-custom:
        secretKey: "your-secret-key"
        jwtExtractor: "authBearer"
        messageErr: "your message" # optional
```

configuration `gateway.config.yml`

```yml
policies:
    - jwt-custom
    - proxy
    - jwt

pipelines:
  crudPipeline:
    apiEndpoints:
        - crudAPI
    policies:
        - jwt:
            - action:
                jwtExtractor: 'authBearer'
                checkCredentialExistence: false
                secretOrPublicKey: 'secretAuth'
        - jwt-custom:
        - proxy:
            - action:
                serviceEndpoint: crudService
```