# Weather Flow (Arquitectura de Software II)

## Start project locally

Install dependencies:

```bash
npm install
```

Install development hooks:

```bash
npm run prepare
```

Copy `.env.example` file and rename to `.env`.
Then complete whit environment values

```bash
SELF_VERSION=-
```

Start project

```bash
npm start
```

And then go to http://localhost:3000/docs to open Swagger UI

## Start backend project using docker

Build image using the following command

```bash
docker build --pull --rm -f 'Dockerfile' -t 'weather-flow:latest' '.'
```

Copy `.env.example` file and rename to `.env`.
Then complete whit environment values

```bash
SELF_VERSION=-
```

Create a container from this image

```bash
docker run -p "3000:3000" --env-file ".env" weather-flow
```

And then go to http://localhost:3000/docs to open Swagger UI

<!-- ## App usage

To use app you will need log in with username and password. You can use following test credentials for this:

**Administrator credentials**
* Username: `admin`
* Password: `Admin1234!`

<blockquote>
<b>NOTE</b>
<p>If you want test backend use <code>/auth/login</code> endpoint with above credentials and then copy response <code>access_token</code> attribute value, click on padlock button and paste into popup input. Then click <code>Authorize</code> button and close popup.</p>
<p>If you want test frontend you will be automatically redirected to login page when you access frontend url. You can also use the credentials mentioned above there.</p>
</blockquote>
 -->
