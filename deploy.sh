#!/bin/bash
dotnet publish -c Release
rm -rf docs
mkdir docs
cp -r bin/Release/net10.0/publish/wwwroot/* docs/
touch docs/.nojekyll
git add docs