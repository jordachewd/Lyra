# VERCEL_GIT_COMMIT_REF is an environment variable set by Vercel
# It contains the name of the branch that triggered the build. 

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then  
  echo "Deploying from $VERCEL_GIT_COMMIT_REF. Build can proceed."
  exit 1;
else  
  echo "Branch is $VERCEL_GIT_COMMIT_REF. Build cancelled."
  exit 0;
fi