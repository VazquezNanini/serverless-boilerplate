#!/bin/bash

region="eu-west-1"

domain="domain.example.com"
stackName=$1
githash=$(git rev-parse HEAD)
NODE_ENV="production"
lowercaseStackName=$(echo $stackName | tr '[:upper:]' '[:lower:]')

export API="http://example.com"
export API_KEY="someValue"
export PUBLIC_URL="http://localhost:3000"
#export PUBLIC_URL="https://$domain/$lowercaseStackName/$githash"

npm run build

#aws s3 sync build/ s3://classifieds-cdn/$lowercaseStackName/$githash/

npm run start-server
