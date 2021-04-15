# Leak AWS Lambda (EC2) environment variables via a compromised NPM package

Code for [How compromised NPM package can steal your secrets (POC + prevention)](https://www.maxivanov.io/how-compromised-npm-package-can-steal-your-secrets/)

## Repository content

- [phone-home-listener](./phone-home-listener). HTTP endpoint logging all incoming requests and their parameters, query string and bodies. Attacker-owned resource.
- [compromised-npm-package](./compromised-npm-package). Useful NPM package that was hacked and had malicious code injected. 3rd party-owned, compromised by the attacker.

Application examples, from vulnerable to protected:

- [leak-env-vars-poc](./leak-env-vars-poc). Vulnerable Lambda function that uses compromised-npm-package. Leaks environment variables. Part of the application.
- [leak-env-vars-poc-fetch-secrets-runtime](./leak-env-vars-poc-fetch-secrets-runtime). Improved Lambda function that doesn't leak app secrets directly. Still leaks temporary credentials. Part of the application.
- [leak-env-vars-poc-outbound-blocked](./leak-env-vars-poc-outbound-blocked). Further improved Lambda function that has no oubound connection to the Internet. Doesn't leak any secrets. Part of the application.
- [leak-env-vars-poc-fetch-secrets-runtime](./leak-env-vars-poc-fetch-secrets-runtime). Lambda function that has outbound connection to the Internet and whitelists allowed destinations. Part of the application.

Each of the applications has function code in `lambda` folder and infrastructure scripts in the `terraform` folder.

Example usage. This deploys both cloud resources and the code:

```bash
aws configure # skip if AWS credentials are already set

cd leak-env-vars-poc/terraform

terraform init

terraform deploy
```
