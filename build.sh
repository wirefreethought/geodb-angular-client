#!/bin/bash

npm run config -- -- --environment=working
ng build app --prod
ng build library --prod
