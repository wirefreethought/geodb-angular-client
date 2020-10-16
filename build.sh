#!/bin/bash

npm run config -- -- --environment=working
ng build app --configuration=prod
ng build library --configuration=prod
