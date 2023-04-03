#!/bin/bash

npm run config -- -- --environment=working
ng build app --configuration production
ng build library --configuration production
