

1. Deploy the website:

[![Deploy to Azure][Deploy Button]][Deploy Node/GetConversationMembers]

[Deploy Button]: https://azuredeploy.net/deploybutton.png
[Deploy Node/GetConversationMembers]: https://azuredeploy.net
 

2.Set the following environment variables:

`APP_SECRET`

`WEBCHAT_SECRET`

3.Set the Bot service direct line channel endpoint (optional)

In some cases it is required to set the endpoint URI so that it points to a specific geography. The geographies supported by the bot service each have a unique direct line endpoint URI:

- `directline.botframework.com` routes your client to the nearest datacenter. This is the best option if you do not know where your client is located.
- `asia.directline.botframework.com` routes only to Direct Line servers in Eastern Asia.
- `europe.directline.botframework.com` routes only to Direct Line servers in Europe.
- `northamerica.directline.botframework.com` routes only to Direct Line servers in North America.

Pass your preferred geographic endpoint URI by setting the environment variable: `DIRECTLINE_ENDPOINT_URI` in your deployment. If no variable is found it will default to `directline.botframework.com`

