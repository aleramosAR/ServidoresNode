const facebookID = '559885825005670';
const facebookSecret = '6a2926fd1ded556381f2275ddfbee1f2';
const PORT_DEFAULT = 8080;

export const MODE = process.env.npm_lifecycle_event;

export const FACEBOOK_CLIENT_ID = (MODE === 'startFB') ? process.argv[2] : facebookID;
export const FACEBOOK_CLIENT_SECRET = (MODE === 'startFB') ? process.argv[2] : facebookSecret;

export const PORT = (MODE === 'fork') ? (process.argv[2] ? parseInt(process.argv[2]) : PORT_DEFAULT) : PORT_DEFAULT;

export const MONGO_URI = 'mongodb+srv://user:pass@cluster0.99scg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';