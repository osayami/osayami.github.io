#!/bin/bash
dotnet publish -c Release OsayamiBlog.csproj
rm -rf build
mkdir build
cp -r bin/Release/net10.0/publish/wwwroot/* docs/
touch docs/.nojekyll
git add docs
git commit -m "Update GitHub Pages build"
git push
echo "Deployment to GitHub Pages completed."