#!/bin/bash

region="eu-west-1"

domain="domain.example.com"
export API=""
export API_KEY="someValue"
export PUBLIC_URL="https://$domain/$(git rev-parse HEAD)" \

npm run start-local
